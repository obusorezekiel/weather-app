const request = require('request');

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/c1aff6defe822a3d224b2d7bd10a43ea/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to API', undefined)
        }
        else if (body.error) {
            callback('Unable to find Location', undefined)
        }
        else {
            callback(undefined, {
                Success: body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There will be ' + body.currently.precipProbability + '% chance of rain'})
        }


    })
}



module.exports = forecast;