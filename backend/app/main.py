import json
import logging
from contextlib import asynccontextmanager
from datetime import datetime
from typing import AsyncGenerator

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database import SessionLocal, create_tables

# Import models so SQLAlchemy knows about them before create_tables is called
from app.models.admin import Admin
from app.models.booking import Booking  # noqa: F401
from app.models.message import Message  # noqa: F401
from app.models.testimonial import Testimonial  # noqa: F401
from app.models.service import Service
from app.models.settings import SiteSettings  # noqa: F401

from app.routes import auth, bookings, messages, testimonials, services, settings as settings_router

logger = logging.getLogger(__name__)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def seed_default_admin(db: Session) -> None:
    """
    Seed the default admin account if no admins exist in the database.
    Uses credentials from environment / config.
    """
    existing = db.query(Admin).first()
    if existing:
        return

    hashed_password = pwd_context.hash(settings.ADMIN_PASSWORD)
    admin = Admin(
        email=settings.ADMIN_EMAIL,
        hashed_password=hashed_password,
        name="AE$R Admin",
        is_active=True,
        created_at=datetime.utcnow(),
    )
    db.add(admin)
    db.commit()
    logger.info("Default admin account created: %s", settings.ADMIN_EMAIL)


def seed_services(db: Session) -> None:
    """
    Seed the six default cleaning service offerings if no services exist.
    """
    existing_count = db.query(Service).count()
    if existing_count > 0:
        return

    default_services = [
        {
            "name": "Residential Cleaning",
            "slug": "residential",
            "description": (
                "Thorough, reliable cleaning for homes of all sizes. "
                "Our trained professionals use eco-friendly products to keep your home spotless."
            ),
            "details": json.dumps([
                "Full kitchen cleaning including appliances",
                "Bathroom deep scrub and sanitization",
                "Vacuuming and mopping all floors",
                "Dusting surfaces, blinds, and ceiling fans",
                "Bedroom tidying and linen change (optional)",
                "Trash removal and recycling",
            ]),
            "is_active": True,
        },
        {
            "name": "Commercial Cleaning",
            "slug": "commercial",
            "description": (
                "Professional cleaning solutions for offices, retail spaces, and commercial facilities. "
                "We work around your schedule to minimize disruption."
            ),
            "details": json.dumps([
                "Office and workspace sanitization",
                "Common area and lobby cleaning",
                "Restroom deep cleaning and restocking",
                "Window and glass surface cleaning",
                "Floor care: vacuuming, mopping, polishing",
                "Trash and recycling management",
                "After-hours and weekend availability",
            ]),
            "is_active": True,
        },
        {
            "name": "Deep Cleaning",
            "slug": "deep_cleaning",
            "description": (
                "An intensive, top-to-bottom clean for homes and offices that need extra attention. "
                "Perfect as a one-time reset or seasonal refresh."
            ),
            "details": json.dumps([
                "Inside oven, refrigerator, and dishwasher cleaning",
                "Cabinet interiors wiped down",
                "Grout scrubbing in bathrooms and kitchens",
                "Baseboards, door frames, and window sills",
                "Behind and under furniture and appliances",
                "Light fixtures and switch plates sanitized",
                "Full bathroom descaling and disinfection",
            ]),
            "is_active": True,
        },
        {
            "name": "Move In / Move Out Cleaning",
            "slug": "move_in_out",
            "description": (
                "Comprehensive cleaning designed for tenants moving in or out, "
                "ensuring the property is spotless and ready for the next occupant or handover."
            ),
            "details": json.dumps([
                "Full deep clean of entire property",
                "Inside all cabinets, drawers, and closets",
                "All appliances cleaned inside and out",
                "Walls spot-cleaned for scuffs and marks",
                "Carpet vacuuming and spot treatment",
                "Windows, sills, and blinds cleaned",
                "Garage sweep (if applicable)",
            ]),
            "is_active": True,
        },
        {
            "name": "Post-Construction Cleaning",
            "slug": "post_construction",
            "description": (
                "Specialized cleaning after renovation or new construction to remove dust, "
                "debris, and residue, leaving the space move-in ready."
            ),
            "details": json.dumps([
                "Construction dust removal from all surfaces",
                "Debris and leftover material disposal",
                "Window and glass cleaning (paint, stickers, adhesive)",
                "Hard floor scrubbing and polishing",
                "Vent and ductwork exterior cleaning",
                "Fixture and hardware polishing",
                "Final inspection walk-through",
            ]),
            "is_active": True,
        },
        {
            "name": "Specialty Cleaning",
            "slug": "specialty",
            "description": (
                "Tailored cleaning services for unique needs including carpet cleaning, "
                "upholstery, pressure washing, and more. Contact us to discuss your specific requirements."
            ),
            "details": json.dumps([
                "Carpet steam cleaning and stain treatment",
                "Upholstery and furniture cleaning",
                "Exterior pressure washing (driveways, patios)",
                "Tile and grout restoration",
                "Mattress cleaning and sanitization",
                "Biohazard and odor remediation",
                "Custom quote based on project scope",
            ]),
            "is_active": True,
        },
    ]

    for svc_data in default_services:
        service = Service(**svc_data)
        db.add(service)

    db.commit()
    logger.info("Default services seeded (%d services)", len(default_services))


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan handler: creates tables and seeds initial data on startup."""
    create_tables()
    db = SessionLocal()
    try:
        seed_default_admin(db)
        seed_services(db)
    finally:
        db.close()
    logger.info("AE$R Holdings API started successfully")
    yield
    logger.info("AE$R Holdings API shutting down")


app = FastAPI(
    title="AE$R Holdings API",
    version="1.0.0",
    description=(
        "Backend API for AE$R Holdings — a premium cleaning services company. "
        "Manage bookings, contact messages, testimonials, services, and site settings."
    ),
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# CORS Middleware
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(auth.router)
app.include_router(bookings.router)
app.include_router(messages.router)
app.include_router(testimonials.router)
app.include_router(services.router)
app.include_router(settings_router.router)


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------
@app.get("/health", tags=["Health"], summary="Health check")
def health_check() -> dict:
    """Return service health status."""
    return {"status": "healthy", "app": "AE$R Holdings API"}


# ---------------------------------------------------------------------------
# Global exception handler for validation errors
# ---------------------------------------------------------------------------
@app.exception_handler(422)
async def validation_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Return a clean JSON error response for Pydantic validation failures."""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": "Validation error",
            "errors": getattr(exc, "errors", lambda: str(exc))(),
        },
    )
