from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from api.database import get_db
from api.models.service import Service
from api.models.admin import Admin
from api.auth.dependencies import get_current_admin
from api.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse

router = APIRouter(tags=["Services"])


@router.get(
    "/api/services",
    response_model=List[ServiceResponse],
    summary="List active services",
)
def list_active_services(
    db: Session = Depends(get_db),
) -> List[Service]:
    """
    Retrieve all active cleaning services (public endpoint).
    Only returns services where is_active=True.
    """
    return (
        db.query(Service)
        .filter(Service.is_active == True)
        .order_by(Service.id.asc())
        .all()
    )


@router.post(
    "/api/admin/services",
    response_model=ServiceResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a service (admin)",
)
def create_service(
    service_data: ServiceCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> Service:
    """
    Create a new cleaning service offering. Requires admin authentication.
    The 'details' field should be a JSON string representing an array of bullet points.
    """
    existing = db.query(Service).filter(Service.slug == service_data.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Service with slug '{service_data.slug}' already exists",
        )

    service = Service(
        name=service_data.name,
        slug=service_data.slug,
        description=service_data.description,
        details=service_data.details,
        is_active=service_data.is_active,
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


@router.patch(
    "/api/admin/services/{service_id}",
    response_model=ServiceResponse,
    summary="Update a service (admin)",
)
def update_service(
    service_id: int,
    service_data: ServiceUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> Service:
    """
    Update a service's details. All fields are optional.
    Requires admin authentication.
    """
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with id {service_id} not found",
        )

    # Check slug uniqueness if slug is being updated
    update_data = service_data.model_dump(exclude_unset=True)
    if "slug" in update_data and update_data["slug"] != service.slug:
        existing = db.query(Service).filter(Service.slug == update_data["slug"]).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Service with slug '{update_data['slug']}' already exists",
            )

    for field, value in update_data.items():
        setattr(service, field, value)

    db.commit()
    db.refresh(service)
    return service


@router.delete(
    "/api/admin/services/{service_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a service (admin)",
)
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
) -> None:
    """
    Permanently delete a service by ID. Requires admin authentication.
    """
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with id {service_id} not found",
        )
    db.delete(service)
    db.commit()
