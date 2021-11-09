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
    fetch(`http://localhost:5000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error.info
                messageTwo.textContent = ""
                console.log(data)
            }
            else {
                messageOne.textContent = `Location: ${data.location}`
                messageTwo.textContent = `Forecast: ${data.forecast_data}`
                console.log(data)
            }
        }
        )
    })
})