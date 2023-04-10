import { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import SearchFilter from "../components/SearchFilter";
import Screen from "../components/Screen";

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
        <Screen>
            <ScrollView 
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    loadMore();
                }}
            }
            scrollEventThrottle={400}
            contentContainerStyle={styles.llistat}>
                <SearchFilter onVariableChange={onQueryChange} isList={true} />
                {
                    esdeveniments.map((esd) => {
                        return (<Esdeveniment key={esd.codi} title={esd.nom}
                            source={"http://agenda.cultura.gencat.cat"+esd.imatges_list[0]} desc={esd.descripcio.replaceAll("&nbsp;", "\n")}
                            date={esd.dataIni} location={esd.espai} type={esd.tematiques} preu={esd.entrades} />)})
                }
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    llistat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})