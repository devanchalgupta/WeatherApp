var request = require('request');

var getWeather = (latitude, longitude, callback) => {

    request({
        url: `https://api.darksky.net/forecast/d26d3f6e81b1d56c56524de52299c6d4/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather')
        }
        
    });
};

module.exports.getWeather = getWeather;