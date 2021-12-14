const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

// Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewDirectory);
hbs.registerPartials(partialsDirectory);

// Setup static directory to serve
app.use(express.static(publicDirectory));


app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather',
        'name': 'Pavani'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About me',
        'name': 'Pavani'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'name': 'Pavani',
        'message': 'Contact me : help@gmail.com'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            'error': 'You must provide an address'
        });
    };
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecasrdata) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                'Location': location,
                'Forecast': forecasrdata,
                'address': req.query.address
            });
        });
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            'error': 'You must provide a address term'
        });
    };
    console.log(req.query.search)
    res.send({
        'products': []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': '404',
        'name': 'Pavani',
        'errorMessage': 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': '404',
        'name': 'Pavani',
        'errorMessage': 'Page Not found'
    });
})

app.listen(port, () => {
    console.log('listening at' + port);
})