let token = null;

export function setToken(value) {
    token = value;
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
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                'Authorization': 'Basic '+ token, 
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