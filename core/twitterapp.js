const Twitter = require('twitter')

var TBot = new Twitter({
    consumer_key: 'SJSNgzKaMflk19NryzNuUs9gF',
    consumer_secret: 'lK8AUYagdeuOXx8Z8VsV7iJOY4BdaAde8pbfojiEdnT2nSXnQ3',
    access_token_key: '1135870293690507264-x6HRGbiyC7vYjDYaj7aI2rkpqTdcQd',
    access_token_secret: 'WIQ6oWUIEKDNGtmdp5GmWWC80XodKmFkr9GnAxwmiWffk'
});

async function get_auth_token() {
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
    
    return await request(options, function(error, response, data) {
      console.log(data.split('&')[0]);
    })
}

async function hh() {
	f = await get_auth_token()
	console.log(f)
}

hh()