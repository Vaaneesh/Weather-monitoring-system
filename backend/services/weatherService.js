const axios = require('axios');
const WeatherSummary = require('../models/weatherSummary');
const { calculateDominantCondition } = require('../utils/weatherUtils');

const getWeatherData = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

const processWeatherData = async () => {
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const summaries = {};

  for (const city of cities) {
    const data = await getWeatherData(city);
    const date = new Date(data.dt * 1000).toISOString().split('T')[0];
    const mainCondition = data.weather[0].main;
    const temp = data.main.temp;

    if (!summaries[date]) {
      summaries[date] = {
        date,
        totalTemp: 0,
        maxTemp: -Infinity,
        minTemp: Infinity,
        conditionCounts: {},
        count: 0
      };
    }

    const summary = summaries[date];
    summary.totalTemp += temp;
    summary.maxTemp = Math.max(summary.maxTemp, temp);
    summary.minTemp = Math.min(summary.minTemp, temp);
    summary.conditionCounts[mainCondition] = (summary.conditionCounts[mainCondition] || 0) + 1;
    summary.count++;
  }

  for (const date in summaries) {
    const summary = summaries[date];
    const avgTemp = summary.totalTemp / summary.count;
    const dominantCondition = calculateDominantCondition(summary.conditionCounts);

    const weatherSummary = new WeatherSummary({
      date,
      avg_temp: avgTemp,
      max_temp: summary.maxTemp,
      min_temp: summary.minTemp,
      dominant_condition: dominantCondition
    });

    await weatherSummary.save();
  }
};

module.exports = { processWeatherData };
