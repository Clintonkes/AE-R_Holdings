from fastapi import APIRouter, Depends, HTTPException, status, Query, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from api.database import get_db
from api.models.booking import Booking
from api.models.admin import Admin
from api.auth.dependencies import get_current_admin
from api.schemas.booking import BookingCreate, BookingUpdate, BookingResponse
from api import email as mail

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])


@router.post(
    "",
    response_model=BookingResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new booking",
)
def create_booking(
    booking_data: BookingCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> Booking:
    now = datetime.utcnow()
    booking = Booking(
        full_name=booking_data.full_name,
        email=booking_data.email,
        phone=booking_data.phone,
        service_type=booking_data.service_type,
        preferred_date=booking_data.preferred_date,
        preferred_time=booking_data.preferred_time,
        address=booking_data.address,
        special_instructions=booking_data.special_instructions,
        status="pending",
        created_at=now,
        updated_at=now,
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)

    background_tasks.add_task(
        mail.send_booking_received,
        full_name=booking.full_name,
        email=booking.email,
        service_type=booking.service_type,
        preferred_date=booking.preferred_date,
        preferred_time=booking.preferred_time,
    )
    return booking


@router.get(
    "",
    response_model=List[BookingResponse],
    summary="List all bookings (admin)",
)
def list_bookings(
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> List[Booking]:
    query = db.query(Booking)
    if status:
        query = query.filter(Booking.status == status)
    if search:
        term = f"%{search}%"
        query = query.filter(
            Booking.full_name.ilike(term)
            | Booking.email.ilike(term)
            | Booking.phone.ilike(term)
        )
    return query.order_by(Booking.created_at.desc()).all()


@router.get(
    "/{booking_id}",
    response_model=BookingResponse,
    summary="Get a single booking (admin)",
)
def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> Booking:
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Booking {booking_id} not found")
    return booking


@router.patch(
    "/{booking_id}",
    response_model=BookingResponse,
    summary="Update a booking (admin)",
)
def update_booking(
    booking_id: int,
    booking_data: BookingUpdate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> Booking:
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Booking {booking_id} not found")

    old_status = booking.status
    update_data = booking_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(booking, field, value)

    booking.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(booking)

    new_status = booking.status
    if new_status != old_status:
        if new_status == "approved":
            background_tasks.add_task(
                mail.send_booking_approved,
                full_name=booking.full_name,
                email=booking.email,
                service_type=booking.service_type,
                preferred_date=booking.preferred_date,
                preferred_time=booking.preferred_time,
            )
        elif new_status == "completed":
            background_tasks.add_task(
                mail.send_booking_completed,
                full_name=booking.full_name,
                email=booking.email,
                service_type=booking.service_type,
            )

    return booking


@router.delete(
    "/{booking_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a booking (admin)",
)
def delete_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> None:
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Booking {booking_id} not found")
    db.delete(booking)
    db.commit()
