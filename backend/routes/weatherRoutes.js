const express = require('express');
const router = express.Router();
const { fetchWeatherData, getWeatherData } = require('../controllers/weatherController');

router.get('/fetch', fetchWeatherData);
router.get('/data', getWeatherData);

module.exports = router;
