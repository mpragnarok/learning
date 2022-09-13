import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const client = axios.create({
  baseURL: `${BASE_URL}/${API_KEY}`,
});
const api = {
  async loadRestaurants() {
    const response = await client.get('/restaurants');
    return response.data;
  },
  async createRestaurant(name) {
    const response = await client.post('/restaurants', {name});
    return response.data;
  },
};

export default api;
