const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=a60b3d16105299f1d937d68717a536bc&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + '&units=f';
    console.log(url);
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service!", undefined);
        } else if (body.error) {
            callback("Unable to find the location!", undefined);
        } else {
            let forecast = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. Theres is a ' + body.current.precip + '% chance of rain.';
            callback(undefined, forecast);
        }
    })
}


module.exports = forecast;