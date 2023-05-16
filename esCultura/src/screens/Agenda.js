import { Text, View } from "react-native";
import CustomCalendar from "../components/Calendar.js";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import Screen from "../components/Screen.js";
import { simpleFetch } from "../utils/utilFunctions";
import React, { useState, useEffect } from "react";

export default function Agenda(updated, handleTabPress) {
  const [screenLoaded, setScreenLoaded] = useState(true);
  const [jo, setJo] = useState(null);

  useEffect(() => {
    const fetchJo = async () => {
      let endPoint = `usuaris/perfils/jo/`;
      const data = await simpleFetch(endPoint, "GET", "");
      setJo(data.user);
    };

    setScreenLoaded(!screenLoaded);
    fetchJo();
  }, [updated]);

  return (
    <Screen navigation={props.navigation}>
      {jo !== null && (
        <CustomCalendar perfil={jo} screenLoaded={screenLoaded} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
