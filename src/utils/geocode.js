const request = require("request")
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmpvbGllIiwiYSI6ImNrdm1vdjZ6OWNneHUyb3Q5NmI5a2Z5NDIifQ.eNyIi0vq2JsA-9HonYYBTQ&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback('Unable to connect to location services', undefined)
        else if (body.message === 'Not Found')
            callback('Unable to find location, try somewhere else', undefined)
        else {
            callback(undefined, body.features[0])
        }
    })
}

module.exports = geocode