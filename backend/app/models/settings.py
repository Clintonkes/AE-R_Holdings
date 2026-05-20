from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.database import Base


class SiteSettings(Base):
    """Site-wide settings model (singleton, id=1)."""

    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, default=1)
    site_name = Column(String(255), nullable=False, default="AE$R Holdings")
    phone = Column(String(50), nullable=False, default="")
    address = Column(String(500), nullable=False, default="")
    email = Column(String(255), nullable=False, default="")
    business_hours = Column(String(255), nullable=False, default="Mon-Fri 8am-6pm")
    meta_description = Column(Text, nullable=True)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )
