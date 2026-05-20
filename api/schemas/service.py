from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ServiceCreate(BaseModel):
    """Schema for creating a new service."""

    name: str
    slug: str
    description: str
    details: str  # JSON string of bullet points
    is_active: bool = True


class ServiceUpdate(BaseModel):
    """Schema for updating a service (all fields optional)."""

    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    details: Optional[str] = None
    is_active: Optional[bool] = None


class ServiceResponse(BaseModel):
    """Schema for service data returned in responses."""

    id: int
    name: str
    slug: str
    description: str
    details: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
