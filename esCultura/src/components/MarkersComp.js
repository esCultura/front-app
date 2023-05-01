import React, {useState, useEffect} from 'react';
import {Marker} from 'react-native-maps';
import {simpleFetch} from '../utils/utilFunctions';

export default function MarkersMap({queryFilter}, props) {
    console.log('esdeveniments/?latitud=' + props.latitud + '& longitud=' + props.longitud + '&limit=150 &'+queryFilter);
    function componentDidMount() {
      let endPoint =  "esdeveniments/?latitud=" + props.latitud + "& longitud=" + props.longitud + "&limit=5";
      console.log("query: ", queryFilter);
      if (queryFilter != "") {
        endPoint = "esdeveniments/?latitud=" + props.latitud + "& longitud=" + props.longitud + "&"+ queryFilter +"&limit=5" ;
      }
      console.log("endpoint: ", endPoint);
      
      simpleFetch(endPoint, "GET", "").then((data) => setEventsData(data))
    }
    
    useEffect( ()=>{
      componentDidMount();
    }, [queryFilter])

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