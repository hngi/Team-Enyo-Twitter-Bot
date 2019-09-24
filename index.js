'use strict'

var express = require('express')
const handlebars = require('express-handlebars')

var app = express()
var port = process.env.PORT || 8081

app.engine('html', handlebars({
    defaultLayout: 'main',
    extname: '.html'
}))
app.set('view engine', 'html')

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/signup', function(req, res) {
    res.render('signup', { layout: false })
})

app.get('/authenticate', function(req, res) {
    res.render('authenticate', { layout: false })
})

app.use(express.static('public/'));

app.listen(port, function() {
    console.log(`Server listening on http://localhost:${port}`)
})