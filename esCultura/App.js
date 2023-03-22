import 'react-native-vector-icons';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import calendar from './src/components/calendar.js';

export default function App() {
 
  return (

    <View style = {styles.container}>
        <Calendar/>
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

