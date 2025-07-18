import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { deleteWatchlist } from '../../store/slice/watchlistSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontSize } from '../../utils/responsive';
import StockCard from '../../components/StockCard';

type StockItem = {
  name: string;
  price: string;
  changePercentage: string;
  symbol?: string;
};
type RootStackParamList = {
  HomeScreen: undefined;
  ViewAll: { type: 'gainers' | 'losers' };
  Details: { stock: StockItem; symbol?: string };
};

const WatchlistDetailScreen = () => {
  const route = useRoute() as { params?: { name: string } };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const name = route.params?.name;
  const watchlist = useSelector((state: RootState) =>
    state.watchlist.lists.find(w => w.name === name),
  );

  const handleDelete = () => {
    if (name) {
      dispatch(deleteWatchlist(name));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 10 }}
        >
          <Ionicons name="arrow-back" size={fontSize(22)} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{name}</Text>
        <TouchableOpacity
          onPress={handleDelete}
          style={{ marginLeft: 'auto', paddingLeft: 16 }}
        >
          <Ionicons name="trash-outline" size={fontSize(22)} color="#e74c3c" />
        </TouchableOpacity>
      </View>
      {watchlist && watchlist.stocks.length > 0 ? (
        <FlatList
          data={watchlist.stocks}
          keyExtractor={item => item.symbol}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <StockCard
                name={item.name}
                price={item.price}
                changePercentage={item.changePercentage}
                symbol={item.symbol}
                onPress={() =>
                  navigation.navigate('Details', {
                    stock: item,
                    symbol: item.symbol,
                  })
                }
              />
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={{ color: '#888', fontSize: fontSize(16) }}>
            No stocks in this watchlist.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: fontSize(20),
    fontWeight: '700',
    color: '#222',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 8,
   
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stockName: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#222',
  },
  stockMeta: {
    fontSize: fontSize(13),
    color: '#888',
  },
  stockPrice: {
    fontSize: fontSize(15),
    color: '#1976d2',
    fontWeight: '500',
  },
  stockChange: {
    fontSize: fontSize(13),
    color: '#2ecc71',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WatchlistDetailScreen;
