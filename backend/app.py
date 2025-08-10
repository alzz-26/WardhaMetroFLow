import os
from datetime import datetime
from flask import Flask, request, jsonify
from models.models import db , Station, Route, PassengerLog
import joblib
import pandas as pd


app= Flask(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DB_PATH = os.path.join(BASE_DIR, 'database', 'wardha.db')

# Corrected model path - added ../
model_path = os.path.join(os.path.dirname(__file__), '../ai-models/passenger_flow_model.pkl')
model = joblib.load(model_path)

os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_PATH}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)


@app.route('/predict_flow', methods=['POST'])
def predict_passenger_flow():
    try:
        data = request.json
        required = ['hour', 'day_of_week', 'station_id']
        if not all(field in data for field in required):
            return jsonify({"error": "Missing required fields"}), 400
        
        input_data = pd.DataFrame([{
            'hour': int(data['hour']),
            'day_of_week': int(data['day_of_week']),
            'station_id': int(data['station_id'])
        }])
        
        prediction = model.predict(input_data)
        
        return jsonify({
            "predicted_passengers": int(prediction[0]),
            "input_data": data,
            "model": "RandomForestRegressor",
            "status": "success"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "WardhaMetroFlow API is running!"


if __name__ == '__main__':
    app.run(debug=True, port=5000)