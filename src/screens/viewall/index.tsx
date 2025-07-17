import React, { useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  fetchViewAllGainersLosers,
  loadMoreViewAll,
  resetViewAllState,
  setViewAllType,
  ViewAllType,
} from '../../store/slice/viewAllGainersLosersSlice';
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

const ViewAll = () => {
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { type } = route.params as ViewAllRouteParams;
  const dispatch = useDispatch<AppDispatch>();

  const { allData, displayed, page, loading, loadingMore, error } = useSelector(
    (state: RootState) => state.viewAllGainersLosers,
  );

  useEffect(() => {
    dispatch(resetViewAllState());
    dispatch(setViewAllType(type));
    dispatch(fetchViewAllGainersLosers(type as ViewAllType));
  }, [type, dispatch]);

  const loadMore = useCallback(() => {
    if (loadingMore || displayed.length >= allData.length) return;
    dispatch(loadMoreViewAll());
  }, [loadingMore, displayed.length, allData.length, dispatch]);

  const handleStockPress = (item: StockItem) => {
    navigation.navigate('Details', { stock: item, symbol: item.symbol });
  };

  return (
    <View style={styles.container}>
      {/* Header always visible */}
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
      {/* Content area below header */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : error ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: 'red', fontSize: fontSize(16) }}>{error}</Text>
        </View>
      ) : allData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: fontSize(16), color: '#888' }}>
            No data available
          </Text>
        </View>
      ) : (
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
      )}
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
