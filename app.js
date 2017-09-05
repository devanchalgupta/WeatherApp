
var yargs = require('yargs');
var geocode = require('./geocode/geocode');
var weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`Current temperature is ${weatherResults.temperature} F. But feels like ${weatherResults.apparentTemperature} F`);
            }
        });
    }
});