import { Text , View} from "react-native";
import CustomCalendar from '../components/Calendar.js';
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import Screen from "../components/Screen.js";
import React, {useState, useEffect} from 'react';

export default function Agenda(updated, handleTabPress) {
  const [screenLoaded, setScreenLoaded] = useState(true);

  useEffect(() => {
    setScreenLoaded(!screenLoaded);
  }, [updated]);

    return (
      <Screen>
        <CustomCalendar perfil="primerUsuari" screenLoaded={screenLoaded} />
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
