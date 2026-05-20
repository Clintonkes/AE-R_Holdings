from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from api.database import get_db
from api.models.testimonial import Testimonial
from api.models.admin import Admin
from api.auth.dependencies import get_current_admin
from api.schemas.testimonial import (
    TestimonialCreate,
    TestimonialUpdate,
    TestimonialResponse,
)

router = APIRouter(tags=["Testimonials"])


@router.get(
    "/api/testimonials",
    response_model=List[TestimonialResponse],
    summary="List published testimonials",
)
def list_published_testimonials(
    db: Session = Depends(get_db),
) -> List[Testimonial]:
    """
    Retrieve all published testimonials (public endpoint).
    Only returns testimonials where is_published=True, ordered by newest first.
    """
    return (
        db.query(Testimonial)
        .filter(Testimonial.is_published == True)
        .order_by(Testimonial.created_at.desc())
        .all()
    )


@router.get(
    "/api/admin/testimonials",
    response_model=List[TestimonialResponse],
    summary="List all testimonials (admin)",
)
def list_all_testimonials(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> List[Testimonial]:
    """
    Retrieve all testimonials including unpublished ones.
    Requires admin authentication.
    """
    return db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()


@router.post(
    "/api/admin/testimonials",
    response_model=TestimonialResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a testimonial (admin)",
)
def create_testimonial(
    testimonial_data: TestimonialCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> Testimonial:
    """
    Create a new testimonial. Newly created testimonials are unpublished by default.
    Requires admin authentication.
    """
    testimonial = Testimonial(
        customer_name=testimonial_data.customer_name,
        location=testimonial_data.location,
        service_type=testimonial_data.service_type,
        rating=testimonial_data.rating,
        content=testimonial_data.content,
        is_published=False,
    )
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.patch(
    "/api/admin/testimonials/{testimonial_id}",
    response_model=TestimonialResponse,
    summary="Update a testimonial (admin)",
)
def update_testimonial(
    testimonial_id: int,
    testimonial_data: TestimonialUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> Testimonial:
    """
    Update a testimonial's content, publish/unpublish it, or update other fields.
    Requires admin authentication.
    """
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Testimonial with id {testimonial_id} not found",
        )

    update_data = testimonial_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(testimonial, field, value)

    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.delete(
    "/api/admin/testimonials/{testimonial_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a testimonial (admin)",
)
def delete_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> None:
    """
    Permanently delete a testimonial by ID. Requires admin authentication.
    """
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Testimonial with id {testimonial_id} not found",
        )
    db.delete(testimonial)
    db.commit()
