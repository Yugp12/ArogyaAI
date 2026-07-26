from typing import Any, Optional

class BaseAppException(Exception):
    """Base exception class for all custom application errors."""
    def __init__(self, message: str, status_code: int = 400, errors: Optional[Any] = None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.errors = errors

class UnauthorizedException(BaseAppException):
    def __init__(self, message: str = "Invalid or expired authentication credentials"):
        super().__init__(message=message, status_code=401)

class ForbiddenException(BaseAppException):
    def __init__(self, message: str = "You do not have sufficient RBAC permissions to perform this action"):
        super().__init__(message=message, status_code=403)

class NotFoundException(BaseAppException):
    def __init__(self, resource: str, resource_id: Any):
        super().__init__(message=f"{resource} with ID '{resource_id}' was not found", status_code=404)

class ValidationException(BaseAppException):
    def __init__(self, message: str = "Input validation failure", errors: Optional[Any] = None):
        super().__init__(message=message, status_code=422, errors=errors)

class RateLimitExceededException(BaseAppException):
    def __init__(self, message: str = "Rate limit exceeded. Please try again later."):
        super().__init__(message=message, status_code=429)
