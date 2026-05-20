"""
Standalone seed script for AE$R Holdings backend.

Populates sample bookings and testimonials for development/testing.
Run from the backend/ directory:

    python seed.py

The script is idempotent — running it multiple times appends new records but
never duplicates the default admin or default services (those are handled by
the app startup lifespan).
"""

import sys
import os
from datetime import datetime, timedelta
import random

# Ensure the backend package is on the path when running as a script
sys.path.insert(0, os.path.dirname(__file__))

from app.database import SessionLocal, create_tables
from app.models.admin import Admin  # noqa: F401 — ensure table registered
from app.models.booking import Booking
from app.models.message import Message
from app.models.testimonial import Testimonial
from app.models.service import Service  # noqa: F401
from app.models.settings import SiteSettings  # noqa: F401
from app.main import seed_default_admin, seed_services


def seed_sample_bookings(db) -> int:
    """Insert sample bookings and return the count added."""
    sample_bookings = [
        {
            "full_name": "Marcus Johnson",
            "email": "marcus.johnson@email.com",
            "phone": "(555) 201-3344",
            "service_type": "residential",
            "preferred_date": "2024-02-15",
            "preferred_time": "9:00 AM",
            "address": "142 Maple Street, Austin, TX 78701",
            "special_instructions": "Please focus on the kitchen and master bathroom.",
            "status": "completed",
        },
        {
            "full_name": "Sarah Chen",
            "email": "sarah.chen@techcorp.com",
            "phone": "(555) 402-7788",
            "service_type": "commercial",
            "preferred_date": "2024-02-20",
            "preferred_time": "6:00 PM",
            "address": "555 Business Park Dr, Suite 300, Austin, TX 78759",
            "special_instructions": "After-hours cleaning required. Security code: 4421.",
            "status": "approved",
        },
        {
            "full_name": "Patricia Williams",
            "email": "patricia.w@homemail.com",
            "phone": "(555) 316-9900",
            "service_type": "deep_cleaning",
            "preferred_date": "2024-02-22",
            "preferred_time": "10:00 AM",
            "address": "87 Oak Lane, Round Rock, TX 78664",
            "special_instructions": None,
            "status": "pending",
        },
        {
            "full_name": "David & Lisa Park",
            "email": "parks.family@gmail.com",
            "phone": "(555) 508-1122",
            "service_type": "move_in_out",
            "preferred_date": "2024-02-28",
            "preferred_time": "8:00 AM",
            "address": "33 Riverside Blvd, Cedar Park, TX 78613",
            "special_instructions": "Moving out — need full apartment cleaned before handover to landlord.",
            "status": "approved",
        },
        {
            "full_name": "Greenfield Renovations LLC",
            "email": "ops@greenfieldrenov.com",
            "phone": "(555) 700-4455",
            "service_type": "post_construction",
            "preferred_date": "2024-03-05",
            "preferred_time": "7:00 AM",
            "address": "19 Commerce Way, Pflugerville, TX 78660",
            "special_instructions": "New build — heavy dust throughout. 3,200 sq ft.",
            "status": "in_progress",
        },
        {
            "full_name": "Amanda Torres",
            "email": "amanda.torres@email.com",
            "phone": "(555) 621-3367",
            "service_type": "specialty",
            "preferred_date": "2024-03-10",
            "preferred_time": "11:00 AM",
            "address": "201 Sunset Dr, Georgetown, TX 78626",
            "special_instructions": "Carpet steam cleaning — 4 bedrooms and living room.",
            "status": "pending",
        },
        {
            "full_name": "Robert Kim",
            "email": "rkim@outlook.com",
            "phone": "(555) 814-2233",
            "service_type": "residential",
            "preferred_date": "2024-03-12",
            "preferred_time": "2:00 PM",
            "address": "76 Willow Creek Rd, Leander, TX 78641",
            "special_instructions": None,
            "status": "pending",
        },
        {
            "full_name": "Sunrise Dental Group",
            "email": "office@sunrisedental.com",
            "phone": "(555) 903-6677",
            "service_type": "commercial",
            "preferred_date": "2024-02-10",
            "preferred_time": "7:00 PM",
            "address": "400 Medical Plaza, Suite 120, Austin, TX 78705",
            "special_instructions": "Medical office — must use hospital-grade disinfectants.",
            "status": "completed",
        },
    ]

    now = datetime.utcnow()
    added = 0
    for i, data in enumerate(sample_bookings):
        created = now - timedelta(days=random.randint(1, 30))
        booking = Booking(
            **data,
            notes=None,
            created_at=created,
            updated_at=created,
        )
        db.add(booking)
        added += 1

    db.commit()
    return added


