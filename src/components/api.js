import axios from 'axios';
import * as https from 'https';

const request = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  params: { key: '7443804e2d084ce4b3c163453212909' }
});

async function get(url, params) {
  try {
    const response = await request.get(url, { params });
    return response.data;
  } catch (error) {
    return error;
  }
}

export default {
  forecast: (params = {}) => get('/forecast.json', params),
  search: (params = {}) => get('/search.json', params)
}
