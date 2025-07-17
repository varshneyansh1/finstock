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
import { BlurView } from '@react-native-community/blur';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface WatchlistBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  watchlists: string[];
  onAddWatchlist: (name: string) => void;
  onToggleWatchlist: (name: string) => void;
  selectedWatchlists: string[];
}

const WatchlistBottomSheet: React.FC<WatchlistBottomSheetProps> = ({
  visible,
  onClose,
  watchlists,
  onAddWatchlist,
  onToggleWatchlist,
  selectedWatchlists,
}) => {
  const [newWatchlist, setNewWatchlist] = useState('');

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.2)"
        />
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
                  onAddWatchlist(newWatchlist.trim());
                  setNewWatchlist('');
                }
              }}
            >
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={watchlists}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.watchlistRow}
                onPress={() => onToggleWatchlist(item)}
              >
                <Ionicons
                  name={
                    selectedWatchlists.includes(item)
                      ? 'checkbox-outline'
                      : 'square-outline'
                  }
                  size={22}
                  color="#222"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.watchlistText}>{item}</Text>
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
  sheet: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
    minHeight: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
    color: '#222',
    backgroundColor: '#fafafa',
  },
  addBtn: {
    backgroundColor: '#fbeee0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addBtnText: {
    color: '#d35400',
    fontWeight: '700',
    fontSize: 16,
  },
  watchlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  watchlistText: {
    fontSize: 16,
    color: '#222',
  },
});
