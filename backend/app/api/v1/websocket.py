from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket.manager import ws_manager

router = APIRouter(prefix="/ws", tags=["Realtime WebSocket Stream"])

@router.websocket("/telemetry")
async def websocket_telemetry_stream(websocket: WebSocket):
    """Real-time WebSocket endpoint for live inventory, hospital beds, and AI alerts."""
    await ws_manager.connect(websocket)
    try:
        while True:
            # Receive client ping or filter message
            data = await websocket.receive_text()
            # Respond with real-time system state telemetry
            await websocket.send_json({
                "type": "TELEMETRY_SYNC",
                "grid_health_index": 96.4,
                "active_tele_icu_diverts": 2,
                "o2_grid_status": "NOMINAL"
            })
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
