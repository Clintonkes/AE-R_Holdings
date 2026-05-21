from fastapi import APIRouter, Depends, HTTPException, status, Query, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional

from api.database import get_db
from api.models.message import Message
from api.models.admin import Admin
from api.auth.dependencies import get_current_admin
from api.schemas.message import MessageCreate, MessageUpdate, MessageResponse
from api import email as mail

router = APIRouter(tags=["Messages"])


@router.post(
    "/api/contact",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact form message",
)
def submit_contact(
    message_data: MessageCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> Message:
    message = Message(
        name=message_data.name,
        email=message_data.email,
        phone=message_data.phone,
        message=message_data.message,
        is_read=False,
    )
    db.add(message)
    db.commit()
    db.refresh(message)

    background_tasks.add_task(
        mail.send_contact_received,
        name=message.name,
        email=message.email,
        message=message.message,
    )
    return message


@router.get(
    "/api/messages",
    response_model=List[MessageResponse],
    summary="List all messages (admin)",
)
def list_messages(
    is_read: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> List[Message]:
    query = db.query(Message)
    if is_read is not None:
        query = query.filter(Message.is_read == is_read)
    return query.order_by(Message.created_at.desc()).all()


@router.get(
    "/api/messages/{message_id}",
    response_model=MessageResponse,
    summary="Get a single message (admin)",
)
def get_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> Message:
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Message {message_id} not found")
    return message


@router.patch(
    "/api/messages/{message_id}",
    response_model=MessageResponse,
    summary="Update a message (admin)",
)
def update_message(
    message_id: int,
    message_data: MessageUpdate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> Message:
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Message {message_id} not found")

    was_unread = not message.is_read
    update_data = message_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(message, field, value)

    db.commit()
    db.refresh(message)

    # Send acknowledgement email when first marked as read
    if was_unread and message.is_read:
        background_tasks.add_task(
            mail.send_message_acknowledged,
            name=message.name,
            email=message.email,
        )

    return message


@router.delete(
    "/api/messages/{message_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a message (admin)",
)
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> None:
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Message {message_id} not found")
    db.delete(message)
    db.commit()
