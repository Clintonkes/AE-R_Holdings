from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models.admin import Admin
from app.auth.jwt import create_access_token
from app.auth.dependencies import get_current_admin
from app.schemas.admin import AdminResponse, TokenResponse
from passlib.context import CryptContext

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/login", response_model=TokenResponse, summary="Admin login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> TokenResponse:
    """
    Authenticate an admin with email (username field) and password.
    Returns a JWT access token valid for 24 hours.
    """
    admin = db.query(Admin).filter(Admin.email == form_data.username).first()

    if not admin or not pwd_context.verify(form_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin account is inactive",
        )

    # Update last_login timestamp
    admin.last_login = datetime.utcnow()
    db.commit()
    db.refresh(admin)

    access_token = create_access_token(data={"sub": str(admin.id)})

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        admin=AdminResponse.model_validate(admin),
    )


@router.post("/logout", summary="Admin logout")
def logout(
    current_admin: Admin = Depends(get_current_admin),
) -> dict:
    """
    Logout the current admin. The client should delete the stored token.
    Server-side this is a no-op since JWTs are stateless.
    """
    return {"message": "Successfully logged out"}


@router.get("/me", response_model=AdminResponse, summary="Get current admin")
def get_me(
    current_admin: Admin = Depends(get_current_admin),
) -> Admin:
    """
    Return the currently authenticated admin's profile information.
    """
    return current_admin
