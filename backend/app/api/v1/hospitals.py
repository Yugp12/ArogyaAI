from fastapi import APIRouter
from app.schemas.response import APIResponse
from typing import List

router = APIRouter(prefix="/hospitals", tags=["4. Hospital & Digital Twin Management"])

@router.get("", response_model=APIResponse[List[dict]])
async def list_hospitals():
    """Retrieve national apex hospital telemetry nodes."""
    hospitals = [
        {
            "id": "NODE-101",
            "name": "AIIMS New Delhi Apex Node",
            "district": "Delhi NCR Sector",
            "status": "GREEN",
            "health_score": 99.4,
            "bed_occupancy": "78% (260 Beds Free)",
            "doctors_active": 1200,
            "o2_supply_days": 8.5
        },
        {
            "id": "NODE-102",
            "name": "Kozhikode Epidemic Command Node",
            "district": "Kerala Vector Zone",
            "status": "RED",
            "health_score": 68.2,
            "bed_occupancy": "94% (12 Beds Free)",
            "doctors_active": 480,
            "o2_supply_days": 1.8
        },
        {
            "id": "NODE-103",
            "name": "PGIMER Chandigarh Regional Hub",
            "district": "Punjab/Haryana Sector",
            "status": "YELLOW",
            "health_score": 84.5,
            "bed_occupancy": "96% (18 Beds Free)",
            "doctors_active": 890,
            "o2_supply_days": 4.2
        }
    ]
    return APIResponse(message="Hospital telemetry retrieved.", data=hospitals)

@router.get("/digital-twin/{node_id}", response_model=APIResponse[dict])
async def get_digital_twin_node(node_id: str):
    """Retrieve 3D Digital Twin detailed inspection metrics for a hospital node."""
    node_data = {
        "id": node_id,
        "name": "AIIMS New Delhi Apex Node",
        "district": "Delhi NCR Sector",
        "status": "GREEN",
        "health_score": 99.4,
        "bed_occupancy": "78%",
        "doctors_active": 1200,
        "o2_supply_days": 8.5,
        "wgs_sequencers_online": 8,
        "ai_alert": "Nominal stability. High capacity available for Tele-ICU diversion."
    }
    return APIResponse(message=f"Digital Twin for node {node_id} retrieved.", data=node_data)
