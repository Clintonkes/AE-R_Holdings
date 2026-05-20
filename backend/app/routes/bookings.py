from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.database import get_db
from app.models.booking import Booking
from app.models.admin import Admin
from app.auth.dependencies import get_current_admin
from app.schemas.booking import BookingCreate, BookingUpdate, BookingResponse

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])


@router.post(
    "",
    response_model=BookingResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new booking",
)
def create_booking(
    booking_data: BookingCreate,
    db: Session = Depends(get_db),
) -> Booking:
    """
    Submit a new cleaning service booking request (public endpoint).
    Booking is created with status 'pending' and requires admin approval.
    """
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
    return booking


@router.get(
    "",
    response_model=List[BookingResponse],
    summary="List all bookings (admin)",
)
def list_bookings(
    status: Optional[str] = Query(None, description="Filter by booking status"),
    search: Optional[str] = Query(None, description="Search by name, email, or phone"),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> List[Booking]:
    """
    Retrieve all bookings. Supports optional filtering by status and full-text search
    across customer name, email, and phone. Requires admin authentication.
    """
    query = db.query(Booking)

    if status:
        query = query.filter(Booking.status == status)

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            Booking.full_name.ilike(search_term)
            | Booking.email.ilike(search_term)
            | Booking.phone.ilike(search_term)
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
    """
    Retrieve a single booking by ID. Requires admin authentication.
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with id {booking_id} not found",
        )
    return booking


@router.patch(
    "/{booking_id}",
    response_model=BookingResponse,
    summary="Update a booking (admin)",
)
def update_booking(
    booking_id: int,
    booking_data: BookingUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> Booking:
    """
    Update a booking's status or admin notes. Requires admin authentication.
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with id {booking_id} not found",
        )

    update_data = booking_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(booking, field, value)

    booking.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(booking)
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
    """
    Permanently delete a booking by ID. Requires admin authentication.
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with id {booking_id} not found",
        )
    db.delete(booking)
    db.commit()
