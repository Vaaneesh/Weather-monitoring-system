const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
  city: String,
  main: String,
  temp: Number,
  feels_like: Number,
  dt: Date,
  dominant_condition: String,
  min_temp: Number,
  max_temp: Number,
  avg_temp: Number,
  date: Date
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
