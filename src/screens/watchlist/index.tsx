import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  wp,
  hp,
  fontSize,
  borderRadius,
  padding,
} from '../../utils/responsive';
import SafeScreen from '../../components/SafeScreen';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { deleteWatchlist, clearError } from '../../store/slice/watchlistSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type WatchListStackParamList = {
  WatchListScreen: undefined;
  WatchlistDetail: { name: string };
};

const WatchlistScreen = () => {
  const watchlists = useSelector((state: RootState) => state.watchlist.lists);
  const loading = useSelector((state: RootState) => state.watchlist.loading);
  const error = useSelector((state: RootState) => state.watchlist.error);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<WatchListStackParamList>>();

  const handleDelete = (name: string) => {
    dispatch(deleteWatchlist(name));
  };

  const handlePress = (name: string) => {
    navigation.navigate('WatchlistDetail', { name });
  };

  const handleRetry = () => {
    dispatch(clearError());
  };

  if (loading) {
    return (
      <SafeScreen>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Watchlist</Text>
          </View>
          <View style={styles.separator} />
          <LoadingState />
        </View>
      </SafeScreen>
    );
  }

  if (error) {
    return (
      <SafeScreen>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Watchlist</Text>
          </View>
          <View style={styles.separator} />
          <ErrorState error={error} onRetry={handleRetry} />
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Watchlist</Text>
        </View>
        <View style={styles.separator} />
        {watchlists.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ color: '#888', fontSize: fontSize(16) }}>
              No watchlists yet. Add one from the details screen!
            </Text>
          </View>
        ) : (
          <FlatList
            data={watchlists}
            keyExtractor={item => item.name}
            renderItem={({ item, index }) => (
              <>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => handlePress(item.name)}
                >
                  <Text style={styles.rowText}>{item.name}</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={fontSize(22)}
                    color="#222"
                  />
                </TouchableOpacity>
                {index < watchlists.length - 1 && (
                  <View style={styles.separator} />
                )}
              </>
            )}
          />
        )}
      </View>
    </SafeScreen>
  );
};

export default WatchlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
