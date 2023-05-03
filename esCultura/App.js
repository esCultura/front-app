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

import * as Localitzation from 'expo-localization';
import i18n from './src/utils/translateFunctions';
import {useTranslation} from 'react-i18next';
const initI18n = i18n;

export default function App() {

  const Tab = createBottomTabNavigator();

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
