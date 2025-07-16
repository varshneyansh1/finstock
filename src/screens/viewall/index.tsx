import React, { useState, useCallback } from 'react';
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
import { topGainers, topLosers } from '../../constants/dummyStocks';
import StockCard from '../../components/StockCard';
import { wp, hp, fontSize } from '../../utils/responsive';

interface StockItem {
  id: string;
  name: string;
  price: string;
  icon: string;
}

type ViewAllRouteParams = {
  type: 'gainers' | 'losers';
};

type RootStackParamList = {
  HomeScreen: undefined;
  ViewAll: { type: 'gainers' | 'losers' };
  Details: { stock: StockItem };
};

const PAGE_SIZE = 6;

const ViewAll = () => {
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { type } = route.params as ViewAllRouteParams;
  const data = type === 'losers' ? topLosers : topGainers;

  // For demo, repeat data to simulate more items
  const allData: StockItem[] = Array(5)
    .fill(data)
    .flat()
    .map((item, idx) => ({ ...item, id: `${item.id}_${idx}` }));

  const [page, setPage] = useState(1);
  const [displayed, setDisplayed] = useState<StockItem[]>(
    allData.slice(0, PAGE_SIZE),
  );

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const nextData = allData.slice(0, nextPage * PAGE_SIZE);
    setDisplayed(nextData);
    setPage(nextPage);
  }, [page, allData]);

  const handleStockPress = (item: StockItem) => {
    navigation.navigate('Details', { stock: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {type === 'losers' ? 'Top Losers' : 'Top Gainers'}
      </Text>
      <FlatList
        data={displayed}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }: { item: StockItem }) => (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => handleStockPress(item)}
          >
            <StockCard icon={item.icon} name={item.name} price={item.price} />
          </TouchableOpacity>
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
          ) : (
            <Text style={styles.pagination}>No more data</Text>
          )
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
  header: {
    fontSize: fontSize(18),
    fontWeight: '600',
    marginBottom: hp(2),
    alignSelf: 'center',
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
