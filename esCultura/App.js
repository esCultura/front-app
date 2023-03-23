<<<<<<< HEAD
import { Button, StyleSheet, Text, View } from 'react-native';
import CustomCalendar from './src/components/Calendar.js';
export default function App() {
 
  return (
    <View style = {styles.container}>
        <CustomCalendar />
    </View>

  );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#47568',
   // alignItems: 'center',
    justifyContent: 'center',
  }
});
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Chat from './src/screens/Chat';
import Map from './src/screens/Map';
import Agenda from './src/screens/Agenda';

import HouseFillIcon from 'react-native-bootstrap-icons/icons/house-fill';
import SearchIcon from 'react-native-bootstrap-icons/icons/search';
import ChatIcon from 'react-native-bootstrap-icons/icons/chat-fill';
import MapIcon from 'react-native-bootstrap-icons/icons/geo-alt-fill';
import CalendarIcon from 'react-native-bootstrap-icons/icons/calendar3';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: '#2FDD60' }, tabBarActiveTintColor: 'white', tabBarInactiveTintColor: 'white' }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size }) => (
                    <HouseFillIcon name="home" color={color} size={size} />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="Search" component={Search} options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size }) => (
                    <SearchIcon name="search" color={color} size={size} />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="Chat" component={Chat} options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size }) => (
                    <ChatIcon name="search" color={color} size={size} />
                ),
                headerShown: false,
            }}/>
            <Tab.Screen name="Map" component={Map} options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size }) => (
                    <MapIcon name="search" color={color} size={size} />
                ),
                headerShown: false,
            }}/>
            <Tab.Screen name="Agenda" component={Agenda} options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size }) => (
                    <CalendarIcon name="search" color={color} size={size} />
                ),
                headerShown: false,
            }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
>>>>>>> origin/develop
