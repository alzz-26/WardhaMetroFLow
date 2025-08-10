from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db= SQLAlchemy()

class Station(db.Model):
  __tablename__="stations"

  id= db.Column(db.Integer, primary_key =True)
  name= db.Column(db.String(100), nullable= False)
  location= db.Column(db.String(200), nullable=False)
  code= db.Column(db.String(10), unique=True, nullable=False)
  is_active= db.Column(db.Boolean, nullable=False)

  start_routes= db.relationship('Route', foreign_keys="Route.start_station_id", back_populates="start_station")
  end_routes= db.relationship('Route', foreign_keys="Route.end_station_id", back_populates="end_station")
  boarding_passenger_logs= db.relationship("PassengerLog",foreign_keys="PassengerLog.boarding_station_id", back_populates="boarding_station")
  alighting_passenger_logs= db.relationship("PassengerLog",foreign_keys="PassengerLog.alighting_station_id", back_populates="alighting_station")

class Route(db.Model):
  __tablename__="routes"

  id= db.Column(db.Integer, primary_key=True)
  start_station_id= db.Column(db.Integer, db.ForeignKey('stations.id'), nullable=False)
  end_station_id= db.Column(db.Integer, db.ForeignKey('stations.id'), nullable=False)
  distance= db.Column(db.Float, nullable=True)
  travel_time= db.Column(db.Float, nullable=True)
  duration_min = db.Column(db.Float, nullable=True)
  is_active= db.Column(db.Boolean, nullable=False)


  start_station= db.relationship('Station', foreign_keys=[start_station_id], back_populates="start_routes")
  end_station= db.relationship('Station', foreign_keys=[end_station_id], back_populates="end_routes")
  passenger_logs= db.relationship('PassengerLog', back_populates="route")

class PassengerLog(db.Model):
  __tablename__="passenger_logs"

  id= db.Column(db.Integer, primary_key=True)
  passenger_name= db.Column(db.String(100), nullable=False)
  ticket_id= db.Column(db.String(50), unique=True, nullable=False)
  route_id= db.Column(db.Integer, db.ForeignKey("routes.id"), nullable=False)
  boarding_station_id= db.Column(db.Integer, db.ForeignKey("stations.id"), nullable=False)
  alighting_station_id= db.Column(db.Integer, db.ForeignKey("stations.id"), nullable=False)
  timestamp= db.Column(db.DateTime, default= datetime.utcnow)
  fare= db.Column(db.Float, nullable=True)

  route= db.relationship('Route', back_populates="passenger_logs")
  boarding_station= db.relationship('Station',foreign_keys=[boarding_station_id], back_populates='boarding_passenger_logs')
  alighting_station= db.relationship('Station',foreign_keys=[alighting_station_id], back_populates='alighting_passenger_logs')

  