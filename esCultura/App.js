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
