import { Button, Text } from "react-native";
import PerfilSimple from '../components/PerfilSimple.js';
import React, {useState, useEffect} from 'react';

export default function Settings(props) {
    const [screenLoaded, setScreenLoaded] = useState(true);

    useEffect(() => {
      setScreenLoaded(!screenLoaded);
    }, []);

    return (
        <>
            <Button title={"ENRERE"} onPress={() => props.navigation.goBack()} />
            <PerfilSimple id='6' screenLoaded={screenLoaded} > </PerfilSimple>
        </>
    )
}