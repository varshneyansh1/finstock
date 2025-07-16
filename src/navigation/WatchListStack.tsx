import { Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WatchList from '../screens/watchlist';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const WatchListStack = () => {
  return (
   
    <Stack.Navigator initialRouteName='WatchListScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name='WatchListScreen' component={WatchList} />
    </Stack.Navigator>
   
  )
}

export default WatchListStack;