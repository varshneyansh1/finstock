import { Alert } from 'react-native';
import config from '../config';
import axiosInstance from './axios';

const handleApiError = (error: any, context: string) => {
  console.error(`${context} API Error:`, error);

  let errorMessage = config.defaultErrorMessage;

  if (error.code === error.message?.includes('timeout')) {
    // Timeout error
    errorMessage = 'Request timed out. Please check your internet connection.';
  } else if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    if (status === 429) {
      errorMessage = 'API rate limit exceeded. Please try again later.';
    } else if (status >= 500) {
      errorMessage = 'Server error. Please try again later.';
    }
  } else if (error.request) {
    // Network error (no response received)
    errorMessage = 'Network error. Please check your internet connection.';
  } else if (error.message) {
    // Other error
    errorMessage = error.message;
  }

  return errorMessage;
};

export const fetchTopGainersLosers = async () => {
  try {
    const response = await axiosInstance.get('query', {
      params: {
        function: 'TOP_GAINERS_LOSERS',
        apikey: config.apiKey,
      },
      cache: {
        ttl: 1000 * 60 * 5, // 5 minutes
      },
    });
    console.log('TopGainersLosers response cached:', response.cached);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error, 'TopGainersLosers');
    throw new Error(errorMessage);
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
      cache: {
        ttl: 1000 * 60 * 60 * 24, // 24 hours
      },
    });
    console.log('CompanyOverview response cached:', response.cached);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error, 'CompanyOverview');
    throw new Error(errorMessage);
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
      cache: {
        ttl: 1000 * 60 * 60, // 1 hour
      },
    });
    console.log('DailyTimeSeries response cached:', response.cached);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error, 'DailyTimeSeries');
    throw new Error(errorMessage);
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
      cache: {
        ttl: 1000 * 60 * 60 * 12, // 12 hours
      },
    });
    console.log('WeeklyTimeSeries response cached:', response.cached);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error, 'WeeklyTimeSeries');
    throw new Error(errorMessage);
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
      cache: {
        ttl: 1000 * 60 * 60 * 12, // 12 hours
      },
    });
    console.log('MonthlyTimeSeries response cached:', response.cached);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error, 'MonthlyTimeSeries');
    throw new Error(errorMessage);
  }
};

export const searchStocks = async (query: string) => {
  try {
    const response = await axiosInstance.get('query', {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: query,
        apikey: config.apiKey,
      },
      cache: {
        ttl: 1000 * 60 * 5, // 5 minutes
      },
    });
    console.log('SearchStocks response cached:', response.cached);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error, 'SearchStocks');
    throw new Error(errorMessage);
  }
};

export const fetchGlobalQuote = async (symbol: string) => {
  try {
    const response = await axiosInstance.get('query', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: config.apiKey,
      },
      cache: {
        ttl: 1000 * 60, // 1 minute
      },
    });
    console.log('GlobalQuote response cached:', response.cached);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error, 'GlobalQuote');
    throw new Error(errorMessage);
  }
};
