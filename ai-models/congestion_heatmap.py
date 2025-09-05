import streamlit as st
import pandas as pd
import numpy as np
import folium
from streamlit_folium import st_folium
from datetime import datetime

st.set_page_config(page_title="WardhaMetroFlow - Congestion Heatmap", layout="wide")

# --- Sidebar Navigation ---
st.sidebar.title("📂 Navigation")
page = st.sidebar.radio("Go to:", ["About", "This App"])

# =========================
# ABOUT PAGE
# =========================
if page == "About":
    st.title("ℹ️ About WardhaMetroFlow")
    st.markdown(
        """
        ### 🚇 WardhaMetroFlow  
        WardhaMetroFlow is an interactive dashboard to visualize **real-time congestion** 
        levels across Wardha Metro stations.  

        #### Why this app?
        - ✅ **For Passengers** – Plan your journey by avoiding crowded stations.  
        - ✅ **For Metro Admins** – Monitor congestion patterns to manage resources efficiently.  

        #### 🟢🟠🔴 Congestion Levels
        - **Green (0-40%)**: Low crowd, easy movement.  
        - **Orange (40-70%)**: Moderate crowd, possible delays.  
        - **Red (70-100%)**: High crowd, overcrowding risk.  

        ---
        This is a **prototype demo** with simulated values. In real-world use, 
        congestion can be measured using smart sensors, ticketing data, or CCTV analytics.
        """
    )

# =========================
# APP PAGE
# =========================
elif page == "This App":
    st.title("🚇 Wardha MetroFlow - Congestion Heatmap")
    st.markdown("Visualize **real-time congestion** across Wardha Metro stations. "
                "Helps passengers plan better and admins manage smarter.")

    # --- Refresh Button & Last Updated ---
    if "last_updated" not in st.session_state:
        st.session_state["last_updated"] = datetime.now().strftime("%H:%M:%S")

    refresh_clicked = st.sidebar.button("🔄 Refresh Data")

    # --- Simulated Data ---
    stations = {
        "Wardha Junction": [20.7453, 78.6022],
        "Civil Lines": [20.7458, 78.6101],
        "Ram Nagar": [20.7502, 78.6187],
        "Mahatma Nagar": [20.7408, 78.6202],
        "Industrial Area": [20.7351, 78.6155],
    }

    if refresh_clicked:
        # No fixed seed → system randomness → new values every click
        congestion_levels = {s: np.random.randint(10, 100) for s in stations.keys()}
        st.session_state["last_updated"] = datetime.now().strftime("%H:%M:%S")
        st.session_state["data"] = congestion_levels
    else:
        # If no refresh yet, either reuse saved data or generate once with seed=42
        if "data" not in st.session_state:
            np.random.seed(42)  # fixed for first load
            st.session_state["data"] = {s: np.random.randint(10, 100) for s in stations.keys()}
        congestion_levels = st.session_state["data"]

    df = pd.DataFrame({
        "Station": stations.keys(),
        "Latitude": [loc[0] for loc in stations.values()],
        "Longitude": [loc[1] for loc in stations.values()],
        "Congestion (%)": congestion_levels.values()
    })

    # --- Folium Map ---
    m = folium.Map(location=[20.7453, 78.6022], zoom_start=14)

    for _, row in df.iterrows():
        level = row["Congestion (%)"]
        if level < 40:
            color = "green"
        elif level < 70:
            color = "orange"
        else:
            color = "red"

        folium.CircleMarker(
            location=[row["Latitude"], row["Longitude"]],
            radius=10,
            popup=f"{row['Station']} - {level}% congestion",
            color=color,
            fill=True,
            fill_opacity=0.7
        ).add_to(m)

    # Display map
    st_data = st_folium(m, width=700, height=500)

    # --- Table View ---
    st.subheader("📊 Station Congestion Data")
    st.dataframe(df.style.background_gradient(cmap="RdYlGn_r"))

    # --- Last Updated Info ---
    st.caption(f"⏱️ Last Updated: {st.session_state['last_updated']}")