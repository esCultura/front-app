import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Search from './Search';
import Chat from './Chat';
import Map from './Map';
import Agenda from './Agenda';

import HouseFillIcon from 'react-native-bootstrap-icons/icons/house-fill';
import SearchIcon from 'react-native-bootstrap-icons/icons/search';
import ChatIcon from 'react-native-bootstrap-icons/icons/chat-fill';
import MapIcon from 'react-native-bootstrap-icons/icons/geo-alt-fill';
import CalendarIcon from 'react-native-bootstrap-icons/icons/calendar3';

const Tab = createBottomTabNavigator();

export default function Base(props) {
  return (
    <>
        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: '#2FDD60' }, tabBarActiveTintColor: 'white', tabBarInactiveTintColor: 'white' }}>
            <Tab.Screen name="Home" 
            children={()=><Home {...props} />}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size }) => (
                    <HouseFillIcon name="home" color={color} size={size} />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="Search" 
            children={() => <Search {...props} />}
            options={{
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
    </>
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
