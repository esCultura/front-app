import Screen from "../components/Screen";
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import Esdeveniment from '../components/Esdeveniment';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';


export default function Chat(props) {

    const user = 3;
    const [llistaVisible, setLlistaVisible] = useState(false);
    const [esdeveniments, setEsdeveniments] = useState([]);

        const fetchPreferits = async () => {
          try {
            const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments/?user=${user}` ,{
                headers: {
                    'Content-Type': 'application/json', 
              }});
            if (!response.ok) {
              throw new Error('Error al obtenir els interessos');
            }    
            const data = await response.json();
            console.log(data);
            const reserves = [];
            for (let i = 0; i < data.length; i++) {
              const assistencies = data[i].esdeveniment;
              const response2 = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/?codi='+assistencies ,{
                headers: {
                    'Content-Type': 'application/json', 
              }});
              if (!response2.ok) {
                throw new Error('Error al obtenir el esdeveniment');
              }
              const esd = await response2.json();
              reserves.push(esd[0]);
            }
            setEsdeveniments(reserves);   
              
        } catch (error) {
          console.error(error);
        }
      };


    

    return (
        <Screen>

            <Text> Foto perfil + nom + atributs </Text>

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
                esdeveniments.map((esd) => (
                <Esdeveniment 
                    key ={esd.codi}
                    back={() => setLlistaVisible(false)}
                    type={esd.tematiques}
                    desc={esd.descripcio}
                    title={esd.nom}
                    preu={esd.entrades}
                    dateFi = {esd.dataFi.slice(0,10)}
                    dateIni = {esd.dataIni.slice(0,10)}
                    location = {esd.espai}
                    codi = {esd.codi}
                    source = {"http://agenda.cultura.gencat.cat"+ esd.imatges_list[0]}
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