const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');
const scheduler = require('./scheduler');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/WeatherApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

scheduler.start();
