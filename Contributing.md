# Contributing to WardhaMetroFlow

Welcome! We're glad you're interested in contributing to WardhaMetroFlow.  
This guide will help you set up the project locally — no prior open-source experience needed!

---

##  Getting Started

### 1. Fork the Repository

Click the **"Fork"** button on the top-right of [this repo](https://github.com/GSSoC-Flow/WardhaMetroFLow) to create your own copy.

---

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/WardhaMetroFLow.git
cd WardhaMetroFLow
```

---

### 3. Backend Setup (Flask)
Make sure you have Python 3.8+ installed.

#### Create a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
#### Install dependencies:
```bash
pip install flask
```
#### Run the backend server:
```bash
python app.py
```
The backend will start at: [Preview site](http://localhost:5000)

---

### 4. Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at http://localhost:5173 (default for Vite)

---

### 5. Optional: Docker Setup
If you'd like to run the entire project with Docker:

a. Install Docker Desktop: https://www.docker.com/products/docker-desktop

b. Run:

```bash
docker build -t wardhametroflow .
docker run -p 5000:5000 wardhametroflow
```
**(Dockerfile support coming soon)**

---

### 6. Beginner-Friendly Issues
Check our Issues page and look for labels like:

`good first issue`

`documentation`

`frontend`

`bug`

**You can also suggest your own ideas!**