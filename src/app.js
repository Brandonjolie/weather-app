const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const runPort = process.env.PORT || 5000

const app = express()

// definepaths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Set up static directory to use
app.use(express.static(publicDirectory))

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "No address supplied" })
    } else return forecast(req.query.address, (error, forecast_data) => {
        if (error) {
            return res.send({ error })
        }
        return res.send({
            location: req.query.address,
            forecast_data: forecast_data,
            query: req.query.address
        })
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Brandon"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpmsg: "Hi Brandon.\nThis is help",
        name: "Brandon"
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Brandon"
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: "This help article does not exist",
        name: "Brandon", title: "404"
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please provide a search term"
        })
    }
    res.send({ products: [req.query] })
    console.log(req.query)
})

// 404 handler
app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: "Page not found",
        name: "Brandon", title: "404"
    })
})

app.listen(runPort, () => {
    console.log(`Server is running on port ${runPort}`)
})
