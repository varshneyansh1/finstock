import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  headers: {
    'content-type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

const cachedAxios = setupCache(axiosInstance);

export default cachedAxios;
