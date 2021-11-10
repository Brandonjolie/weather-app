const request = require('request')
const api_key = require('./apikey')

const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${address}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            const { current: data } = body
            let return_string = ""
            return_string += `${data.weather_descriptions[0]}.It is currently ${data.temperature} degrees out. There is a ${data.precip}% chance of rain.`
            return_string += `The wind speed is ${data.wind_speed}mph and the humidity is ${data.humidity}%.`
            callback(undefined, { data: return_string, img: data.weather_icons[0] })
        }
    })
}

module.exports = forecast