import { Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WatchList from '../screens/watchlist';
import WatchlistDetailScreen from '../screens/watchlist/WatchlistDetailScreen';
import Details from '../screens/details';

const Stack = createNativeStackNavigator();
const WatchListStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WatchListScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="WatchListScreen" component={WatchList} />
      <Stack.Screen name="WatchlistDetail" component={WatchlistDetailScreen} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default WatchListStack;
