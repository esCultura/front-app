import { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet, DevSettings } from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import SearchFilter from "../components/SearchFilter";
import Screen from "../components/Screen";
import { simpleFetch } from "../utils/utilFunctions";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default function Search(props) {
  const url =
    "http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/";
  const offset = useRef(0);
  const loading = useRef(false);
  const [esdeveniments, setEsdeveniments] = useState([]);
  const [jo, setJo] = useState(null);

  const handleInfoCompletaClose = () => {};

  function componenDidMount() {
    loading.current = true;
    fetch(url + `?limit=15&offset=${offset.current}`, { method: "GET" })
      .then((data) => data.json())
      .then((obj) => {
        offset.current = 15;
        setEsdeveniments(obj);
        loading.current = false;
      })
      .catch((err) => console.error(err));
  }

  function loadMore() {
    loading.current = true;
    fetch(url + `?limit=15&offset=${offset.current}`, { method: "GET" })
      .then((data) => data.json())
      .then((obj) => {
        console.log(offset.current);
        offset.current += 15;
        loading.current = false;
        setEsdeveniments((current) => [...current, ...obj]);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    const fetchJo = async () => {
      let endPoint = `usuaris/perfils/jo/`;
      const data = await simpleFetch(endPoint, "GET", "");
      setJo(data.user);
      console.log("josearch", data.user);
    };

    componenDidMount();
    fetchJo();
  }, []);

  const onQueryChange = (query) => {
    console.log("Final endpoint Query: ", query);
  };

  return (
    <Screen navigation={props.navigation}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && !loading.current) {
            loadMore();
          }
        }}
        scrollEventThrottle={400}
        contentContainerStyle={styles.llistat}
      >
        <SearchFilter onVariableChange={onQueryChange} isList={true} />
        {jo !== null &&
          esdeveniments.map((esd, i) => {
            return (
              <Esdeveniment
                key={i}
                title={esd.nom}
                perfil={jo}
                source={
                  "http://agenda.cultura.gencat.cat" 
                }
                desc={esd.descripcio.replaceAll("&nbsp;", "\n")}
                back={() => handleInfoCompletaClose()}
                dateIni={esd.dataIni.slice(0, 10)}
                dateFi={esd.dataFi.slice(0, 10)}
                location={esd.espai}
                type={esd.tematiques.map((tema) => tema.nom)}
                preu={esd.entrades}
                codi={esd.codi}
              />
            );
          })}
        {loading.current && <Text>Carregant ...</Text>}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  llistat: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
