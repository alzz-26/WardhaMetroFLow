from fastapi import APIRouter
from services import metro_service

router = APIRouter()
service = metro_service.MetroService()

@router.get("/stations")
def get_all_stations():
    return service.stations

@router.get("/stations/{station_id}")
def get_station(station_id: int):
    return {
        "id": station_id,
        "name": service.get_station_name(station_id)
    }