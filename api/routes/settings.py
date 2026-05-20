from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from api.database import get_db
from api.models.settings import SiteSettings
from api.models.admin import Admin
from api.auth.dependencies import get_current_admin

router = APIRouter(prefix="/api/admin", tags=["Settings"])


class SiteSettingsUpdate(BaseModel):
    """Schema for updating site settings (all fields optional)."""

    site_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    business_hours: Optional[str] = None
    meta_description: Optional[str] = None


class SiteSettingsResponse(BaseModel):
    """Schema for site settings returned in responses."""

    id: int
    site_name: str
    phone: str
    address: str
    email: str
    business_hours: str
    meta_description: Optional[str] = None
    updated_at: datetime

    model_config = {"from_attributes": True}


@router.get(
    "/settings",
    response_model=SiteSettingsResponse,
    summary="Get site settings (admin)",
)
def get_settings(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> SiteSettings:
    """
    Retrieve the current site settings. Creates defaults if none exist.
    Requires admin authentication.
    """
    settings_obj = db.query(SiteSettings).filter(SiteSettings.id == 1).first()
    if not settings_obj:
        settings_obj = SiteSettings(
            id=1,
            site_name="AE$R Holdings",
            phone="",
            address="",
            email="",
            business_hours="Mon-Fri 8am-6pm",
            meta_description="Premium cleaning services by AE$R Holdings.",
            updated_at=datetime.utcnow(),
        )
        db.add(settings_obj)
        db.commit()
        db.refresh(settings_obj)
    return settings_obj


@router.patch(
    "/settings",
    response_model=SiteSettingsResponse,
    summary="Update site settings (admin)",
)
def update_settings(
    settings_data: SiteSettingsUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> SiteSettings:
    """
    Update site-wide settings. Creates the settings record if it does not exist.
    Requires admin authentication.
    """
    settings_obj = db.query(SiteSettings).filter(SiteSettings.id == 1).first()
    if not settings_obj:
        settings_obj = SiteSettings(
            id=1,
            site_name="AE$R Holdings",
            phone="",
            address="",
            email="",
            business_hours="Mon-Fri 8am-6pm",
            updated_at=datetime.utcnow(),
        )
        db.add(settings_obj)
        db.flush()

    update_data = settings_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(settings_obj, field, value)

    settings_obj.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(settings_obj)
    return settings_obj
