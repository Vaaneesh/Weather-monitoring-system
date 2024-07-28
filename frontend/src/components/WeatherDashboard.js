import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherDashboard.css';
import '@fortawesome/fontawesome-free/css/all.css';
const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather/data');
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const fetchAndDisplayData = async () => {
    try {
      await axios.get('http://localhost:5000/api/weather/fetch');
      fetchData();
    } catch (error) {
      console.error('Error fetching weather data from API', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="weather-dashboard">
      <h1>Weather Summary</h1>
      <button onClick={fetchAndDisplayData}>Fetch and Display Weather Data</button>
      <div className="weather-container">
        {weatherData.map((weather, index) => (
          <div className="weather-card" key={index}>
            <h2>{weather.city}</h2>
            <p><i className="fas fa-thermometer-half"></i> {weather.temp}°C</p>
            <p><i className="fas fa-temperature-high"></i> Max Temp: {weather.max_temp}°C</p>
            <p><i className="fas fa-temperature-low"></i> Min Temp: {weather.min_temp}°C</p>
            <p><i className="fas fa-tint"></i> Feels like: {weather.feels_like}°C</p>
            <p><i className="fas fa-cloud"></i> Condition: {weather.main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;
