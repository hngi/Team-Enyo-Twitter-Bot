'use strict'

const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const formidableMiddleware = require('express-formidable');

const app = express()
const port = process.env.PORT || 8081

const auth = require('./core/auth')


app.engine('html', handlebars({
    defaultLayout: 'main',
    extname: '.html'
}))

app.set('view engine', 'html')

app.use(formidableMiddleware());

app.get('/', function(req, res, next) {
    res.render('index', { layout: false, link: 'My favorite veggies'})
})

app.get('/signup', function(req, res) {
    res.render('signup', { layout: false })
})
app.get('/signin', function(req, res) {
    res.render('signin', { layout: false })
})

app.post('/signin', function(req, res) {
    var check = auth.check_params(req.fields, ['email', 'password'])
    if (!check.status) { res.end(JSON.stringify(check)) }
    var data = check.data
    var client = auth.connect_db()
    auth.signin(client, data.email, data.password).then(response => {
        res.end(JSON.stringify(response))
    })
})

app.post('/signup', function(req, res) {
    var check = auth.check_params(req.fields, ['firstname', 'lastname', 'email', 'password'])
    if (!check.status) { res.end(JSON.stringify(check)) }
    var data = check.data
    var client = auth.connect_db()
    auth.signup(client, data.firstname, data.lastname, data.email, data.password).then(response => {
        res.end(JSON.stringify(response))
    })
})

app.get('/verified', function(req, res) {
	const request = require('request');
    const options = {
      oauth: {
        consumer_key: 'SJSNgzKaMflk19NryzNuUs9gF',
        consumer_secret: 'lK8AUYagdeuOXx8Z8VsV7iJOY4BdaAde8pbfojiEdnT2nSXnQ3',
        token: '1135870293690507264-x6HRGbiyC7vYjDYaj7aI2rkpqTdcQd',
        token_secret: 'WIQ6oWUIEKDNGtmdp5GmWWC80XodKmFkr9GnAxwmiWffk',
      },
      method: 'post',
      url: 'https://api.twitter.com/account/verify_credentials'
    }    
   	request(options, function(error, response, data) {
    res.render('authenticate', { data })
    })
})

app.get('/profile', function(req, res) {
    res.render('profile', { layout: false })
})

app.get('/authenticate', function(req, res) {
	const request = require('request');
    const options = {
      oauth: {
        consumer_key: 'SJSNgzKaMflk19NryzNuUs9gF',
        consumer_secret: 'lK8AUYagdeuOXx8Z8VsV7iJOY4BdaAde8pbfojiEdnT2nSXnQ3',
        token: '1135870293690507264-x6HRGbiyC7vYjDYaj7aI2rkpqTdcQd',
        token_secret: 'WIQ6oWUIEKDNGtmdp5GmWWC80XodKmFkr9GnAxwmiWffk',
      },
      method: 'post',
      url: 'https://api.twitter.com/oauth/request_token',
      form: {
        'oauth_callback': 'https://enyo-twitter-bot.herokuapp.com/',
      }
    };
    
   	request(options, function(error, response, data) {
    res.render('authenticate', { layout: false, link: data.split('&')[0] })
    })

})

app.use(express.static('public/'));

app.listen(port, function() {
    console.log(`Server listening on http://localhost:${port}`)
})