import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  headers: {
    'content-type': 'application/json',
  },
});

export default axiosInstance;
