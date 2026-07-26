import uuid
from sqlalchemy import String, Integer, Float, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.session import Base
from app.models.base import BaseModelMixin

class Hospital(Base, BaseModelMixin):
    __tablename__ = "hospitals"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    district: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    state: Mapped[str] = mapped_column(String(100), default="Delhi NCR")
    status: Mapped[str] = mapped_column(String(20), default="GREEN", index=True) # GREEN, YELLOW, RED
    health_score: Mapped[float] = mapped_column(Float, default=98.5)
    total_beds: Mapped[int] = mapped_column(Integer, default=1000)
    occupied_beds: Mapped[int] = mapped_column(Integer, default=750)
    icu_total: Mapped[int] = mapped_column(Integer, default=200)
    icu_occupied: Mapped[int] = mapped_column(Integer, default=150)
    o2_reserve_days: Mapped[float] = mapped_column(Float, default=8.5)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)

    departments = relationship("Department", back_populates="hospital")

class Department(Base, BaseModelMixin):
    __tablename__ = "departments"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    hospital_id: Mapped[str] = mapped_column(String(36), ForeignKey("hospitals.id", ondelete="CASCADE"), index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    head_doctor: Mapped[str | None] = mapped_column(String(150), nullable=True)

    hospital = relationship("Hospital", back_populates="departments")
    beds = relationship("Bed", back_populates="department")

class Bed(Base, BaseModelMixin):
    __tablename__ = "beds"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    department_id: Mapped[str] = mapped_column(String(36), ForeignKey("departments.id", ondelete="CASCADE"), index=True)
    bed_number: Mapped[str] = mapped_column(String(20), nullable=False)
    is_icu: Mapped[bool] = mapped_column(Boolean, default=False)
    is_occupied: Mapped[bool] = mapped_column(Boolean, default=False, index=True)

    department = relationship("Department", back_populates="beds")
