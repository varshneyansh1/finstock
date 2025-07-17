import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  wp,
  hp,
  fontSize,
  borderRadius,
  padding,
} from '../../utils/responsive';

const WATCHLISTS = ['Watchlist 1', 'Watchlist 2'];

const WatchlistScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Watchlist</Text>
      </View>
      <View style={styles.separator} />
      <FlatList
        data={WATCHLISTS}
        keyExtractor={item => item}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowText}>{item}</Text>
              <Ionicons
                name="chevron-forward"
                size={fontSize(22)}
                color="#222"
              />
            </TouchableOpacity>
            {index < WATCHLISTS.length - 1 && <View style={styles.separator} />}
          </>
        )}
      />
    </View>
  );
};

export default WatchlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  header: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  headerText: {
    fontSize: fontSize(17),
    fontWeight: '600',
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2.2),
    paddingHorizontal: wp(4),
    backgroundColor: '#fff',
  },
  rowText: {
    fontSize: fontSize(16),
    color: '#222',
  },
});
