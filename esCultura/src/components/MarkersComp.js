import React, {useState, useEffect} from 'react';
import {Marker} from 'react-native-maps';

export default function MarkersMap({queryFilter}, props) {
    let host = 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/';
    console.log('esdeveniments/?latitud=' + props.latitud + '& longitud=' + props.longitud + '&limit=150 &'+queryFilter);
    function componentDidMount() {
      fetch(host+'esdeveniments/?latitud=' + props.latitud + '& longitud=' + props.longitud + '&limit=150 &'+queryFilter)
        .then(res => res.json())
        .then(data => {
          setEventsData(data);
        })
        .catch(console.error)
    }
    
    useEffect( ()=>{
      componentDidMount();
    }, [queryFilter])

    const [eventsData, setEventsData] = useState([]);

    return eventsData.map((data) => <Marker
      key={data.codi}
      coordinate={{ latitude: data.latitud ? data.latitud : 0, 
                    longitude: data.longitud ? data.longitud : 0
                 }}
      title={data.nom}
      //mirar si es pot possar algu que linqui directa a l'esdeveniment
    >
    </Marker >)
  }