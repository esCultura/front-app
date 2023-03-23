<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Esdeveniment from './src/components/Esdeveniment';

export default function App() {
  return (
    <View style={styles.container}>
      <Esdeveniment type="concert" title="Paolo Fresu & Omar Sosa" brief="Dues figures clau del jazz contemporani" date="Div. 11 Març" location="Nova Jazz Cava, Terrassa" source="https://www.jazzterrassa.org/sites/default/files/Fresu%26Sosa-Food%40RobertoCifarelli-9.jpg" /> 
      <Esdeveniment type="musical" title="Billy Elliot, el musical" brief="Tant de bo el tornin a fer!" date="LOLASU" location="In your mind mdfk" source="https://www.atrapalo.com/houdinis/wp-content/uploads/2021/06/billyelliot-cartel.jpg" /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
>>>>>>> develop
