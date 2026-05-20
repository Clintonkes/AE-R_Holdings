from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class AdminLogin(BaseModel):
    """Schema for admin login request."""

    email: EmailStr
    password: str


class AdminResponse(BaseModel):
    """Schema for admin data returned in responses."""

    id: int
    name: str
    email: EmailStr
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    """Schema for JWT token response after successful login."""

    access_token: str
    token_type: str = "bearer"
    admin: AdminResponse
