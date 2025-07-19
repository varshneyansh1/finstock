import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { wp, hp, fontSize, borderRadius } from '../../utils/responsive';

interface StockCardProps {
  name: string;
  price: string;
  changePercentage: string;
  symbol?: string;
  onPress?: () => void;
}

const DEFAULT_ICON = '📈';

const StockCard = ({
  name,
  price,
  changePercentage,
  symbol,
  onPress,
}: StockCardProps) => {
  const isNegative =
    changePercentage.startsWith('-') || parseFloat(changePercentage) < 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>{DEFAULT_ICON}</Text>
      </View>
      <Text style={styles.stockName}>{name}</Text>
      <Text style={styles.stockPrice}>{price}</Text>
      <Text style={[styles.stockChange, isNegative && styles.negativeChange]}>
        {changePercentage}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: borderRadius(12),
    alignItems: 'center',
    width: wp(44),
    paddingVertical: hp(2),
    marginBottom: hp(1),
  },
  iconCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(6),
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  icon: {
    fontSize: fontSize(24),
  },
  stockName: {
    fontSize: fontSize(15),
    fontWeight: '500',
    color: '#222',
    marginBottom: hp(0.5),
  },
  stockPrice: {
    fontSize: fontSize(14),
    color: '#666',
  },
  stockChange: {
    fontSize: fontSize(13),
    color: '#008000',
    marginTop: hp(0.5),
  },
  negativeChange: {
    color: '#ff0000',
  },
});

export default StockCard;
