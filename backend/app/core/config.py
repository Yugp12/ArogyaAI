from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl

class Settings(BaseSettings):
    PROJECT_NAME: str = "ArogyaAI OS Autonomous Healthcare Engine"
    TAGLINE: str = "The AI That Runs Healthcare Before Problems Begin."
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Security & Auth
    JWT_SECRET: str = "arogya_ai_super_secret_jwt_key_2035_mohfw_whogrid"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000", "*"]

    # Database & Cache
    DATABASE_URL: str = "postgresql+asyncpg://arogya_admin:secret_pass_2035@localhost:5432/arogya_db"
    REDIS_URL: str = "redis://localhost:6379/0"

    # Monitoring & Tracking
    SENTRY_DSN: Optional[str] = None
    ENVIRONMENT: str = "production"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
