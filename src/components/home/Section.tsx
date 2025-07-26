import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import responsive from '../../utils/responsive';
import StockCard from '../stockCard/StockCard';

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
    marginBottom: responsive.margin(3),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.margin(1),
  },
  sectionTitle: {
    fontSize: responsive.fontSize(18),
    fontWeight: '600',
    color: '#333',
  },
  viewAll: {
    fontSize: responsive.fontSize(14),
    color: '#007AFF',
    fontWeight: '500',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: responsive.margin(2),
  },
});

export default Section;
