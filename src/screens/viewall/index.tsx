import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchTopGainersLosers } from '../../api';
import StockCard from '../../components/StockCard';
import { wp, hp, fontSize } from '../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface StockItem {
  id: string;
  name: string;
  price: string;
  changePercentage: string;
  symbol?: string;
}

type ViewAllRouteParams = {
  type: 'gainers' | 'losers';
};

type RootStackParamList = {
  HomeScreen: undefined;
  ViewAll: { type: 'gainers' | 'losers' };
  Details: { stock: StockItem; symbol?: string };
};

const PAGE_SIZE = 10;

const ViewAll = () => {
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { type } = route.params as ViewAllRouteParams;

  const [allData, setAllData] = useState<StockItem[]>([]);
  const [displayed, setDisplayed] = useState<StockItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTopGainersLosers();
        const items =
          (type === 'losers' ? data.top_losers : data.top_gainers) || [];
        const mapped = items.map((item: any, idx: number) => ({
          id: item.ticker + idx,
          name: item.ticker,
          price: item.price,
          changePercentage: item.change_percentage,
          symbol: item.ticker,
        }));
        setAllData(mapped);
        setDisplayed(mapped.slice(0, PAGE_SIZE));
        setPage(1);
      } catch (e) {
        setError('Failed to load data');
        setAllData([]);
        setDisplayed([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  const loadMore = useCallback(() => {
    if (loadingMore || displayed.length >= allData.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const nextData = allData.slice(0, nextPage * PAGE_SIZE);
      setDisplayed(nextData);
      setPage(nextPage);
      setLoadingMore(false);
    }, 300); // Simulate network delay for UX
  }, [page, allData, displayed.length, loadingMore]);

  const handleStockPress = (item: StockItem) => {
    navigation.navigate('Details', { stock: item, symbol: item.symbol });
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={{ color: 'red', fontSize: fontSize(16) }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={fontSize(22)} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {type === 'losers' ? 'Top Losers' : 'Top Gainers'}
        </Text>
        <View style={{ width: fontSize(22) }} />
      </View>
      <FlatList
        data={displayed}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }: { item: StockItem }) => (
          <StockCard
            name={item.name}
            price={item.price}
            changePercentage={item.changePercentage}
            symbol={item.symbol}
            onPress={() => handleStockPress(item)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          displayed.length < allData.length ? (
            <ActivityIndicator
              style={styles.pagination}
              size="small"
              color="#888"
            />
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ViewAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingTop: hp(2),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  backBtn: {
    padding: wp(2),
  },
  headerText: {
    fontSize: fontSize(18),
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    color: '#222',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  touchable: {
    flex: 1,
    marginHorizontal: wp(1),
  },
  listContent: {
    paddingBottom: hp(4),
  },
  pagination: {
    textAlign: 'center',
    color: '#888',
    fontSize: fontSize(14),
    marginVertical: hp(2),
  },
});
