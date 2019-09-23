require('dotenv').config()

const Twitter = require('twitter')

const { Datastore } = require('@google-cloud/datastore')
const projectId = process.env.GDS_PROJECT_ID
const GDS = new Datastore({ projectId })

var TBot = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

TBot.get('search/tweets', {
    q: process.env.HASH_TAG_TO_FIND,
    count: 10,
    result_type: 'recent',
    lang: 'en'
}, (err, data, response) => {
    if (err) {
        console.log(err);
        return
    }

    data.statuses.forEach((status, index) => {
        // Store data
    })
})