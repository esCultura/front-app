import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import HouseFillIcon from 'react-native-bootstrap-icons/icons/house-fill';
import SearchIcon from 'react-native-bootstrap-icons/icons/search';
import ChatIcon from 'react-native-bootstrap-icons/icons/chat-fill';
import MapIcon from 'react-native-bootstrap-icons/icons/geo-alt-fill';
import CalendarIcon from 'react-native-bootstrap-icons/icons/calendar3';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Base from './src/screens/Base';
import Settings from './src/screens/Settings';

import * as Localitzation from 'expo-localization';
import {setLanguage} from './src/utils/utilFunctions';

const Stack = createNativeStackNavigator();

//split l'ideoma per defecta que te el mobil aixo a d'anar en el translate o a 
//utils per possar l'ideoma per defecta 
let ideoma = Localitzation.locale;
ideoma = ideoma.split('-')[0];
setLanguage(ideoma);

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
            <Stack.Group>
              <Stack.Screen name="Base" component={Base} />
              <Stack.Screen name="Settings" component={Settings} />
            </Stack.Group>
        </Stack.Navigator>
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
