import { Text , View} from "react-native";
import PerfilSimple from '../components/PerfilSimple';
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
        <PerfilSimple id='6' screenLoaded={screenLoaded} />
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
