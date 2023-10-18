import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  //baseURL: 'https://travel-backend-shv1.onrender.com'
});

export default api;