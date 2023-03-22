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