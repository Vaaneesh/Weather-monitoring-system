const axios = require('axios');
const WeatherSummary = require('../models/weatherSummary');
require('dotenv').config();

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const fetchWeatherData = async (req, res) => {
  try {
    // Delete previous weather data
    await WeatherSummary.deleteMany({});

    for (const city of cities) {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
      const data = response.data;

      console.log(`Weather data for ${city}:`, data);

      const weatherSummary = new WeatherSummary({
        city: data.name,
        main: data.weather[0].main,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        dt: new Date(data.dt * 1000),
        dominant_condition: data.weather[0].main,
        min_temp: data.main.temp_min,
        max_temp: data.main.temp_max,
        avg_temp: data.main.temp,
        date: new Date()
      });

      await weatherSummary.save();
    }
    res.status(200).send('Weather data fetched and saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getWeatherData = async (req, res) => {
  try {
    const weatherData = await WeatherSummary.find();
    res.json(weatherData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  fetchWeatherData,
  getWeatherData
};
