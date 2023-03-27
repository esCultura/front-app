import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
//import Geolocation from 'react-native-geolocation-service';
import MarkersMap from './MarkersComp';

export default function MapComp() {

    const [location, setLocation] = useState(false);
    const [eventsData, setEventsData] = useState([]);

    /*
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } catch (err) {
        return false;
      }
    };
  */

    /*
    const getData = async() => {
      const response = await fetch('http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/', {method: "GET"} );
      const data = await response.json();
      console.log(data);
      setEventsData(data);
      console.log("eventData: ", eventsData);
    }
    */

    /*
    const getLocation = async () => {
      const result = await requestLocationPermission();
      console.log('result is:', result);
    
      if (result) {
          Geolocation.getCurrentPosition(
          (position) => {
              console.log("Position value: ", position);
              setLocation(position);
          },
          (error) => {
              // See error code charts below.
              //console.log(error.code, error.message);
              console.log(error);
    
              setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
          );
      }
      console.log(location);
    };
    */
    
    useEffect( ()=>{
      setEventsData([{ latitude : 41.939433, longitude : 2.250936},{ latitude : 41.389324, longitude : 2.113703},{ latitude : 41.710428, longitude : 1.831592}]);
      //getLocation();
      //getData();
    }, [])

    return (
        <View>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 41.389324,
                    longitude: 2.113703,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
              <MarkersMap></MarkersMap>
            </MapView>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    
    locationContainer: {
        marginTop: 30,
        marginLeft: 10,
        padding: 10, 
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });