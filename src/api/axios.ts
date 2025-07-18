import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  headers: {
    'content-type': 'application/json',
  },
});

// Wrap axios instance with cache interceptor
const cachedAxios = setupCache(axiosInstance);

export default cachedAxios;
