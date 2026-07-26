from typing import Generic, TypeVar, Type, Optional, List, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.database.session import Base

ModelType = TypeVar("ModelType", bound=Base)

class BaseRepository(Generic[ModelType]):
    """Generic Repository Pattern providing async CRUD operations."""

    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def get_by_id(self, db: AsyncSession, id: Any) -> Optional[ModelType]:
        """Fetch a single record by primary key."""
        stmt = select(self.model).where(self.model.id == id, getattr(self.model, "is_deleted", False) == False)
        res = await db.execute(stmt)
        return res.scalar_one_or_none()

    async def list_all(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> List[ModelType]:
        """Fetch paginated records excluding soft-deleted items."""
        stmt = select(self.model).where(getattr(self.model, "is_deleted", False) == False).offset(skip).limit(limit)
        res = await db.execute(stmt)
        return list(res.scalars().all())

    async def create(self, db: AsyncSession, obj_in_data: dict) -> ModelType:
        """Create a new model instance."""
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        await db.flush()
        await db.refresh(db_obj)
        return db_obj

    async def soft_delete(self, db: AsyncSession, id: Any) -> bool:
        """Soft delete a record by setting is_deleted = True."""
        stmt = update(self.model).where(self.model.id == id).values(is_deleted=True)
        res = await db.execute(stmt)
        return res.rowcount > 0
