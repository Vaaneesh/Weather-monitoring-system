const cron = require('node-cron');
const { fetchWeatherData } = require('./controllers/weatherController');

const scheduler = {
    start: () => {
        cron.schedule('0 * * * *', async () => {
            console.log('Fetching weather data...');
            await fetchWeatherData();
        });
    }
};

module.exports = scheduler;
