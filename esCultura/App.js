import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Base from './src/screens/Base';
import Settings from './src/screens/Settings';

import Login from './src/screens/Login';
import SingUp from './src/screens/SingUp';

import * as Localitzation from 'expo-localization';
import {setLanguage} from './src/utils/utilFunctions';

const Stack = createNativeStackNavigator();

//split l'ideoma per defecta que te el mobil aixo a d'anar en el translate o a 
//utils per possar l'ideoma per defecta 
let ideoma = Localitzation.locale;
ideoma = ideoma.split('-')[0];
setLanguage(ideoma);

export default function App() {
  //isSignedIn
  let isSignedIn = false;

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        { isSignedIn ? (
                <Stack.Group>
                  <Stack.Screen name="Base" component={Base} />
                  <Stack.Screen name="Settings" component={Settings} />
                </Stack.Group>
            ) : (
                <Stack.Group>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="SingUp" component={SingUp} />
                </Stack.Group>
            )
        }
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
