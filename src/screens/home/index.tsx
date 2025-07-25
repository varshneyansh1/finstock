import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchTopGainersLosersThunk } from '../../store/slice/topGainersLosersSlice';
import SafeScreen from '../../components/SafeScreen';
import Header from '../../components/home/Header';
import Section from '../../components/home/Section';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import { wp, hp } from '../../utils/responsive';
import NetInfo from '@react-native-community/netinfo';
import { checkNetworkConnectivity } from '../../utils/networkUtils';

type RootStackParamList = {
  HomeScreen: undefined;
  ViewAll: { type: 'gainers' | 'losers' };
  Details: {
    stock: {
      id: string;
      name: string;
      price: string;
      changePercentage: string;
      symbol?: string;
    };
    symbol?: string;
  };
};

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch<AppDispatch>();
  const { gainers, losers, loading, error } = useSelector(
    (state: RootState) => state.topGainersLosers,
  );

  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const handleStockPress = (item: {
    id: string;
    name: string;
    price: string;
    changePercentage: string;
    symbol?: string;
  }) => {
    navigation.navigate('Details', { stock: item, symbol: item.symbol });
  };

  const handleRetry = async () => {
    const connected = await checkNetworkConnectivity();
    if (connected) {
      dispatch(fetchTopGainersLosersThunk());
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initializeApp = async () => {
      // Check network connectivity first
      const connected = await checkNetworkConnectivity();
      if (isMounted) {
        setIsOnline(connected);

        // Only fetch data if we're online
        if (connected) {
          dispatch(fetchTopGainersLosersThunk());
        }
      }
    };

    initializeApp();

    // Listen for network changes
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? false;

      if (isMounted) {
        setIsOnline(connected);

        // If we just got connected and there's an error, retry
        if (connected && error && !loading) {
          dispatch(fetchTopGainersLosersThunk());
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [dispatch]); 

  // Show network error if offline and no data
  if (isOnline === false && gainers.length === 0 && losers.length === 0) {
    return (
      <SafeScreen>
        <Header appName="FinStock" searchPlaceholder="Search here..." />
        <ErrorState
          error="No internet connection. Please check your network and try again."
          onRetry={handleRetry}
        />
      </SafeScreen>
    );
  }

  if (loading) {
    return (
      <SafeScreen>
        <Header appName="FinStock" searchPlaceholder="Search here..." />
        <LoadingState />
      </SafeScreen>
    );
  }

  if (error) {
    return (
      <SafeScreen>
        <Header appName="FinStock" searchPlaceholder="Search here..." />
        <ErrorState error={error} onRetry={handleRetry} />
      </SafeScreen>
    );
  }

  // Show API limit reached if both gainers and losers are empty
  if (gainers.length === 0 && losers.length === 0) {
    return (
      <SafeScreen>
        <Header appName="FinStock" searchPlaceholder="Search here..." />
        <ErrorState
          error="API limit reached, try again later."
          showRetry={false}
        />
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <Header
        appName="FinStock"
        searchPlaceholder="Search here..."
        onResultPress={item => {
          navigation.navigate('Details', {
            stock: {
              id: item['1. symbol'],
              name: item['2. name'],
              price: 'N/A',
              changePercentage: 'N/A',
              symbol: item['1. symbol'],
            },
            symbol: item['1. symbol'],
          });
        }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Section
          title="Top Gainers"
          data={gainers}
          onViewAll={() => navigation.navigate('ViewAll', { type: 'gainers' })}
          onStockPress={handleStockPress}
        />
        <Section
          title="Top Losers"
          data={losers}
          onViewAll={() => navigation.navigate('ViewAll', { type: 'losers' })}
          onStockPress={handleStockPress}
        />
      </ScrollView>
    </SafeScreen>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: wp(4),
  },
});
