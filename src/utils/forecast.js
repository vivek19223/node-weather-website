//get request
const request = require('request');

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/f4676f654fa77de7b5ce679fcc9353df/'+encodeURIComponent(latitude)+ ','+encodeURIComponent(longitude)+'?units=si';
    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Unable to connect to the location server.!!',undefined)
        }
        else if(body.error){
            callback('Unable to find Location.!!Try Again.!!',undefined);
        }else{
            callback(undefined,`${body.daily.summary}.
             It is currently ${body.currently.temperature} degree out. 
             There is ${body.currently.precipProbability}% chance of rain.
             Current humidity is ${body.currently.humidity}%.`)
        }

    })
}

module.exports = forecast;