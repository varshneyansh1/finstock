import BottomTab from './BottomTab'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppNavContainer = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
         <BottomTab />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default AppNavContainer

