import config from '../config';
import axiosInstance from './axios';

export const fetchTopGainersLosers = async () => {
  try {
    const response = await axiosInstance.get('query', {
      params: {
        function: 'TOP_GAINERS_LOSERS',
        apikey: config.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCompanyOverview = async (symbol: string) => {
  try {
    const response = await axiosInstance.get('query', {
      params: {
        function: 'OVERVIEW',
        symbol: symbol,
        apikey: config.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDailyTimeSeries = async (symbol: string) => {
  try {
    const response = await axiosInstance.get('query', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: symbol,
        apikey: config.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWeeklyTimeSeries = async (symbol: string) => {
  try {
    const response = await axiosInstance.get('query', {
      params: {
        function: 'TIME_SERIES_WEEKLY',
        symbol: symbol,
        apikey: config.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMonthlyTimeSeries = async (symbol: string) => {
  try {
    const response = await axiosInstance.get('query', {
      params: {
        function: 'TIME_SERIES_MONTHLY',
        symbol: symbol,
        apikey: config.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
