const Twitter = require('twitter')

var TBot = new Twitter({
    consumer_key: 'SJSNgzKaMflk19NryzNuUs9gF',
    consumer_secret: 'lK8AUYagdeuOXx8Z8VsV7iJOY4BdaAde8pbfojiEdnT2nSXnQ3',
    access_token_key: '1135870293690507264-fcXlej3Z44ZVcDSMsITKjsKVAkGisV',
    access_token_secret: 'RlqL9ilH1X2fRDQZ4DN09qq8dGtnvpQUwi0AhlBA717iD'
});



// async function search_tweets(hashtag) {
//     TBot.get('search/tweets', {
//         q: "#teamEnyo",
//         count: 10,
//         result_type: 'recent',
//         lang: 'en'
//     }, (err, data, response) => {
//     	console.log(data)
//     })
// }

// async function get_tweets(user_id) {
//     try{
//     	f = await TBot.get('statuses/home_timeline', { user_id })
//     	console.log(f)
//     }catch(e){
//     	console.log(e)
//     }
// }

// get_tweets(1135870293690507264)


module.exports = { TBot }