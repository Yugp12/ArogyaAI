import uuid
from sqlalchemy import String, Integer, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.database.session import Base
from app.models.base import BaseModelMixin

class Patient(Base, BaseModelMixin):
    __tablename__ = "patients"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    abha_id: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    full_name: Mapped[str] = mapped_column(String(150), nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    gender: Mapped[str] = mapped_column(String(20), nullable=False)
    contact_phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    triage_priority: Mapped[str] = mapped_column(String(20), default="P2 MEDIUM", index=True) # P1 HIGH, P2 MEDIUM, P3 LOW
    spo2_level: Mapped[int] = mapped_column(Integer, default=98)
    heart_rate: Mapped[int] = mapped_column(Integer, default=76)
    diagnosis: Mapped[str | None] = mapped_column(Text, nullable=True)
    assigned_hospital_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("hospitals.id"), nullable=True)
