from typing import Optional, List, Dict
from pydantic import BaseModel

class WhatIfRequest(BaseModel):
    scenario: str = "Dengue +40% Surge in Kozhikode"
    district: str = "Kozhikode Vector Zone"

class WhatIfResponse(BaseModel):
    scenario: str
    o2_shortage_days: str = "Critical in 3 Days"
    doctors_needed: str = "+42 Specialists"
    icu_occupancy_pct: str = "98% Saturation"
    wait_time_increase: str = "+28% Increase"
    fleet_demand: str = "+14 Squadrons"
    cost_savings: str = "₹1.8 Lakh Saved"
    confidence_score: float = 98.8

class AIPredictionRead(BaseModel):
    id: str
    model_name: str
    domain: str
    confidence_score: float
    summary: str
    feature_importance_shap: Optional[Dict[str, float]] = None

    class Config:
        from_attributes = True
