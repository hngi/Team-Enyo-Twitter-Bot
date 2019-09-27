const Twitter = require('twitter')

var TBot = new Twitter({
    consumer_key: 'SJSNgzKaMflk19NryzNuUs9gF',
    consumer_secret: 'lK8AUYagdeuOXx8Z8VsV7iJOY4BdaAde8pbfojiEdnT2nSXnQ3',
    access_token_key: '1135870293690507264-x6HRGbiyC7vYjDYaj7aI2rkpqTdcQd',
    access_token_secret: 'WIQ6oWUIEKDNGtmdp5GmWWC80XodKmFkr9GnAxwmiWffk'
});

TBot.post('oauth/access_token', {
  oauth_verifier : 'DB3KC5huVq0fd7X44nw7aNw2ksxcfdRL'
}, (err, data, response) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(data)
})

