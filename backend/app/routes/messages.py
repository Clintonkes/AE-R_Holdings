from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.message import Message
from app.models.admin import Admin
from app.auth.dependencies import get_current_admin
from app.schemas.message import MessageCreate, MessageUpdate, MessageResponse

router = APIRouter(tags=["Messages"])


@router.post(
    "/api/contact",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact form message",
)
def submit_contact(
    message_data: MessageCreate,
    db: Session = Depends(get_db),
) -> Message:
    """
    Submit a contact form message (public endpoint).
    The message is stored and marked as unread for admin review.
    """
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
    return message


@router.get(
    "/api/messages",
    response_model=List[MessageResponse],
    summary="List all messages (admin)",
)
def list_messages(
    is_read: Optional[bool] = Query(None, description="Filter by read status"),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> List[Message]:
    """
    Retrieve all contact form messages, with optional filtering by read status.
    Requires admin authentication.
    """
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
    """
    Retrieve a single contact message by ID. Requires admin authentication.
    """
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Message with id {message_id} not found",
        )
    return message


@router.patch(
    "/api/messages/{message_id}",
    response_model=MessageResponse,
    summary="Update a message (admin)",
)
def update_message(
    message_id: int,
    message_data: MessageUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> Message:
    """
    Mark a message as read and/or add an admin response.
    Requires admin authentication.
    """
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Message with id {message_id} not found",
        )

    update_data = message_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(message, field, value)

    db.commit()
    db.refresh(message)
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
    """
    Permanently delete a contact message by ID. Requires admin authentication.
    """
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Message with id {message_id} not found",
        )
    db.delete(message)
    db.commit()
