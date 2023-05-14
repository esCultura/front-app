import { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet, DevSettings } from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import SearchFilter from "../components/SearchFilter";
import Screen from "../components/Screen";
import { simpleFetch } from "../utils/utilFunctions";


const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

export default function Search(props) {
    const url = "http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/";
    const offset = useRef(0);
    const [esdeveniments, setEsdeveniments] = useState([]);
    const [jo, setJo] = useState(null);

    const handleInfoCompletaClose = () => {
      };

    function componenDidMount() {
        fetch(url+`?limit=15&offset=${offset.current}`, { method: "GET" })
            .then(data => data.json())
            .then(obj => {
                offset.current = 1;
                setEsdeveniments(obj)
            })
            .catch(err => console.error(err));
    }

    function loadMore() {
        console.log("PAGINACIÓ TODO");
        return;
        fetch(url+`?limit=15&offset=${offset}`, { method: "GET" })
            .then(data => data.json())
            .then(obj => {
                offset.current += 1;
                console.log(obj)
                setEsdeveniments(obj);
            })
            .catch(err => console.error(err));
    }

    useEffect( () => {
        const fetchJo = async () => {
            let endPoint = `usuaris/perfils/jo/`;
            const data = await simpleFetch(endPoint, "GET", "")
            setJo(data.user);
            console.log("josearch", data.user);
        }

        componenDidMount();
        fetchJo();
    
    }, []);

    const onQueryChange = (query) => {
        console.log("Final endpoint Query: ", query);
    };

    return (
        <Screen navigation={props.navigation}>
            <ScrollView 
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    loadMore();
                }}
            }
            scrollEventThrottle={400}
            contentContainerStyle={styles.llistat}>
                <SearchFilter onVariableChange={onQueryChange} isList={true} />
                { jo !== null  && ( 
                  esdeveniments.map((esd) => {
                        return ( <Esdeveniment key={esd.codi} title={esd.nom} perfil={jo}
                            source={"http://agenda.cultura.gencat.cat"+esd.imatges_list[0]} desc={esd.descripcio.replaceAll("&nbsp;", "\n")} back={() => handleInfoCompletaClose()}
                            dateIni={esd.dataIni.slice(0,10)} dateFi={esd.dataFi.slice(0,10)} location={esd.espai} type={esd.tematiques.map(tema => tema.nom)} preu={esd.entrades} codi={esd.codi}/>
                            )}))
                }
                {/* { loading && <Text>Carregant ...</Text> } */}
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