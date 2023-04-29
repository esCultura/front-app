import Screen from "../components/Screen";
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import Esdeveniment from '../components/Esdeveniment';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';
import { simpleFetch } from "../utils/utilFunctions";


export default function Chat(props) {

    const user = 3;
    const [llistaVisible, setLlistaVisible] = useState(false);
    const [esdeveniments, setEsdeveniments] = useState([]);
    const [infoPerfil, setInfoPerfil] = useState([]);

        const fetchPreferits = async () => {
            let endPoint = 'interessos/esdeveniments/?perfil=3';
            const data = await simpleFetch(endPoint, "GET", "");
            const reserves = [];
            for (let i = 0; i < data.length; i++) {
              const assistencies = data[i].esdeveniment;
              endPoint = 'esdeveniments?codi='+assistencies;
              const esd = await simpleFetch(endPoint, "GET", "");
              reserves.push(esd);
            }
            console.log("reserves", reserves);
            setEsdeveniments(reserves); 
      };

   useEffect(() => {
      const fetchPerfil = async () => {
          let endPoint = 'usuaris/perfils?user=3';
          const data = await simpleFetch(endPoint, "GET", "")
          console.log("datos", data[2]);
          setInfoPerfil(data[2]);
      }

      fetchPerfil();
  }, []);


    

    return (
        <Screen>
            <Text> Foto perfil + nom + atributs </Text>
            <Text> {infoPerfil.imatge} + {infoPerfil.username} + {infoPerfil.email} </Text>

            <TouchableOpacity style={styles.button} onPress={() => {setLlistaVisible(true); fetchPreferits() }}>
                <Text > LlistaPreferits </Text>
            </TouchableOpacity>

            <Text> Trofeus </Text>


            <TouchableOpacity style={styles.button} onPress={() => {setLlistaVisible(true); fetchPreferits() }}>
                <Text > Logout </Text>
            </TouchableOpacity>

            


            <Modal visible={llistaVisible } animationType="slide">
        
                <TouchableOpacity onPress={() => setLlistaVisible(false)} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                <View style={styles.llistat}>
                {
                esdeveniments.map(esd => (
                <Esdeveniment 
                    key ={esd[0].codi}
                    back={() => setLlistaVisible(false)}
                    type={esd[0].tematiques.map(tema => tema.nom)}
                    desc={esd[0].descripcio}
                    title={esd[0].nom}
                    preu={esd[0].entrades}
                    dateFi = {esd[0].dataFi.slice(0,10)}
                    dateIni = {esd[0].dataIni.slice(0,10)}
                    location = {esd[0].espai}
                    codi = {esd[0].codi}
                    source = {"http://agenda.cultura.gencat.cat"+ esd[0].imatges_list[0]}
                            />
                    ))}
                    </View>
                </Modal>


        </Screen>
        

    );

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
    padding:10,
    borderRadius: 5,
    shadowOffset: { width: 2 , height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 130,
    justifyContent: 'center', 
    alignItems: 'center',
    },
      llistat: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
        },
        back: {
            zIndex: 1,
            position: 'absolute',
            top: 6,
            left: 6,
            width: 16,
            height: 16,
        }
});