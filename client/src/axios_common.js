import axios from 'axios';

// Set a base URL
const API = axios.create({
  baseURL: 'https://blogapi-p2pt.onrender.com/api', // Replace with your base URL
});

export default API;