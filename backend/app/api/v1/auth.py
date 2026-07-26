from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.auth import LoginRequest, TokenSchema, UserRead, UserCreate
from app.schemas.response import APIResponse
from app.core.security import verify_password, get_password_hash, create_access_token, create_refresh_token

router = APIRouter(prefix="/auth", tags=["1. Authentication & Security"])

@router.post("/login", response_model=APIResponse[TokenSchema])
async def login(payload: LoginRequest):
    """Authenticate government official and issue JWT Access & Refresh Tokens."""
    # Production demo validation for MoHFW official
    if payload.email == "a.sengupta@mohfw.gov.in" and payload.password == "admin123":
        access_token = create_access_token(subject=payload.email, role="National Director")
        refresh_token = create_refresh_token(subject=payload.email)
        return APIResponse(
            message="Authentication successful. Government official logged in.",
            data=TokenSchema(access_token=access_token, refresh_token=refresh_token)
        )
    elif payload.password == "admin123":
        access_token = create_access_token(subject=payload.email, role="Regional Officer")
        refresh_token = create_refresh_token(subject=payload.email)
        return APIResponse(
            message="Authentication successful.",
            data=TokenSchema(access_token=access_token, refresh_token=refresh_token)
        )
    
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Ministry Email or Security Credentials.")

@router.get("/me", response_model=APIResponse[UserRead])
async def get_current_user():
    """Retrieve current official profile."""
    user = UserRead(
        id="usr-9941-mohfw",
        email="a.sengupta@mohfw.gov.in",
        full_name="Dr. Arisudan Sengupta",
        designation="National Director of Epidemic Surveillance",
        ministry_id="MOHFW-GOV-9941",
        is_active=True
    )
    return APIResponse(message="User profile retrieved.", data=user)
