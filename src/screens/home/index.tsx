import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { wp, hp } from '../../utils/responsive';
import Section from '../../components/Section';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchTopGainersLosers } from '../../api';

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
  const [loading, setLoading] = useState(true);
  const [gainers, setGainers] = useState<any[]>([]);
  const [losers, setLosers] = useState<any[]>([]);

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
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchTopGainersLosers();
        setGainers(
          (data.top_gainers || [])
            .slice(0, 4)
            .map((item: any, idx: number) => ({
              id: item.ticker + idx,
              name: item.ticker,
              price: item.price,
              changePercentage: item.change_percentage,
              symbol: item.ticker,
            })),
        );
        setLosers(
          (data.top_losers || []).slice(0, 4).map((item: any, idx: number) => ({
            id: item.ticker + idx,
            name: item.ticker,
            price: item.price,
            changePercentage: item.change_percentage,
            symbol: item.ticker,
          })),
        );
      } catch (e) {
        setGainers([]);
        setLosers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header appName="FinStock" searchPlaceholder="Search here..." />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
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
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: wp(4),
  },
});
