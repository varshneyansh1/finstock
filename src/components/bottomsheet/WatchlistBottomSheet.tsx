import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  createWatchlist,
  addStockToWatchlist,
  removeStockFromWatchlist,
  StockItem,
} from '../../store/slice/watchlistSlice';
import responsive from '../../utils/responsive';
import Toast from 'react-native-toast-message';

interface WatchlistBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  stock: StockItem;
}

const WatchlistBottomSheet: React.FC<WatchlistBottomSheetProps> = ({
  visible,
  onClose,
  stock,
}) => {
  const dispatch = useDispatch();
  const watchlists = useSelector((state: RootState) => state.watchlist.lists);
  const [newWatchlist, setNewWatchlist] = useState('');

  const selectedWatchlists = watchlists
    .filter(wl => wl.stocks.some(s => s.symbol === stock.symbol))
    .map(wl => wl.name);

  const handleAddWatchlist = (name: string) => {
    if (name.trim() && !watchlists.find(w => w.name === name.trim())) {
      dispatch(createWatchlist(name.trim()));
      Toast.show({
        type: 'success',
        text1: 'Watchlist Created',
        text2: `"${name.trim()}" has been created successfully`,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
    }
  };

  const handleToggleWatchlist = (name: string) => {
    const wl = watchlists.find(w => w.name === name);
    if (!wl) return;
    const isIn = wl.stocks.some(s => s.symbol === stock.symbol);
    if (isIn) {
      dispatch(
        removeStockFromWatchlist({ watchlistName: name, symbol: stock.symbol }),
      );
      Toast.show({
        type: 'info',
        text1: 'Stock Removed',
        text2: `${stock.symbol} has been removed from "${name}"`,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
    } else {
      dispatch(addStockToWatchlist({ watchlistName: name, stock }));
      Toast.show({
        type: 'success',
        text1: 'Stock Added',
        text2: `${stock.symbol} has been added to "${name}"`,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.overlay} />
        <View style={styles.sheet}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Add to Watchlist</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#222" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="New Watchlist Name"
              value={newWatchlist}
              onChangeText={setNewWatchlist}
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                if (newWatchlist.trim()) {
                  handleAddWatchlist(newWatchlist.trim());
                  setNewWatchlist('');
                }
              }}
            >
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={watchlists}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.watchlistRow}
                onPress={() => handleToggleWatchlist(item.name)}
              >
                <Ionicons
                  name={
                    item.stocks.some(s => s.symbol === stock.symbol)
                      ? 'checkbox-outline'
                      : 'square-outline'
                  }
                  size={22}
                  color="#222"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.watchlistText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default WatchlistBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: responsive.borderRadius(24),
    borderTopRightRadius: responsive.borderRadius(24),
    padding: responsive.padding(20),
    paddingBottom: responsive.padding(40),
    minHeight: responsive.hp(40),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -responsive.scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: responsive.scale(8),
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.margin(16),
  },
  headerText: {
    fontSize: responsive.fontSize(20),
    fontWeight: '700',
    color: '#222',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.margin(12),
  },
  input: {
    flex: 1,
    borderWidth: responsive.borderWidth(1),
    borderColor: '#ccc',
    borderRadius: responsive.borderRadius(10),
    paddingHorizontal: responsive.padding(12),
    paddingVertical: responsive.padding(8),
    fontSize: responsive.fontSize(16),
    marginRight: responsive.margin(8),
    color: '#222',
    backgroundColor: '#fafafa',
  },
  addBtn: {
    backgroundColor: '#fbeee0',
    borderRadius: responsive.borderRadius(10),
    paddingHorizontal: responsive.padding(16),
    paddingVertical: responsive.padding(8),
  },
  addBtnText: {
    color: '#d35400',
    fontWeight: '700',
    fontSize: responsive.fontSize(16),
  },
  watchlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.margin(10),
  },
  watchlistText: {
    fontSize: responsive.fontSize(16),
    color: '#222',
  },
});
