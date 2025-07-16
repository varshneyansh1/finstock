import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { wp, hp } from '../../utils/responsive';
import { topGainers, topLosers } from '../../constants/dummyStocks';
import Section from '../../components/Section';
import Header from '../../components/Header';

const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header appName="FinStock" searchPlaceholder="Search here..." />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Section title="Top Gainers" data={topGainers} onViewAll={() => {}} />
        <Section title="Top Losers" data={topLosers} onViewAll={() => {}} />
    
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
