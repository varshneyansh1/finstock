import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import ViewAll from '../screens/viewall';
import Details from '../screens/details';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="ViewAll" component={ViewAll} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
