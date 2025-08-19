async function findRoute() {
  const resultDiv = document.getElementById("routes-list")

  // get values
  const origin= document.getElementById("source").value.trim();
  const departureTime = document.getElementById("departure-time").value.trim();

  if (!origin || !departureTime){
    resultDiv.textContent= "Please fill all fields.";
    return;
  }

  const stationMap= {
    "wardha-central":1,
    "railway-station": 2,
    "market-square": 3,
    "hospital": 4,
    "college": 5,
    "industrial": 6
  }

  const station_id= stationMap[origin];
  const dt= new Date(departureTime);
  const hour= dt.getHours();
  const day_of_week= dt.getDay();

  resultDiv.textContent= "Calculating passenger flow..."

  try{
    // send request to backend
    const response= await fetch("http://127.0.0.1:5000/predict_flow",{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({hour, day_of_week, station_id})
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data= await response.json();

    if (data.predicted_passengers !== undefined){
      resultDiv.textContent= `Predicted Passengers: ${data.predicted_passengers}`;
    }else {
      resultDiv.textContent="Prediction not available.";
    }
  } catch (error){
    resultDiv.textContent= "Error fetching Prediction. Please try again.";
    console.error("Prediction error:", error);
  }

}