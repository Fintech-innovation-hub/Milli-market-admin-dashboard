import axios from 'axios';
import { baseUrl } from '../constants';

const instance = axios.create({
  baseURL: baseUrl, // Set the base URL for all requests
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`,
    'Content-Type': 'application/json'
  }
});
export default instance;