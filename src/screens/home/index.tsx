import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { wp, hp } from '../../utils/responsive';
import { topGainers, topLosers } from '../../constants/dummyStocks';
import Section from '../../components/Section';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  HomeScreen: undefined;
  ViewAll: { type: 'gainers' | 'losers' };
  Details: { stock: { id: string; name: string; price: string; icon: string } };
};

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleStockPress = (item: {
    id: string;
    name: string;
    price: string;
    icon: string;
  }) => {
    navigation.navigate('Details', { stock: item });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header appName="FinStock" searchPlaceholder="Search here..." />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Section
          title="Top Gainers"
          data={topGainers}
          onViewAll={() => navigation.navigate('ViewAll', { type: 'gainers' })}
          onStockPress={handleStockPress}
        />
        <Section
          title="Top Losers"
          data={topLosers}
          onViewAll={() => navigation.navigate('ViewAll', { type: 'losers' })}
          onStockPress={handleStockPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: wp(4),
  },
});
