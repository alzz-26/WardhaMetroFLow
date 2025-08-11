from fastapi import FastAPI
from routers import passenger_flow
from routers import stations
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="WardhaMetroFlow API",
    description="AI-powered metro simulation backend",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
origins = [
    "http://localhost:3000",  # React frontend
    "https://wardhametroflow.in",  # Production domain
    "http://localhost:8000",  # For development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    passenger_flow.router,
    prefix="/api",
    tags=["passenger"]
)

app.include_router(
    stations.router,
    prefix="/api",
    tags=["stations"]
)

@app.get("/")
def read_root():
    return {"message": "Welcome to WardhaMetroFlow API!"}