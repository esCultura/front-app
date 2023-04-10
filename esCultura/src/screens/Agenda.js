import { Text , View} from "react-native";
import CustomCalendar from '../components/Calendar.js';
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";

import { Dimensions } from 'react-native';

export default function Agenda(props) {
    return (
      <View>
        <CustomCalendar perfil="primerUsuari" />
      </View>
  );
    
}

const styles = StyleSheet.create({
  container : {
      flex: 1,
      width: '100%' ,
      height: "100%",
  }

});
