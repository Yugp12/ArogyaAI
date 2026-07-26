import uuid
from sqlalchemy import String, Float, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.database.session import Base
from app.models.base import BaseModelMixin

class AIPrediction(Base, BaseModelMixin):
    __tablename__ = "ai_predictions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    model_name: Mapped[str] = mapped_column(String(100), default="ArogyaAI Gemini Health Pro 5.0", index=True)
    domain: Mapped[str] = mapped_column(String(50), nullable=False, index=True) # Epidemic, Inventory, Bed, Workforce
    confidence_score: Mapped[float] = mapped_column(Float, default=98.8)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    feature_importance_shap: Mapped[dict | None] = mapped_column(JSON, nullable=True)

class AuditLog(Base, BaseModelMixin):
    __tablename__ = "audit_logs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    actor_name: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    action: Mapped[str] = mapped_column(Text, nullable=False)
    ip_address: Mapped[str] = mapped_column(String(50), default="10.0.4.12")
