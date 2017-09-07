
const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
    .options({
        address: {
            describe: 'Enter address for which you want weather',
            demand: true,
            alias: 'a',
            string: true
        }
    })
    .help()
    .argv;


var encodedAddress = encodeURIComponent(argv.address);
var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(url).then((response) => {
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var address = response.data.results[0].formatted_address;
    var weatherUrl = `https://api.darksky.net/forecast/d26d3f6e81b1d56c56524de52299c6d4/${latitude},${longitude}`
    console.log(address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`Current temperature is ${temperature} F. But feels like ${apparentTemperature} F`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect...');
    } else {
        console.log(e.message);
    }
});