import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { hp, fontSize } from '../utils/responsive';
import StockCard from './StockCard';

interface SectionProps {
  title: string;
  data: Array<{
    id: string;
    name: string;
    price: string;
    changePercentage: string;
    symbol?: string;
  }>;
  onViewAll?: () => void;
  onStockPress?: (item: {
    id: string;
    name: string;
    price: string;
    changePercentage: string;
    symbol?: string;
  }) => void;
}

const Section = ({ title, data, onViewAll, onStockPress }: SectionProps) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onViewAll}>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <StockCard
          name={item.name}
          price={item.price}
          changePercentage={item.changePercentage}
          symbol={item.symbol}
          onPress={() => onStockPress && onStockPress(item)}
        />
      )}
      scrollEnabled={false}
    />
  </View>
);

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: hp(3),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  sectionTitle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: '#333',
  },
  viewAll: {
    fontSize: fontSize(14),
    color: '#007AFF',
    fontWeight: '500',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
});

export default Section;
