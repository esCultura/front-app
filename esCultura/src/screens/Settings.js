import { Button, Text, TouchableOpacity } from "react-native";
import PerfilSimple from '../components/PerfilSimple.js';
import { StyleSheet, Image, Platform } from 'react-native';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
            {jo !== null  && (<PerfilSimple onLogin={onLogin} id={jo} screenLoaded={screenLoaded}  > </PerfilSimple>)}
        </>
    )
}

const styles = StyleSheet.create({
back: {
    zIndex: 1,
    position: 'absolute',
    top: 6,
    left: 6,
    width: 16,
    height: 16,
},
})