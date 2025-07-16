import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wp, hp, fontSize, borderRadius } from '../utils/responsive';

interface StockCardProps {
  icon: string;
  name: string;
  price: string;
}

const StockCard = ({ icon, name, price }: StockCardProps) => (
  <View style={styles.card}>
    <View style={styles.iconCircle}>
      <Text style={styles.icon}>{icon}</Text>
    </View>
    <Text style={styles.stockName}>{name}</Text>
    <Text style={styles.stockPrice}>{price}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: borderRadius(12),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: wp(1),
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
});

export default StockCard;
