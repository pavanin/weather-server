const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

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

app.get('weather', (req, res) => {
    res.send('Weather Forecast');
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

app.listen(3000, () => {
    console.log('listening at 3000');
})