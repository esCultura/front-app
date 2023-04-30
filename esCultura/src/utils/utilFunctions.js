/**
 * Language, setLanguage
 */

let language = 'cat';

export function setLanguage(newLanguage) {
    console.log("newLanguage: ", newLanguage);
    language = newLanguage;
}

export function getLanguage() {
    return language;
}

//simplificador de i18n



/**
 * Token, setToken and fetch
 */

let token = '4399aea952484e30ad0208cd72bf64a083c9b8c4';

export function setToken(newToken) {
    token = newToken;
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
                'Authorization': 'Basic '+ token, 
            },
            body: JSON.stringify(bodyData),
        })
    }

    let resultJson = await result.json();

    console.log("finalResult: ", resultJson);
    return resultJson;    
}