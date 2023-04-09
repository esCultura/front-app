import { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import SearchFilter from "../components/SearchFilter";

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

export default function Search(props) {
    const url = "http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/";
    const offset = useRef(0);
    const [esdeveniments, setEsdeveniments] = useState([]);
    function componenDidMount() {
        fetch(url+`?limit=15&offset=${offset.current}`, { method: "GET" })
            .then(data => data.json())
            .then(obj => {
                setEsdeveniments(obj)
            })
            .catch(err => console.error(err));
    }

    function loadMore() {
        console.log("PAGINACIÓ TODO");
        return;
        fetch(url+`?limit=15&offset=${offset+1}`, { method: "GET" })
            .then(data => data.json())
            .then(obj => {
                console.log(offset)
                offset.current += 1;
                setEsdeveniments(obj);
            })
            .catch(err => console.error(err));
    }

    useEffect( () => {
        componenDidMount();
    }, []);

    const onQueryChange = (query) => {
        console.log("Final endpoint Query: ", query);
    };

    return (
        <>
            <ScrollView 
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    loadMore();
                }}
            }
            scrollEventThrottle={400}
            contentContainerStyle={styles.llistat}>
                <Text>LListat d'esdeveniments</Text>
                <SearchFilter onVariableChange={onQueryChange} isList={false} />
                {
                    esdeveniments.map((esd) => {
                        return (<Esdeveniment key={esd.codi} title={esd.nom}
                            source={"http://agenda.cultura.gencat.cat"+esd.imatges_list[0]} brief="---"
                            date={esd.dataIni} location={esd.espai} type={esd.tematiques} />)})
                }
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    llistat: {
        borderColor: 'red',
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})