import { Alert } from 'react-native';
import config from '../config';
import axiosInstance from './axios';

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
    Alert.alert(config.defaultErrorMessage);
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
      cache: {
        ttl: 1000 * 60 * 60 * 24, // 24 hours
      },
    });
    console.log('CompanyOverview response cached:', response.cached);
    return response.data;
  } catch (error) {
    Alert.alert(config.defaultErrorMessage);
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
      cache: {
        ttl: 1000 * 60 * 60, // 1 hour
      },
    });
    console.log('DailyTimeSeries response cached:', response.cached);
    return response.data;
  } catch (error) {
    Alert.alert(config.defaultErrorMessage);
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
      cache: {
        ttl: 1000 * 60 * 60 * 12, // 12 hours
      },
    });
    console.log('WeeklyTimeSeries response cached:', response.cached);
    return response.data;
  } catch (error) {
    Alert.alert(config.defaultErrorMessage);
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
      cache: {
        ttl: 1000 * 60 * 60 * 12, // 12 hours
      },
    });
    console.log('MonthlyTimeSeries response cached:', response.cached);
    return response.data;
  } catch (error) {
    Alert.alert(config.defaultErrorMessage);
    throw error;
  }
};

export const searchSymbols = async (keywords: string) => {
  try {
    const response = await axiosInstance.get('query', {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: keywords,
        apikey: config.apiKey,
      },
      cache: {
        ttl: 1000 * 60 * 60 * 12, // 12 hours
      },
    });
    console.log('SymbolSearch response cached:', response.cached);
    return response.data;
  } catch (error) {
    Alert.alert(config.defaultErrorMessage);
    throw error;
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
    Alert.alert(config.defaultErrorMessage);
    throw error;
  }
};
