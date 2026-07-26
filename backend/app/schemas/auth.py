from typing import Optional
from pydantic import BaseModel, EmailStr

class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserRead(BaseModel):
    id: str
    email: str
    full_name: str
    designation: str
    ministry_id: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    designation: str = "National Director"
    ministry_id: Optional[str] = "MOHFW-GOV-9941"
