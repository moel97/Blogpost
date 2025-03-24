import axios from 'axios';

// Set a base URL
const API = axios.create({
  baseURL: 'https://ec2-54-210-77-134.compute-1.amazonaws.com/api/', // Replace with your base URL
});

export default API;