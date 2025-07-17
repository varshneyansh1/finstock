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
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Ionicons from 'react-native-vector-icons/Ionicons';
import WatchlistBottomSheet from '../../components/WatchlistBottomSheet';
import AboutSection from '../../components/AboutSection';
import {
  fetchCompanyOverview,
  fetchDailyTimeSeries,
  fetchWeeklyTimeSeries,
  fetchMonthlyTimeSeries,
} from '../../api';
import StockGraph from '../../components/StockGraph';

const DUMMY_STOCK = {
  logo: '🍏',
  name: 'APPLE INC',
  ticker: 'AAPL',
  type: 'Common Stock',
  exchange: 'NSQ',
  price: '$177.15',
  change: '+0.41%',
  changePositive: true,
};

const TIME_RANGES = ['1D', '1W', '1M'];

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute() as {
    params?: { stock?: typeof DUMMY_STOCK; symbol?: string };
  };
  const stock = route.params?.stock || DUMMY_STOCK;
  const symbol = route.params?.symbol || stock.ticker;
  const [selectedRange, setSelectedRange] = useState('1D');

  // Company overview data state
  const [companyData, setCompanyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Watchlist modal state
  const [watchlistModalVisible, setWatchlistModalVisible] = useState(false);
  const [watchlists, setWatchlists] = useState(['Watchlist 1', 'Watchlist 2']);
  const [selectedWatchlists, setSelectedWatchlists] = useState<string[]>([]);

  // Chart data state
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartLoading, setChartLoading] = useState(true);

  // Fetch company overview data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCompanyOverview(symbol);
        setCompanyData(data);
      } catch (error) {
        console.error('Error fetching company overview:', error);
        setCompanyData(null);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  // Fetch chart data when selectedRange or symbol changes
  useEffect(() => {
    const fetchChartData = async () => {
      if (!symbol) return;
      setChartLoading(true);
      try {
        let data;
        if (selectedRange === '1D') {
          data = await fetchDailyTimeSeries(symbol);
        } else if (selectedRange === '1W') {
          data = await fetchWeeklyTimeSeries(symbol);
        } else if (selectedRange === '1M') {
          data = await fetchMonthlyTimeSeries(symbol);
        }
        // Parse the response to extract the time series
        let timeSeries = null;
        if (selectedRange === '1D') {
          timeSeries = data['Time Series (Daily)'];
        } else if (selectedRange === '1W') {
          timeSeries = data['Weekly Time Series'];
        } else if (selectedRange === '1M') {
          timeSeries = data['Monthly Time Series'];
        }
        if (timeSeries) {
          // Convert to chart data: [{ value: close }, ...] (no x-axis labels)
          const chartArr = Object.entries(timeSeries)
            .slice(
              0,
              selectedRange === '1D' ? 16 : selectedRange === '1W' ? 12 : 12,
            ) // limit points for clarity
            .map(([date, val]: any) => ({ value: parseFloat(val['4. close']) }))
            .reverse(); // reverse for chronological order
          setChartData(chartArr);
        } else {
          setChartData([]);
        }
      } catch (err) {
        setChartData([]);
      } finally {
        setChartLoading(false);
      }
    };
    fetchChartData();
  }, [selectedRange, symbol]);

  const handleAddWatchlist = (name: string) => {
    if (!watchlists.includes(name)) {
      setWatchlists([...watchlists, name]);
    }
  };

  const handleToggleWatchlist = (name: string) => {
    setSelectedWatchlists(prev =>
      prev.includes(name) ? prev.filter(w => w !== name) : [...prev, name],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
          <Icon name="bookmark" size={fontSize(22)} color="#222" />
        </TouchableOpacity>
      </View>
      {/* Content ScrollView */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(4), paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stock Info */}
        <View style={styles.stockInfoRow}>
          <View style={styles.logoCircle}>
            <Text style={styles.logo}>{DUMMY_STOCK.logo}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: wp(3) }}>
            <Text style={styles.stockName}>
              {companyData?.Name || stock.name || DUMMY_STOCK.name}
            </Text>
            <Text style={styles.stockMeta}>
              {symbol || stock.ticker || DUMMY_STOCK.ticker},{' '}
              {companyData?.AssetType || stock.type || DUMMY_STOCK.type}
            </Text>
            <Text style={styles.stockMeta}>
              {companyData?.Exchange || stock.exchange || DUMMY_STOCK.exchange}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.stockPrice}>
              {stock.price || DUMMY_STOCK.price}
            </Text>
            <Text
              style={[
                styles.stockChange,
                { color: DUMMY_STOCK.changePositive ? '#2ecc71' : '#e74c3c' },
              ]}
            >
              {DUMMY_STOCK.changePositive ? '+' : ''}
              {DUMMY_STOCK.change}
            </Text>
          </View>
        </View>

        {/* Graph Placeholder */}
        <View style={styles.graphContainer}>
          <StockGraph data={chartData} loading={chartLoading} />
          {/* Time Range Selector */}
          <View style={styles.timeRangeRow}>
            {TIME_RANGES.map(range => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.timeRangeBtn,
                  selectedRange === range && styles.timeRangeBtnActive,
                ]}
                onPress={() => setSelectedRange(range)}
              >
                <Text
                  style={[
                    styles.timeRangeText,
                    selectedRange === range && styles.timeRangeTextActive,
                  ]}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About Section */}
        <AboutSection companyData={companyData} loading={loading} />

        <WatchlistBottomSheet
          visible={watchlistModalVisible}
          onClose={() => setWatchlistModalVisible(false)}
          watchlists={watchlists}
          onAddWatchlist={handleAddWatchlist}
          onToggleWatchlist={handleToggleWatchlist}
          selectedWatchlists={selectedWatchlists}
        />
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    overflow: 'hidden', // Prevents overflow
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
  timeRangeText: {
    fontSize: fontSize(13),
    color: '#888',
    fontWeight: '500',
  },
  timeRangeTextActive: {
    color: '#d35400',
    fontWeight: '700',
  },
});
