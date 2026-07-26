import uuid
from sqlalchemy import String, Integer, Float, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.session import Base
from app.models.base import BaseModelMixin

class Medicine(Base, BaseModelMixin):
    __tablename__ = "medicines"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    barcode_gs1: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    category: Mapped[str] = mapped_column(String(100), default="Antiviral / Critical Care")
    manufacturer: Mapped[str] = mapped_column(String(150), default="Bharat Biotech / Serum Institute")

class MedicineInventory(Base, BaseModelMixin):
    __tablename__ = "medicine_inventory"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    hospital_id: Mapped[str] = mapped_column(String(36), ForeignKey("hospitals.id", ondelete="CASCADE"), index=True)
    medicine_id: Mapped[str] = mapped_column(String(36), ForeignKey("medicines.id", ondelete="CASCADE"), index=True)
    quantity_units: Mapped[int] = mapped_column(Integer, default=1000)
    stockout_risk_pct: Mapped[float] = mapped_column(Float, default=12.5)
    days_remaining: Mapped[int] = mapped_column(Integer, default=14)

class MedicineTransfer(Base, BaseModelMixin):
    __tablename__ = "medicine_transfers"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    transfer_code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    from_hospital_id: Mapped[str] = mapped_column(String(36), ForeignKey("hospitals.id"), index=True)
    to_hospital_id: Mapped[str] = mapped_column(String(36), ForeignKey("hospitals.id"), index=True)
    item_name: Mapped[str] = mapped_column(String(150), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    reason: Mapped[str] = mapped_column(Text, nullable=False)
    ai_confidence_pct: Mapped[float] = mapped_column(Float, default=98.8)
    status: Mapped[str] = mapped_column(String(30), default="PROPOSED", index=True) # PROPOSED, APPROVED, IN_TRANSIT, COMPLETED
