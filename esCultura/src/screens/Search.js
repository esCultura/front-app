import { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import Esdeveniment from "../components/Esdeveniment";

export default function Search(props) {
    const [esdeveniments, setEsdeveniments] = useState([]);
    function componenDidMount() {
        fetch("http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/", { method: "GET" })
            .then(data => data.json())
            .then(obj => {
                setEsdeveniments(obj)
            })
            .catch(err => console.error(err));
    }

    useEffect( () => {
        componenDidMount();
    }, []);

    return (
        <>
            <Text>LListat d'esdeveniments</Text>
            <ScrollView contentContainerStyle={styles.llistat}>
            {
                esdeveniments.map((esd) => {
                    return (<Esdeveniment key={esd.codi} title={esd.nom}
                        source={"https://agenda.cultura.gencat.cat"+esd.imatges_list[0]} brief="---"
                        date={esd.dataIni} location={esd.espai} type={esd.tematiques} />)})
            }
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    llistat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})