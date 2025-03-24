import axios from 'axios';

// Set a base URL
const API = axios.create({
  baseURL: 'https://blogsphereapi.elkassabi.eu/api/', // Replace with your base URL
});

export default API;