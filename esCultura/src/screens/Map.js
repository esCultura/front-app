import { Text, View } from "react-native";
import React, { useState} from 'react';
import MapComp from "../components/MapComp";
import Screen from "../components/Screen";

export default function Map(props) {

    return (
        <Screen navigation={props.navigation}>
            <MapComp></MapComp>
        </Screen>
    );
}