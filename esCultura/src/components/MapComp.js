import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
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

export default function MapComp() {

    const [location, setLocation] = useState(false);

    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
        console.log('res is:', res);
        if (res) {
            Geolocation.getCurrentPosition(
            position => {
                console.log(position);
                setLocation(position);
            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
                setLocation(false);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
        }
        });
        console.log(location);
    };

    return (
        <View>
            <View style={styles.topContainer}>
                <Button title="Get Location" onPress={getLocation} />
            </View>
            <View style={styles.locationContainer}>
                <Text>Latitude: {location ? location.coords.latitude : null}</Text>
                <Text>Longitude: {location ? location.coords.longitude : null}</Text>
            </View>
            <MapView style={styles.map} />

        </View>
        
    );
  }
  
  const styles = StyleSheet.create({
    topContainer: {
      marginTop: 30,
      padding: 10, 
      borderRadius: 10, 
      width: '40%'
    },
    locationContainer: {
        marginLeft: 10,
        padding: 10, 
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });