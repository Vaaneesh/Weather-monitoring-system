import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchWeatherData = () => API.get('/api/weather/fetch');
export const getWeatherData = () => API.get('/api/weather/data');
