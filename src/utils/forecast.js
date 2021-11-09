const request = require('request')
const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1124da7946c1973c950af00afd3d091f&query=${address}`
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
            console.log(data)
        }
    })
}

module.exports = forecast