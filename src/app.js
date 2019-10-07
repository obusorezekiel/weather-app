const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPaths = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



//Setup Handlebars and views

app.set('views', viewsPaths)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))


// Setup static directories
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ezekiel Umesi'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Ezekiel Umesi'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Ezekiel Umesi'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia'
    // })
})

app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})







app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Ezekiel Umesi',
        errorMessage: 'Page Not Found'
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Ezekiel Umesi',
        errorMessage: 'Help Article not found'
    })
})








app.listen(3000, () => {
    console.log('Server is up on Port 3000')
})