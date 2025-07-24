# WardhaMetroFLow
An AI-powered metro simulation for the city of Wardha. It offers two views: Passenger View to plan routes and get smart suggestions, and Admin View to monitor traffic, manage stations, and analyze predictions (helping visualize a smarter transit future).

# WardhaMetroFlow 🚇

WardhaMetroAI is an AI-powered metro simulation project built for the city of Wardha. It offers two interactive views:

- **Passenger View**: Plan metro routes, get real-time smart suggestions, and estimate arrival times.
- **Admin View**: Monitor metro traffic, manage stations, and analyze trends using predictive AI models.

This project envisions smarter, AI-driven public transit systems for emerging smart cities like Wardha.

---

##  Table of Contents
- [About the Project](#about-the-project)
- [Features](#features-)
- [Tech Stack](#tech-stack-)
- [Getting Started](#getting-started-)
- [Views](#views-)
- [Project Structure](#project-structure-)
- [Contributing](#contributing-)
- [Good First Issues](#good-first-issues-)
- [License](#license-)
- [Acknowledgments](#acknowledgments-)
- [Back to Top](#wardhametroflow-)

---

## About the Project
WardhaMetroFlow is an AI-powered metro simulation project built for the city of Wardha. It envisions a smarter public transport system for emerging smart cities by using AI-driven metro route planning and traffic prediction.

---

## Features 
- Interactive metro route planner
- Real-time passenger & station simulation
- AI-based route optimization & predictions
- Passenger & Admin dashboards
- Voice/text input (optional)
- Modular and scalable codebase

[Back to Top](#wardhametroflow-)

---

## Tech Stack 

### Frontend
- React.js
- HTML / CSS / JavaScript
- Leaflet.js (Map rendering)

### Backend
- Python (Flask / FastAPI)

### AI / ML
- scikit-learn
- pandas
- NumPy

### Visualization
- Chart.js
- Plotly

### Database
- SQLite / Firebase / MongoDB

[Back to Top](#wardhametroflow-)

---

## Getting Started 

>  Setup instructions are coming soon. Contributors are welcome to help improve this section._

1. Clone the repo:
   ```bash
   git clone https://github.com/GSSoC-Flow/WardhaMetroFlow.git
   ```

2. Navigate to backend and install dependencies:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Navigate to frontend and run React app:

   ```bash
   cd ../frontend
   npm install
   npm start
   ```

###### [Back to Top](#wardhametroflow-)
---

## Views 
### Passenger View
* Select source & destination
* Smart route suggestions
* Arrival time estimates
* Supports voice/text input (optional)

### Admin View
* Add/manage stations & routes
* Live traffic monitoring
* Analyze predicted congestion
* Receive AI-driven optimization alerts

###### [Back to Top](#wardhametroflow-)
---

## Project Structure
```
WardhaMetroFlow/
│
├── backend/          # Flask APIs and Python logic
│   ├── app.py
│   ├── routes/
│   └── models/
│
├── frontend/         # React-based UI (Passenger/Admin)
│   ├── passenger/
│   └── admin/
│
├── ai-models/        # ML models for traffic prediction
│   ├── model.pkl
│   └── train_model.ipynb
│
├── database/         # SQLite DB and schema
│   └── wardha.db
│
├── static/           # Images, icons, stylesheets
│
├── templates/        # HTML templates (Flask)
│
├── Contributing.md
├── README.md
└── LICENSE
```

###### [Back to Top](#wardhametroflow-)
---
## Contributing 
We welcome all contributors — whether you're into frontend, backend, ML, or data!

Steps:
1. Fork the repository
2. Create a branch:

```bash
git checkout -b feature-name
```
3. Commit your changes:

```bash
git commit -m "Added feature"
```
4. Push and open a Pull Request
5. Refer to [Contributing.md](Contributing.md) for more.

###### [Back to Top](#wardhametroflow-)
---

## Good First Issues 
* Add a new station to the map
* Create a sample route JSON
* Improve route prediction accuracy
* Style Passenger dashboard
* Optimize Admin data visualization

###### [Back to Top](#wardhametroflow-)
---
## License 
This project is licensed under the [MIT LICENSE](LICENSE).

###### [Back to Top](#wardhametroflow-)
---

## Acknowledgments 
Inspired by India's Smart City Mission

Built with love by open-source contributors during GSSoC 2025

###### [Back to Top](#wardhametroflow-)
---
