import React, {useState, useEffect} from 'react';
import {Marker} from 'react-native-maps';
import {simpleFetch} from '../utils/utilFunctions';

export default function MarkersMap({queryFilter, longitudeDivice, latitudeDivice}) {
    function componentDidMount() {
      let endPoint =  "esdeveniments/?latitud=" + latitudeDivice +"&longitud=" + longitudeDivice + "&limit=30";
      console.log("query: ", queryFilter);
      if (queryFilter != "") {
        endPoint = "esdeveniments/?latitud=" + latitudeDivice +"&longitud=" + longitudeDivice + "&"+ queryFilter +"&limit=30" ;
      }
      simpleFetch(endPoint, "GET", "").then((data) => setEventsData(data))
    }
    
    useEffect( ()=>{
      componentDidMount();
    }, [queryFilter, longitudeDivice, latitudeDivice])

    const [eventsData, setEventsData] = useState([]);

    return eventsData.map((data) => <Marker
      key={data.codi}
      coordinate={{ 
        latitude: data.latitud ? data.latitud : 0, 
        longitude: data.longitud ? data.longitud : 0
      }}
      title={data.nom}
      //mirar si es pot possar algu que linqui directa a l'esdeveniment
    >
    </Marker >)
  }