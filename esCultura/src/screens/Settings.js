import { Button, Text } from "react-native";
import PerfilSimple from '../components/PerfilSimple.js';
import React, {useState, useEffect} from 'react';
import { simpleFetch } from "../utils/utilFunctions";

export default function Settings({onLogin, navigation}) {
    const [screenLoaded, setScreenLoaded] = useState(true);

    const [jo, setJo] = useState(null);

    useEffect(() => {
      
        const fetchJo = async () => {
            let endPoint = `usuaris/perfils/jo/`;
            const data = await simpleFetch(endPoint, "GET", "")
            setJo(data.user);
            console.log("josettings", data.user);

        }

      setScreenLoaded(!screenLoaded);

      fetchJo();
    }, []);

    return (
        <>
            <Button title={"ENRERE"} onPress={() => navigation.goBack()} />
            {jo !== null  && (<PerfilSimple onLogin={onLogin} id={jo} screenLoaded={screenLoaded} jo={true} > </PerfilSimple>)}
        </>
    )
}