const request = require('request');

const geocode = (location, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoicGF2YW5pOTgiLCJhIjoiY2t3eDhpMXhzMGJlOTJvbnJ1ZTlrOTNtMCJ9.RHhhbrna-lvOzN5AVAgnzA';
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find the Address!", undefined);
        } else {
            let data = {
                "latitude": body.features[0].center[1],
                "longitude": body.features[0].center[0],
                "location": body.features[0].place_name
            }
            callback(undefined, data);
        }
    })
}


module.exports = geocode;