import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  //baseURL: 'http://backend.dinhub.ro',
  //baseURL: 'https://travel-backend-shv1.onrender.com'
  withCredentials: true,
});

export default api;