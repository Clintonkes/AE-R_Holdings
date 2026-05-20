from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime

from api.database import Base


class Service(Base):
    """Cleaning service offering model."""

    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    details = Column(Text, nullable=False)  # JSON string of bullet points
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
