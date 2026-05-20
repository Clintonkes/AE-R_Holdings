from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from api.database import get_db
from api.auth.jwt import verify_token
from api.models.admin import Admin

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_current_admin(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> Admin:
    """
    FastAPI dependency that validates the JWT bearer token and returns the active admin.

    Raises:
        HTTPException 401: If the token is missing, invalid, or the admin is not found/inactive.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = verify_token(token)
    if payload is None:
        raise credentials_exception

    admin_id: int = payload.get("sub")
    if admin_id is None:
        raise credentials_exception

    admin = db.query(Admin).filter(Admin.id == int(admin_id)).first()
    if admin is None:
        raise credentials_exception

    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin account is inactive",
        )

    return admin
