import { Text , View} from "react-native";
import CustomCalendar from '../components/Calendar.js';
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import Screen from "../components/Screen.js";

export default function Agenda(props) {
    return (
      <Screen>
        <CustomCalendar perfil="primerUsuari" />
      </Screen>
  );
    
}

const styles = StyleSheet.create({
  container : {
      flex: 1,
      width: '100%' ,
      height: "100%",
  }

});
