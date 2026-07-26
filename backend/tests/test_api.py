from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "HEALTHY"

def test_login_success():
    payload = {
        "email": "a.sengupta@mohfw.gov.in",
        "password": "admin123"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["status"] == "success"
    assert "access_token" in res_data["data"]

def test_hospitals_list():
    response = client.get("/api/v1/hospitals")
    assert response.status_code == 200
    assert len(response.json()["data"]) >= 3

def test_what_if_simulation():
    payload = {
        "scenario": "Dengue +40% Surge in Kozhikode",
        "district": "Kerala Vector Zone"
    }
    response = client.post("/api/v1/ai/what-if", json=payload)
    assert response.status_code == 200
    assert response.json()["data"]["confidence_score"] == 98.8
