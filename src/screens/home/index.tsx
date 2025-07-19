import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import { wp, hp } from '../../utils/responsive';
import Section from '../../components/home/Section';
import Header from '../../components/home/Header';
import SafeScreen from '../../components/SafeScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopGainersLosersThunk } from '../../store/slice/topGainersLosersSlice';
import { RootState, AppDispatch } from '../../store';

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

  const handleStockPress = (item: {
    id: string;
    name: string;
    price: string;
    changePercentage: string;
    symbol?: string;
  }) => {
    navigation.navigate('Details', { stock: item, symbol: item.symbol });
  };

  useEffect(() => {
    dispatch(fetchTopGainersLosersThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <SafeScreen>
        <Header appName="FinStock" searchPlaceholder="Search here..." />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeScreen>
    );
  }

  if (error) {
    return (
      <SafeScreen>
        <Header appName="FinStock" searchPlaceholder="Search here..." />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
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
