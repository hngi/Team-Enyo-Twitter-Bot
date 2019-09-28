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
        consumerSecret: 'lK8AUYagdeuOXx8Z8VsV7iJOY4BdaAde8pbfojiEdnT2nSXnQ3'
    },
    function(token, tokenSecret, profile, cb) {
        auth.new_twitter_account(profile.id, profile.username, profile.displayName, 10).then((response) => {
            return cb();
        })
    }
));

app.use(express.static('public/'));

app.get('/', function(req, res, next) {
    res.render('index', { layout: false })
})

// app.use(function(req, res, next) {
//     if (req.session.user) {
//         res.redirect('/profile')
//     }
//     next()
// })

app.get('/signin', function(req, res) {
    res.render('signin', { layout: false })
})

app.get('/signup', function(req, res) {
    res.render('signup', { layout: false })
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

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/profile');
});


app.get('/profile', function(req, res) {
    res.render('profile', { layout: false })
})

app.get('/authenticate', function(req, res) {
    res.render('authenticate', { layout: false })
})



app.listen(port, function() {
    console.log(`Server listening on http://localhost:${port}`)
})