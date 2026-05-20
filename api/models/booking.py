from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from api.database import Base


class Booking(Base):
    """Booking model for cleaning service appointments."""

    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    # service_type: residential, commercial, deep_cleaning, move_in_out, post_construction, specialty
    service_type = Column(String(50), nullable=False)
    preferred_date = Column(String(50), nullable=False)
    preferred_time = Column(String(50), nullable=False)
    address = Column(String(500), nullable=False)
    special_instructions = Column(Text, nullable=True)
    # status: pending, approved, in_progress, completed, cancelled
    status = Column(String(50), nullable=False, default="pending")
    notes = Column(Text, nullable=True)  # Admin notes
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )
