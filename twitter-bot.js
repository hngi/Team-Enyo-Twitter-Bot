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
        let id = status.id

        // get details of the post
        TBot.post(`statuses/show`, { id }, (err, details_response) => {
            if (err) {
                console.log(err);
                return
            }

            // save the post
            save_data(details_response.id,details_response)

            // like the post
            TBot.post('favorites/create', { id }, (err, fave_response) => {
                if (err) {
                    console.log(err);
                    return
                }
                let username = fave_response.user.screen_name;
                let tweetId = fave_response.id_str;
                // console.log(`Liked the post https://twitter.com/${username}/status/${tweetId}`)
            })
        })




    })
})

async function save_data(key, value) {

    var gds_key = GDS.key(key);
    var gds_data = value

    const entity = {
        key: gds_key,
        data: gds_data
    }
    await datastore.save(entity);
}