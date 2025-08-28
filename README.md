# WardhaMetroFlow
An AI-powered metro simulation designed for the city of Wardha, envisioning a smarter, data-driven public transit system.

<img width="1880" height="1192" alt="WardhaMetroFlow Dashboard" src="https://github.com/user-attachments/assets/687c003b-e22b-4899-82f2-97927d71ced4" />

<span id="top"></span>

---

## Table of Contents
- [About the Project](#about-the-project)  
- [Key Features](#features)  
- [Tech Stack](#tech-stack)  
- [System Architecture](#system-architecture)  
- [Getting Started](#getting-started)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)  
- [Acknowledgments](#acknowledgments)  

---

## About the Project
<a id="about-the-project"></a>

**WardhaMetroFlow** is a proof-of-concept simulation platform that demonstrates how AI can enhance urban mobility in emerging smart cities. Inspired by *India's Smart City Mission*, this project provides a tool for both passengers and administrators to interact with a virtual metro system.

It offers two distinct, interactive views:

- **Passenger View**: A user-facing interface for planning journeys. Passengers can select their start and end points, receive intelligent route suggestions, and see estimated arrival times.  
- **Admin View**: A comprehensive dashboard for transit authorities. Administrators can monitor metro traffic in real-time, manage station data, and analyze predictive models for traffic flow and potential congestion.  

[Back to Top](#top)

---

## Key Features
<a id="features"></a>

- **Interactive Route Planning**: A map-based interface for easy route selection.  
- **Real-time Simulation**: Simulates passenger flow and station activity.  
- **AI-Powered Predictions**: Utilizes machine learning models for route optimization and traffic forecasting.  
- **Dual Dashboards**: Separate, feature-rich interfaces for passengers and administrators.  
- **Voice/Text Input**: Optional voice and text commands for accessibility.  
- **Scalable Architecture**: A modular codebase designed for expansion and easy maintenance.  

[Back to Top](#top)

---

## Tech Stack
<a id="tech-stack"></a>

| **Category**    | **Technology**                          |
|------------------|------------------------------------------|
| Frontend         | React.js, Leaflet.js, HTML/CSS, JavaScript |
| Backend          | Python (Flask / FastAPI)                |
| AI / ML          | scikit-learn, pandas, NumPy             |
| Visualization    | Chart.js, Plotly                        |
| Database         | SQLite / Firebase / MongoDB             |

[Back to Top](#top)

---

## System Architecture
<a id="system-architecture"></a>

The components of **WardhaMetroFlow** interact as follows:

1. The **Frontend (React)** communicates with the **Backend (Flask/FastAPI)**.  
2. The **Backend** processes requests, serves API routes, and contains the core application logic.  
3. The **Database (SQLite)** stores all metro, station, and passenger data.  
4. The **ML Model (model.pkl)** is loaded by the backend to provide predictions for route optimization and traffic analysis.  

The architecture diagram is located at:  
