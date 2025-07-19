import NetInfo from '@react-native-community/netinfo';

export const checkNetworkConnectivity = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  } catch (error) {
    console.error('Error checking network connectivity:', error);
    return false;
  }
};

export const getNetworkErrorMessage = (): string => {
  return 'No internet connection. Please check your network and try again.';
};

export const getApiErrorMessage = (error: any): string => {
  if (error.response) {
    const status = error.response.status;
    if (status === 429) {
      return 'API rate limit exceeded. Please try again later.';
    } else if (status >= 500) {
      return 'Server error. Please try again later.';
    }
  } else if (error.request) {
    return 'Network error. Please check your internet connection.';
  }

  return 'Something went wrong. Please try again later.';
};
