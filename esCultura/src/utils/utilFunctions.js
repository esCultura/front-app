import AsyncStorage from '@react-native-async-storage/async-storage';

let token;

async function _retrieveData () {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
        token = value;
    }
    console.log("token stored: ", token);
  } catch (error) {
    console.log("error en agafar dades locals, token error: ", error);
  }
};
_retrieveData ();

export function setToken(newToken) {
    async function _storeData() {
        try {
            await AsyncStorage.setItem(
                'token',
                newToken,
            );
            console.log("token save correctly");
        } catch (error) {
            console.log("error to save in local store, token error: ", error);
        }
    };
    _storeData();
}

export async function simpleFetch(endPoint, method, bodyData) {

    console.log("tokenValue: ", token);
    console.log("endPoint: ", endPoint);

    let host = 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/';
    console.log("url: ", host+endPoint);

    let result;
    if (method === "GET" || method === "HEAD") {
        result = await fetch(host+endPoint,  {   
            method: method,
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                'Authorization': 'Token '+ token, 
            },
        })
    }
    else {
        result = await fetch(host+endPoint,  {   
            method: method,
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                'Authorization': 'Token '+ token, 
            },
            body: JSON.stringify(bodyData),
        })
    }

    let resultJson = await result.json();

    console.log("finalResult: ", resultJson);
    return resultJson;    
}