def seed_sample_testimonials(db) -> int:
    """Insert sample testimonials and return the count added."""
    sample_testimonials = [
        {
            "customer_name": "Jennifer Martinez",
            "location": "Austin, TX",
            "service_type": "Residential Cleaning",
            "rating": 5,
            "content": (
                "AE$R Holdings has completely transformed how I feel about my home. "
                "The team is incredibly thorough, professional, and always on time. "
                "I've tried several cleaning services over the years, but none compare. "
                "My kitchen and bathrooms shine like they never have before!"
            ),
            "is_published": True,
        },
        {
            "customer_name": "Michael Thompson",
            "location": "Round Rock, TX",
            "service_type": "Commercial Cleaning",
            "rating": 5,
            "content": (
                "We switched our office building to AE$R Holdings six months ago and the difference "
                "is night and day. The team is discreet, efficient, and works seamlessly around our "
                "evening schedule. Our employees have noticed and commented on how clean the office feels. "
                "Highly recommend for any business owner."
            ),
            "is_published": True,
        },
        {
            "customer_name": "Priya Nair",
            "location": "Cedar Park, TX",
            "service_type": "Deep Cleaning",
            "rating": 5,
            "content": (
                "I booked a deep clean before a family gathering and I'm so glad I did. "
                "They cleaned places I forgot even existed — inside the oven, behind the fridge, "
                "grout in the tiles. Everything smelled amazing and looked brand new. "
                "Will definitely be booking the monthly maintenance service now!"
            ),
            "is_published": True,
        },
        {
            "customer_name": "Carlos & Diana Reyes",
            "location": "Pflugerville, TX",
            "service_type": "Move In / Move Out",
            "rating": 5,
            "content": (
                "We hired AE$R Holdings for our move-out cleaning and got our full deposit back — "
                "the landlord was genuinely impressed. The team paid attention to every detail, "
                "from the insides of cabinets to the window tracks. Worth every penny."
            ),
            "is_published": True,
        },
        {
            "customer_name": "Sandra Okafor",
            "location": "Georgetown, TX",
            "service_type": "Post-Construction",
            "rating": 4,
            "content": (
                "After our home renovation, the dust and debris were overwhelming. "
                "AE$R Holdings came in and made the house liveable within a day. "
                "Great attention to detail and very professional crew. Only docking one star "
                "because they arrived slightly later than scheduled, but the quality made up for it."
            ),
            "is_published": True,
        },
        {
            "customer_name": "Brian Walsh",
            "location": "Austin, TX",
            "service_type": "Specialty — Carpet Cleaning",
            "rating": 5,
            "content": (
                "My carpets had pet stains that I thought were permanent. After AE$R Holdings "
                "steam-cleaned them, you'd never know anything was there. The crew was friendly, "
                "fast, and the results were incredible. I've already recommended them to three neighbors."
            ),
            "is_published": True,
        },
        {
            "customer_name": "Natalie Ford",
            "location": "Leander, TX",
            "service_type": "Residential Cleaning",
            "rating": 5,
            "content": (
                "As a busy mom of three, having AE$R Holdings handle my weekly cleaning has been "
                "a game-changer. They're consistent, trustworthy, and genuinely care about quality. "
                "I love coming home on cleaning day — the whole house feels fresh and welcoming."
            ),
            "is_published": True,
        },
        {
            "customer_name": "Dr. James Osei",
            "location": "Austin, TX",
            "service_type": "Commercial Cleaning",
            "rating": 5,
            "content": (
                "Running a dental practice requires the highest standards of cleanliness. "
                "AE$R Holdings consistently delivers that. They use the right products, "
                "understand medical-grade sanitization requirements, and our patients have "
                "complimented the cleanliness of our facility. Exceptional service."
            ),
            "is_published": True,
        },
        {
            "customer_name": "Tanya Brooks",
            "location": "Hutto, TX",
            "service_type": "Residential Cleaning",
            "rating": 4,
            "content": (
                "Solid service, great results. The team was professional and friendly. "
                "My house was sparkling clean when they finished. Would have given 5 stars "
                "but I had a small miscommunication about the time — easily resolved though "
                "and they were very accommodating. Will book again."
            ),
            "is_published": False,  # Pending review
        },
    ]

    added = 0
    now = datetime.utcnow()
    for i, data in enumerate(sample_testimonials):
        created = now - timedelta(days=random.randint(5, 90))
        testimonial = Testimonial(**data, created_at=created)
        db.add(testimonial)
        added += 1

    db.commit()
    return added


def seed_sample_messages(db) -> int:
    """Insert sample contact messages and return the count added."""
    sample_messages = [
        {
            "name": "Kevin Larson",
            "email": "kevin.larson@gmail.com",
            "phone": "(555) 334-8890",
            "message": (
                "Hi, I'm interested in a recurring bi-weekly cleaning for my 2,400 sq ft home. "
                "Could you provide a quote and let me know your availability in the Austin area?"
            ),
            "is_read": False,
        },
        {
            "name": "Michelle Grant",
            "email": "michelle.grant@corpmail.com",
            "phone": None,
            "message": (
                "We're a property management company with 12 units that need monthly turnovers. "
                "Can you handle volume accounts and do you offer corporate pricing?"
            ),
            "is_read": True,
            "response": (
                "Hi Michelle, thank you for reaching out! We absolutely work with property management "
                "companies and offer discounted rates for volume accounts. I'll have our commercial "
                "coordinator reach out to you within 24 hours to discuss packages and pricing."
            ),
        },
        {
            "name": "Tom Bradley",
            "email": "tbradley@email.com",
            "phone": "(555) 701-2244",
            "message": "Do you serve the Georgetown area? I need a one-time deep clean for a 3BR home.",
            "is_read": True,
            "response": (
                "Hi Tom, yes we do serve Georgetown! We'd love to help with your deep clean. "
                "Please use our booking form to select your preferred date and we'll confirm availability shortly."
            ),
        },
        {
            "name": "Olivia Perez",
            "email": "olivia.perez@hotmail.com",
            "phone": "(555) 822-6655",
            "message": (
                "I had a cleaning last Tuesday and I just wanted to say the team was absolutely fantastic. "
                "Maria was so thorough and friendly — please pass along my compliments!"
            ),
            "is_read": False,
        },
    ]

    added = 0
    now = datetime.utcnow()
    for data in sample_messages:
        created = now - timedelta(days=random.randint(1, 20))
        msg = Message(
            name=data["name"],
            email=data["email"],
            phone=data.get("phone"),
            message=data["message"],
            is_read=data.get("is_read", False),
            response=data.get("response"),
            created_at=created,
        )
        db.add(msg)
        added += 1

    db.commit()
    return added


def main() -> None:
    print("AE$R Holdings — Development Seed Script")
    print("=" * 45)

    create_tables()
    db = SessionLocal()

    try:
        # Always ensure admin and default services exist
        seed_default_admin(db)
        seed_services(db)

        bookings_added = seed_sample_bookings(db)
        print(f"  Bookings added:      {bookings_added}")

        testimonials_added = seed_sample_testimonials(db)
        print(f"  Testimonials added:  {testimonials_added}")

        messages_added = seed_sample_messages(db)
        print(f"  Messages added:      {messages_added}")

        print()
        print("Seed complete. You can log in with:")
        print("  Email:    admin@aerholdings.com")
        print("  Password: Admin@2024!")
    finally:
        db.close()


if __name__ == "__main__":
    main()
