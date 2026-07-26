from datetime import datetime, timezone
import uuid
from typing import Generic, TypeVar, Optional, Any
from pydantic import BaseModel, Field

T = TypeVar("T")

class APIResponse(BaseModel, Generic[T]):
    status: str = "success"
    message: str = "Operation completed successfully"
    data: Optional[T] = None
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    request_id: str = Field(default_factory=lambda: f"req-{uuid.uuid4().hex[:8]}")
    errors: Optional[Any] = None

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
