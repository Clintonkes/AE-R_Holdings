from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional


class TestimonialCreate(BaseModel):
    """Schema for creating a new testimonial."""

    customer_name: str
    location: str
    service_type: str
    rating: int
    content: str

    @field_validator("rating")
    @classmethod
    def rating_must_be_valid(cls, v: int) -> int:
        if v < 1 or v > 5:
            raise ValueError("Rating must be between 1 and 5")
        return v


class TestimonialUpdate(BaseModel):
    """Schema for updating a testimonial (admin only)."""

    is_published: Optional[bool] = None
    content: Optional[str] = None
    customer_name: Optional[str] = None
    location: Optional[str] = None
    service_type: Optional[str] = None
    rating: Optional[int] = None

    @field_validator("rating")
    @classmethod
    def rating_must_be_valid(cls, v: Optional[int]) -> Optional[int]:
        if v is not None and (v < 1 or v > 5):
            raise ValueError("Rating must be between 1 and 5")
        return v


class TestimonialResponse(BaseModel):
    """Schema for testimonial data returned in responses."""

    id: int
    customer_name: str
    location: str
    service_type: str
    rating: int
    content: str
    is_published: bool
    created_at: datetime

    model_config = {"from_attributes": True}
