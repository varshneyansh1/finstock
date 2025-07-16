import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (

      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={Home} />
      </Stack.Navigator>
  
  );
};

export default AppStack;

const styles = StyleSheet.create({});
