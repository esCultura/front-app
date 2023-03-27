import React, {useState, useEffect} from 'react';
import {Marker} from 'react-native-maps';

export default function MarkersMap() {

    function componentDidMount() {
        fetch('http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/?latitud=41.389324&longitud=2.113703&limit=100')
          .then(res => res.json())
          .then(data => {
            for(let d of data) {
                console.log(d.codi);
                console.log(d.latitud);
            }
            console.log(data);
            setEventsData(data);
          })
          .catch(console.error)
    }
    
    useEffect( ()=>{
        componentDidMount();
      }, [])

    const [eventsData, setEventsData] = useState([]);

    return eventsData.map((data) => <Marker
      key={data.codi}
      coordinate={{ latitude: data.latitud ? data.latitud : 0, 
                    longitude: data.longitud ? data.longitud : 0
                 }}
      //title={data.location}
      //description={data.comments}
    >
    </Marker >)
  }