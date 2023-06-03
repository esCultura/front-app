import { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet, DevSettings } from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import SearchFilter from "../components/SearchFilter";
import Screen from "../components/Screen";
import { simpleFetch } from "../utils/utilFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ordenar from "../components/Ordenar";

const imagePool = [
  "https://cdn.pixabay.com/photo/2016/12/22/05/56/music-1924589_1280.jpg",
  "https://www.totsantcugat.cat/uploads/s1/26/29/80/54/festival-observa-sabadell-musica.png",
  "https://upload.wikimedia.org/wikipedia/commons/0/01/134_Mercat_de_Sant_Antoni_%28Barcelona%29%2C_fa%C3%A7ana_del_c._Comte_Borrell.jpg",
  "https://www.diaridesabadell.com/wp-content/uploads/2022/03/18.1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/94/Theatre_Royal_Brighton.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/77/Restaurante_The_Swan%2C_Londres%2C_Inglaterra%2C_2014-08-11%2C_DD_113.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/ColdplayParis160717-7_%2835938478112%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/7b/Concert_Band.jpg",
  "https://www.diaridesabadell.com/wp-content/uploads/2022/05/WhatsApp-Image-2022-05-08-at-19.55.40-e1652047567182.jpeg",
  "https://upload.wikimedia.org/wikipedia/commons/5/50/CoblaBaixLlobregat_9079.jpg",
  "https://museus.sabadell.cat//images/imatges/museu-art/portada/mas_portada_3.jpg",
  "https://barcelonacolours.com/wp-content/uploads/DSC_0080_baja-resolucion.jpg",
  "https://cdn2.picryl.com/photo/1499/12/31/retaule-dels-goigs-de-la-mare-de-deu-anonim-valencia-museu-de-belles-arts-de-b2b3d3-1024.jpg",
  "https://p1.pxfuel.com/preview/206/950/544/museum-ipiranga-sao-paulo-sampa.jpg",
  "https://live.staticflickr.com/8037/8046573097_b502ab200e_b.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO8r6Z9e0WAUleS2ely5KsGNeR-gHsRyD2RQ&usqp=CAU",
  "https://estaticos-cdn.elperiodico.com/clip/d70f82c5-941d-4790-a37d-9bf0426907a0_alta-libre-aspect-ratio_default_0.jpg",
  "https://cdn.pixabay.com/photo/2016/03/18/16/20/big-band-1265279_1280.jpg",
  "https://live.staticflickr.com/8115/8645310055_47c51da111_b.jpg",
  "https://cd1.taquilla.com/data/images/t/21/orquestra-simfonica-del-valles.jpga",
  "https://p1.pxfuel.com/preview/949/947/686/violin-instrument-music-orchestra-classic-musical-instrument.jpg",
  "https://media.timeout.com/images/100591323/750/562/image.jpg",
  "https://viajes.nationalgeographic.com.es/medio/2021/09/28/istock-museu-nacional-dart-de-catalunya_58243bd0_1254x836.jpg",
  "https://www.catalunyamedieval.es/wp-content/uploads/ngg_featured/02-Parroquial-de-Sant-Felix-150131_2040BISBLOG.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZVIjRxagsGs8NOvKfHlkh05W6BWywF14eKw&usqp=CAU",
  "https://lamasiaesplai.files.wordpress.com/2022/05/fotocasal.jpg?w=1200",
  "https://live.staticflickr.com/7302/16545188201_b05963d58d_b.jpg",
  "https://web.sabadell.cat/images/NOTICIES/cultura/castellersfm18.jpg",
  "https://adifolk.cat/ass/img/grups/3gbqqqd9ubmsck4cs0.jpg",
  "https://cdn.pixabay.com/photo/2020/05/11/09/04/concert-5157154_1280.jpg",
  "https://live.staticflickr.com/65535/49340830461_c5cf89b464_b.jpg",
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
  const dataEvent = useRef("");
  const dataOrd = useRef("");

  const handleInfoCompletaClose = () => {};

  function componenDidMount() {
    const now = new Date(Date.now());
    const forever = new Date(new Date(Date.now()).setFullYear(2300));
    loading.current = true;
    let endpoint = `?limit=15&offset=${
      offset.current
    }&dataIni__range=${now.toISOString()},${forever.toISOString()}`;
    if (dataEvent.current.length != 0) {
      endpoint += `&${dataEvent.current}`;
    }
    if (dataOrd.current.length != 0) {
      endpoint += `&${dataOrd.current}`;
    } else {
      endpoint += `&ordering=dataIni`;
    }
    fetch(url + endpoint, { method: "GET" })
      .then((data) => data.json())
      .then((obj) => {
        offset.current = obj.length;
        loading.current = false;
        setEsdeveniments(obj);
      })
      .catch((err) => console.error(err));
  }

  function loadMore() {
    loading.current = true;
    const now = new Date(Date.now());
    const forever = new Date(new Date(Date.now()).setFullYear(2300));
    let endpoint = `?limit=15&offset=${
      offset.current
    }&dataIni__range=${now.toISOString()},${forever.toISOString()}`;
    if (dataEvent.current.length != 0) {
      endpoint += `&${dataEvent.current}`;
    }
    if (dataOrd.current.length != 0) {
      endpoint += `&${dataOrd.current}`;
    } else {
      endpoint += `&ordering=dataIni`;
    }
    fetch(url + endpoint, { method: "GET" })
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
    if (query.length == 0) return;
    offset.current = 0;
    dataEvent.current = query;
    componenDidMount();
  };

  const onOrderChange = (ord) => {
    dataOrd.current = ord;
    componenDidMount();
  };

  return (
    <Screen navigation={props.navigation}>
      <SearchFilter onVariableChange={onQueryChange} isList={true} />
      <Ordenar onChange={onOrderChange} />
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && !loading.current) {
            loadMore();
          }
        }}
        scrollEventThrottle={400}
        contentContainerStyle={styles.llistat}
      >
        {jo !== null &&
          esdeveniments.map((esd, i) => {
            if (esd.tematiques == null || esd.tematiques.length == 0) return;
            return (
              <Esdeveniment
                key={i}
                title={esd.nom}
                perfil={jo.current}
                source={imagePool[i % imagePool.length]}
                desc={esd.descripcio.replaceAll("&nbsp;", "\n")}
                back={() => handleInfoCompletaClose()}
                dateIni={esd.dataIni.slice(0, 10)}
                dateFi={esd.dataFi.slice(0, 10)}
                location={esd.espai}
                type={esd.tematiques.map((tema) => tema.nom)}
                preu={esd.entrades}
                codi={esd.codi}
                enllac={esd.enllacos_list[0]}
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
