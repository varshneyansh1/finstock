import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import {
  wp,
  hp,
  fontSize,
  borderRadius,
  padding,
} from '../../utils/responsive';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { LineChart } from 'react-native-gifted-charts';

const DUMMY_STOCK = {
  logo: '🍏',
  name: 'APPLE INC',
  ticker: 'AAPL',
  type: 'Common Stock',
  exchange: 'NSQ',
  price: '$177.15',
  change: '+0.41%',
  changePositive: true,
  about:
    "Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services. Apple is the world's largest technology company by revenue (totaling $274.5 billion in 2020) and, since January 2021, the world's most valuable company. As of 2021, Apple is the world's fourth-largest PC vendor by unit sales, and fourth-largest smartphone manufacturer. It is one of the Big Five American information technology companies, along with Amazon, Google, Microsoft, and Facebook.",
  tags: [
    { label: 'Industry: Electronic computers', color: '#fbeee0' },
    { label: 'Sector: Technology', color: '#e0f7fa' },
  ],
  stats: [
    { label: '52-Week Low', value: '$123.64' },
    { label: 'Current price', value: '$177.15' },
    { label: '52-Week High', value: '$197.96' },
    { label: 'Market Cap', value: '$2.77T' },
    { label: 'P/E Ratio', value: '27.77' },
    { label: 'Beta', value: '1.308' },
    { label: 'Dividend Yield', value: '0.54%' },
    { label: 'Profit Margin', value: '0.247' },
  ],
};

const TIME_RANGES = ['1D', '1W', '1M', '3M', '6M', '1Y'];

// Dummy data for main price chart
const DUMMY_CHART_DATA = [
  { value: 175 },
  { value: 176 },
  { value: 177 },
  { value: 178 },
  { value: 177.5 },
  { value: 177 },
  { value: 176.5 },
  { value: 177 },
  { value: 177.2 },
  { value: 177.15 },
];

// Dummy data for 52-week low/high chart
const DUMMY_52WEEK_DATA = [
  { value: 123.64, label: 'Low' },
  { value: 177.15, label: 'Current' },
  { value: 197.96, label: 'High' },
];

// Modular chart component for main price chart
const StockLineChart = ({ data }: { data: any[] }) => (
  <LineChart
    data={data}
    height={hp(18)}
    width={wp(85)}
    isAnimated
    color="#d35400"
    thickness={2}
    hideDataPoints
    xAxisColor="transparent"
    yAxisColor="transparent"
    noOfSections={4}
    areaChart
    startFillColor="#fbeee0"
    endFillColor="#fff"
    startOpacity={0.5}
    endOpacity={0.1}
    yAxisTextStyle={{ color: 'transparent' }}
    xAxisLabelTextStyle={{ color: 'transparent' }}
    initialSpacing={0}
    spacing={wp(7)}
    disableScroll
  />
);

// Modular chart for 52-week low/high
const WeekRangeChart = ({ data }: { data: any[] }) => (
  <View style={styles.weekRangeContainer}>
    <Text style={styles.weekRangeLabel}>52-Week Low</Text>
    <LineChart
      data={data}
      height={hp(5)}
      width={wp(60)}
      color="#d35400"
      thickness={3}
      hideDataPoints={false}
      yAxisColor="transparent"
      xAxisColor="transparent"
      yAxisTextStyle={{ color: 'transparent' }}
      xAxisLabelTextStyle={{ color: 'transparent' }}
      initialSpacing={0}
      spacing={wp(25)}
      disableScroll
      showVerticalLines={false}
      showXAxisIndices={false}
      showYAxisIndices={false}
      showReferenceLine1={false}
      dataPointsColor={'#d35400'}
    />
    <Text style={styles.weekRangeLabel}>52-Week High</Text>
  </View>
);

const Details = () => {
  const route = useRoute();
  // @ts-ignore
  const stock = route.params?.stock || DUMMY_STOCK;
  const [selectedRange, setSelectedRange] = useState('1D');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: hp(4) }}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Details Screen</Text>
        <TouchableOpacity style={styles.bookmarkBtn}>
          <Icon name="bookmark" size={fontSize(22)} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Stock Info */}
      <View style={styles.stockInfoRow}>
        <View style={styles.logoCircle}>
          <Text style={styles.logo}>{stock.icon || DUMMY_STOCK.logo}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: wp(3) }}>
          <Text style={styles.stockName}>{stock.name || DUMMY_STOCK.name}</Text>
          <Text style={styles.stockMeta}>
            {stock.ticker || DUMMY_STOCK.ticker},{' '}
            {stock.type || DUMMY_STOCK.type}
          </Text>
          <Text style={styles.stockMeta}>
            {stock.exchange || DUMMY_STOCK.exchange}
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
        <StockLineChart data={DUMMY_CHART_DATA} />
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
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About {DUMMY_STOCK.name}</Text>
        <Text style={styles.aboutText}>{DUMMY_STOCK.about}</Text>
        <View style={styles.tagsRow}>
          {DUMMY_STOCK.tags.map(tag => (
            <View
              key={tag.label}
              style={[styles.tag, { backgroundColor: tag.color }]}
            >
              <Text style={styles.tagText}>{tag.label}</Text>
            </View>
          ))}
        </View>
        {/* 52-Week Range Chart */}
        <WeekRangeChart data={DUMMY_52WEEK_DATA} />
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {DUMMY_STOCK.stats.map((stat, idx) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
  aboutSection: {
    backgroundColor: '#fff',
    borderRadius: borderRadius(12),
    padding: padding(3),
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  aboutTitle: {
    fontSize: fontSize(15),
    fontWeight: '700',
    color: '#222',
    marginBottom: hp(1),
  },
  aboutText: {
    fontSize: fontSize(13),
    color: '#444',
    marginBottom: hp(1.5),
  },
  tagsRow: {
    flexDirection: 'row',
    marginBottom: hp(1.5),
  },
  tag: {
    borderRadius: borderRadius(8),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.7),
    marginRight: wp(2),
  },
  tagText: {
    fontSize: fontSize(12),
    color: '#222',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(1),
  },
  statItem: {
    width: '33%',
    marginBottom: hp(1.5),
  },
  statLabel: {
    fontSize: fontSize(12),
    color: '#888',
  },
  statValue: {
    fontSize: fontSize(14),
    color: '#222',
    fontWeight: '600',
  },
  weekRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(2),
    paddingHorizontal: wp(2),
  },
  weekRangeLabel: {
    fontSize: fontSize(12),
    color: '#888',
    fontWeight: '500',
  },
});
