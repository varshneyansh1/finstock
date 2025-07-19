import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  wp,
  hp,
  fontSize,
  borderRadius,
  padding,
} from '../../utils/responsive';
import SafeScreen from '../../components/SafeScreen';
import { useRoute, useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import WatchlistBottomSheet from '../../components/bottomsheet/WatchlistBottomSheet';
import AboutSection from '../../components/about/AboutSection';
import StockGraph from '../../components/stockGraph/StockGraph';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  fetchDetailsData,
  fetchChartData,
  setSelectedRange,
  resetDetails,
} from '../../store/slice/detailsSlice';
import ErrorState from '../../components/ErrorState';

const TIME_RANGES = ['1D', '1W', '1M'];

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute() as {
    params?: { stock?: any; symbol?: string };
  };
  const stock = route.params?.stock || {};
  const symbol = route.params?.symbol || stock.ticker || '';
  const dispatch = useDispatch<AppDispatch>();

  const {
    companyData,
    chartData,
    loading,
    chartLoading,
    selectedRange,
    error,
  } = useSelector((state: RootState) => state.details);

  const [watchlistModalVisible, setWatchlistModalVisible] = useState(false);

  const watchlists = useSelector((state: RootState) => state.watchlist.lists);

  const isInAnyWatchlist = watchlists.some(wl =>
    wl.stocks.some(s => s.symbol === symbol),
  );

  const handleRetry = () => {
    if (symbol) {
      dispatch(fetchDetailsData({ symbol, selectedRange }));
    }
  };

  useEffect(() => {
    if (symbol) {
      if (companyData) {
     
        dispatch(fetchChartData({ symbol, selectedRange }));
      } else {
       
        dispatch(fetchDetailsData({ symbol, selectedRange }));
      }
    }
  }, [symbol, selectedRange, dispatch, companyData]);

  useEffect(() => {
    return () => {
      dispatch(resetDetails());
    };
  }, [dispatch]);

  if (error && !loading) {
    return (
      <SafeScreen>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={fontSize(22)} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Details Screen</Text>
          <View style={{ width: fontSize(22) }} />
        </View>
        <ErrorState error={error} onRetry={handleRetry} />
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      {loading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(255,255,255,0.8)',
            zIndex: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#d35400" />
        </View>
      )}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={fontSize(22)} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Details Screen</Text>
        <TouchableOpacity
          style={styles.bookmarkBtn}
          onPress={() => setWatchlistModalVisible(true)}
        >
          <Ionicons
            name={isInAnyWatchlist ? 'bookmark' : 'bookmark-outline'}
            size={fontSize(22)}
            color={isInAnyWatchlist ? '#d35400' : '#222'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(4), paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!loading}
      >
        <View style={styles.stockInfoRow}>
          <View style={styles.logoCircle}>
            <Text style={styles.logo}>{companyData?.Logo || '🏦'}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: wp(3) }}>
            <Text style={styles.stockName}>{companyData?.Name || ''}</Text>
            <Text style={styles.stockMeta}>
              {symbol || stock.ticker || ''}, {companyData?.AssetType || ''}
            </Text>
            <Text style={styles.stockMeta}>{companyData?.Exchange || ''}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.stockPrice}>
              {'$'}
              {companyData?.Price || ''}
            </Text>
            <Text
              style={[
                styles.stockChange,
                {
                  color: (companyData?.ChangePercent || '')
                    .toString()
                    .includes('-')
                    ? '#e74c3c'
                    : '#2ecc71',
                },
              ]}
            >
              {companyData?.ChangePercent || ''}
            </Text>
          </View>
        </View>

        {/* Graph */}
        <View style={styles.graphContainer}>
          <StockGraph
            key={`${symbol}-${selectedRange}`}
            data={chartData}
            loading={chartLoading}
          />
          {/* Time Range Selector */}
          <View style={styles.timeRangeRow}>
            {TIME_RANGES.map(range => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.timeRangeBtn,
                  selectedRange === range && styles.timeRangeBtnActive,
                  chartLoading && styles.timeRangeBtnDisabled,
                ]}
                onPress={() =>
                  !chartLoading &&
                  dispatch(setSelectedRange(range as '1D' | '1W' | '1M'))
                }
                disabled={chartLoading}
              >
                <Text
                  style={[
                    styles.timeRangeText,
                    selectedRange === range && styles.timeRangeTextActive,
                    chartLoading && styles.timeRangeTextDisabled,
                  ]}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About Section */}
        {companyData && (
          <AboutSection
            companyData={companyData}
            currentPrice={companyData?.Price || ''}
          />
        )}

        <WatchlistBottomSheet
          visible={watchlistModalVisible}
          onClose={() => setWatchlistModalVisible(false)}
          stock={{
            symbol: symbol,
            name: companyData?.Name || stock.name || 'N/A',
            price: companyData?.Price || stock.price || 'N/A',
            changePercentage: companyData?.ChangePercent || stock.change || '',
          }}
        />
      </ScrollView>
    </SafeScreen>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
  },
  headerText: {
    fontSize: fontSize(22),
    fontWeight: '700',
    color: '#222',
  },
  bookmarkBtn: {
    padding: wp(2),
  },
  bookmarkIcon: {
    fontSize: fontSize(22),
  },
  stockInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: borderRadius(12),
    padding: padding(3),
    marginBottom: hp(2),
  },
  logoCircle: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: fontSize(32),
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
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#222',
  },
  stockChange: {
    fontSize: fontSize(13),
    fontWeight: '500',
    marginTop: hp(0.5),
  },
  graphContainer: {
    backgroundColor: '#fff',
    borderRadius: borderRadius(12),
    padding: padding(3),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'stretch',
    overflow: 'hidden',
    minHeight: hp(22), 
  },
  graphLine: {
    height: hp(18),
    backgroundColor: '#e0e7ff',
    borderRadius: borderRadius(8),
    marginBottom: hp(2),
  },
  timeRangeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(1),
    minHeight: hp(4),
  },
  timeRangeBtn: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.7),
    borderRadius: borderRadius(8),
    marginHorizontal: wp(1),
    backgroundColor: '#f5f5f5',
  },
  timeRangeBtnActive: {
    backgroundColor: '#fbeee0',
  },
  timeRangeBtnDisabled: {
    opacity: 0.5,
  },
  timeRangeText: {
    fontSize: fontSize(13),
    color: '#888',
    fontWeight: '500',
  },
  timeRangeTextActive: {
    color: '#d35400',
    fontWeight: '700',
  },
  timeRangeTextDisabled: {
    color: '#ccc',
    fontWeight: '500',
  },
});
