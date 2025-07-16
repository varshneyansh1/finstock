import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { wp, hp, fontSize, borderRadius, padding } from '../utils/responsive';

interface HeaderProps {
  appName: string;
  searchPlaceholder?: string;
}

const Header = ({ appName, searchPlaceholder }: HeaderProps) => (
  <View style={styles.header}>
    <Text style={styles.appName}>{appName}</Text>
    <TextInput
      style={styles.searchBar}
      placeholder={searchPlaceholder || 'Search here...'}
      placeholderTextColor="#888"
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    marginTop: hp(3),
  },
  appName: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: 'black',
  },
  searchBar: {
    width: wp(50),
    height: hp(5),
    backgroundColor: '#f2f2f2',
    borderRadius: borderRadius(10),
    paddingHorizontal: padding(8),
    fontSize: fontSize(16),
    color: 'black',
  },
});

export default Header;
