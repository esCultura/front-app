import { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet, DevSettings } from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import SearchFilter from "../components/SearchFilter";
import Screen from "../components/Screen";
import { simpleFetch } from "../utils/utilFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const imagePool = [
  "https://i.kym-cdn.com/entries/icons/mobile/000/027/879/yobammarere.jpg",
  "https://i.redd.it/nlli0s4e3gu21.jpg",
  "https://static.wikia.nocookie.net/evade-nextbot/images/7/75/Obunga.png/revision/latest?cb=20230312113830",
  "https://i.kym-cdn.com/photos/images/masonry/001/468/978/c80.png",
  "https://pbs.twimg.com/media/EwoRbsMWEAA8w6n.jpg",
];

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
  const jo = useRef(null);

  const handleInfoCompletaClose = () => {};

  function componenDidMount() {
    loading.current = true;
    fetch(url + `?limit=15&offset=${offset.current}`, { method: "GET" })
      .then((data) => data.json())
      .then((obj) => {
        offset.current = 15;
        loading.current = false;
        setEsdeveniments(obj);
      })
      .catch((err) => console.error(err));
  }

  function loadMore() {
    loading.current = true;
    fetch(url + `?limit=15&offset=${offset.current}`, { method: "GET" })
      .then((data) => data.json())
      .then((obj) => {
        offset.current += 15;
        loading.current = false;
        setEsdeveniments((current) => [...current, ...obj]);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    async function _retrieveData() {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          let result = JSON.parse(value);
          console.log("token stored: ", result);
          jo.current = result.user;
        }
      } catch (error) {
        console.log("error en agafar dades locals, token error: ", error);
      }
    }
    _retrieveData();

    componenDidMount();
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
            if (esd.tematiques == null || esd.tematiques.length == 0) return;
            return (
              <Esdeveniment
                key={i}
                title={esd.nom}
                perfil={jo}
                source={imagePool[i % imagePool.length]}
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
