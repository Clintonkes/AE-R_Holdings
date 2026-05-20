from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from enum import Enum


class ServiceType(str, Enum):
    residential = "residential"
    commercial = "commercial"
    deep_cleaning = "deep_cleaning"
    move_in_out = "move_in_out"
    post_construction = "post_construction"
    specialty = "specialty"


class BookingStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"


class BookingCreate(BaseModel):
    """Schema for creating a new booking."""

    full_name: str
    email: EmailStr
    phone: str
    service_type: ServiceType
    preferred_date: str
    preferred_time: str
    address: str
    special_instructions: Optional[str] = None


class BookingUpdate(BaseModel):
    """Schema for updating a booking (admin only)."""

    status: Optional[BookingStatus] = None
    notes: Optional[str] = None


class BookingResponse(BaseModel):
    """Schema for booking data returned in responses."""

    id: int
    full_name: str
    email: str
    phone: str
    service_type: str
    preferred_date: str
    preferred_time: str
    address: str
    special_instructions: Optional[str] = None
    status: str
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
