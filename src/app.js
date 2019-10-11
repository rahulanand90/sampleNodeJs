const express = require('express')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
const path = require('path')
const app = express()
const public_dir = path.join(__dirname, '../public')
const hbs = require('hbs')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
app.set('views', viewPath)
app.set('view engine', 'hbs') //view engine
app.use(express.static(public_dir))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App main page'
    })
})

app.get('/help', (req, res) => {
    res.send('Hello World -> Help Page!')
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App About page'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        console.log(req.query.address);
        return res.send({
            error: 'some error'
        })
    }
    geoCode.geoCode(req.query.address, (error, {lat, log, loc} = {})  => {
        if (error){
            return res.send({error: 'some error'})
        }
        
        forecast.forecast(lat, log, (error, forecastData) => {
            if (error){
                return res.send({error: 'some error 2'})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
            
        })
    })
    res.send({
        weather: 'some weather',
        location : 'some location'
    })
})

app.get('/help/*', (req, res) => {
    res.send('My 404 Page but for help')
})

app.get('*', (req, res) => {
    res.send('My 404 Page')
})


//for starting server
app.listen(3000, () => {
    console.log('server is running on port 3000')
})

