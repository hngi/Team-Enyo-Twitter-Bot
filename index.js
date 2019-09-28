'use strict'

const express = require('express')
var session = require('express-session')
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

var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy;


var flash = require('express-flash')

app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


passport.use(new TwitterStrategy({
        consumerKey: 'SJSNgzKaMflk19NryzNuUs9gF',
        consumerSecret: 'lK8AUYagdeuOXx8Z8VsV7iJOY4BdaAde8pbfojiEdnT2nSXnQ3',
        passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, cb) {
        auth.new_twitter_account(profile.id, profile.username, profile.displayName, req.session.user.id).then((response) => {
            console.log(response)
            return cb();
        })
    }
));

function auth1(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/signin');
}

function auth2(req, res, next) {
    if (!req.session.user) {
        return next();
    }
    res.redirect('/profile');
}

app.use(express.static('public/'));

app.get('/signout', function(req, res, next) {
    req.session.destroy(function(err) {
        res.redirect('/signin');
    })
})

app.get('/', function(req, res, next) {
    res.render('index', { layout: false })
})

app.get('/signin', auth2, function(req, res) {
    res.render('signin', { layout: false })
})

app.get('/signup', auth2, function(req, res) {
    res.render('signup', { layout: false })
})


app.post('/signin', auth2, function(req, res) {
    var check = auth.check_params(req.fields, ['email', 'password'])
    if (!check.status) { res.end(JSON.stringify(check)) }
    var data = check.data
    var client = auth.connect_db()
    auth.signin(client, data.email, data.password).then(response => {
        req.session.user = response.data
        res.end(JSON.stringify(response))
    })
})

app.post('/signup', auth2, function(req, res) {
    var check = auth.check_params(req.fields, ['firstname', 'lastname', 'email', 'password'])
    if (!check.status) { res.end(JSON.stringify(check)) }
    var data = check.data
    var client = auth.connect_db()
    auth.signup(client, data.firstname, data.lastname, data.email, data.password).then(response => {
        res.end(JSON.stringify(response))
    })
})

app.get('/auth/twitter', auth1, passport.authenticate('twitter'));

app.get('/auth/callback', auth1, passport.authenticate('twitter', { failureRedirect: '/profile' }), function(req, res) {
    res.redirect('/profile');
});


app.get('/profile', auth1, function(req, res) {
    res.render('profile', { layout: false })
})

app.get('/authenticate', auth1, function(req, res) {
    res.render('authenticate', { layout: false })
})

app.listen(port, function() {
    console.log(`Server listening on http://localhost:${port}`)
})