from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.database import get_db
from api.models.admin import Admin
from api.models.booking import Booking
from api.models.message import Message
from api.auth.dependencies import get_current_admin

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/stats", summary="Get dashboard statistics (admin)")
def get_admin_stats(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> dict:
    """Return aggregate stats for the admin dashboard."""
    total_bookings = db.query(Booking).count()
    pending_bookings = db.query(Booking).filter(Booking.status == "pending").count()
    total_messages = db.query(Message).count()
    return {
        "total_bookings": total_bookings,
        "pending_bookings": pending_bookings,
        "messages": total_messages,
        "revenue": 0,
    }
