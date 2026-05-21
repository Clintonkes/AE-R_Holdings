from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./aer_holdings.db"
    SECRET_KEY: str = "change-me-in-production-use-256-bit-random-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    ADMIN_EMAIL: str = "admin@aerholdings.com"
    ADMIN_PASSWORD: str = "Admin@2024!"
    RESEND_API_KEY: str = ""
    RESEND_FROM_EMAIL: str = "AE$R Holdings <onboarding@resend.dev>"
    ADMIN_NOTIFY_EMAIL: str = "admin@aerholdings.com"

    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://*.railway.app",
        "https://*.vercel.app",
    ]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
