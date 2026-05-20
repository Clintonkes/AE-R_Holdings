from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class MessageCreate(BaseModel):
    """Schema for submitting a contact form message."""

    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str


class MessageUpdate(BaseModel):
    """Schema for updating a message (admin only)."""

    is_read: Optional[bool] = None
    response: Optional[str] = None


class MessageResponse(BaseModel):
    """Schema for message data returned in responses."""

    id: int
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    is_read: bool
    response: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}
