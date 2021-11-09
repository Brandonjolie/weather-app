console.log('Client side java script')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "loading"
    messageTwo.textContent = ""
    // http://localhost:5000/weather?address= http://api.weatherstack.com/current?access_key=1124da7946c1973c950af00afd3d091f&query=
    fetch(`http://api.weatherstack.com/current?access_key=1124da7946c1973c950af00afd3d091f&query=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error.info
                messageTwo.textContent = ""
            }
            else {
                messageOne.textContent = `Location: ${data.location.name} ${data.location.country} ${data.location.region}`
                messageTwo.textContent = `Forecast: ${data.current.weather_descriptions[0]}`
            }
        }
        )
    })
})

// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const location = search.value
//     messageOne.textContent = "loading"
//     messageTwo.textContent = ""
//     //  http://api.weatherstack.com/current?access_key=1124da7946c1973c950af00afd3d091f&query=
//     fetch(`http://localhost:5000/weather?address=${location}`).then((response) => {
//         response.json().then((data) => {
//             if (data.error) {
//                 messageOne.textContent = data.error.info
//                 messageTwo.textContent = ""
//                 console.log(data)
//             }
//             else {
//                 messageOne.textContent = `Location: ${data.location}`
//                 messageTwo.textContent = `Forecast: ${data.forecast_data}`
//                 console.log(data)
//             }
//         }
//         )
//     })
// })