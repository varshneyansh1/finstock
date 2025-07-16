import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStack from './AppStack';
import WatchListStack from './WatchListStack';
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'ellipse-outline';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'WatchList') {
            iconName = focused ? 'star' : 'star-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: { backgroundColor: '#fff' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={AppStack} />
      <Tab.Screen name="WatchList" component={WatchListStack} />
    </Tab.Navigator>
  );
};

export default BottomTab;
