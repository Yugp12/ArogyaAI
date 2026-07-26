from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.base import BaseRepository
from app.models.hospital import Hospital
from app.core.exceptions import NotFoundException

class HospitalService:
    """Service layer for hospital telemetry, capacity optimization, and 3D Digital Twin."""

    def __init__(self):
        self.hospital_repo = BaseRepository(Hospital)

    async def get_hospital_telemetry(self, db: AsyncSession) -> List[Dict[str, Any]]:
        """Fetch hospital nodes telemetry."""
        items = await self.hospital_repo.list_all(db)
        if not items:
            # Fallback mock telemetry for apex hubs
            return [
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
        return [
            {
                "id": h.id,
                "name": h.name,
                "district": h.district,
                "status": h.status,
                "health_score": h.health_score,
                "bed_occupancy": f"{(h.occupied_beds / h.total_beds)*100:.0f}%",
                "doctors_active": 1000,
                "o2_supply_days": h.o2_reserve_days
            }
            for h in items
        ]

hospital_service = HospitalService()
