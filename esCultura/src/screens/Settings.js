import { Button, Text } from "react-native";
import PerfilSimple from '../components/PerfilSimple.js';
import React, {useState, useEffect} from 'react';

export default function Settings({onLogin, navigation}) {
    const [screenLoaded, setScreenLoaded] = useState(true);

    useEffect(() => {
      setScreenLoaded(!screenLoaded);
    }, []);

    return (
        <>
            <Button title={"ENRERE"} onPress={() => navigation.goBack()} />
            <PerfilSimple onLogin={onLogin} id='6' screenLoaded={screenLoaded}  > </PerfilSimple>
        </>
    )
}