const bcrypt = require('bcrypt')
const { Client } = require('pg')

function connect_db() {
    try {
        const client = new Client({
            user: 'bekcbtslclxxpu',
            host: 'ec2-54-246-92-116.eu-west-1.compute.amazonaws.com',
            database: 'd1f4td59bqc51g',
            password: 'ae6977e963357480a401a21cef24de9450ffa7d5b9013f4d7cd28d3582435e3a',
            port: 5432,
            ssl: true,
        })
        client.connect()
        return client
    } catch (e) {
        console.log('Error 1')
    }
}

async function exec_query(client, sql, params) {
    try {
        q = {
            name: Date.now().toString(),
            text: sql,
            values: params,
        }

        return await client.query(q)
    } catch (e) {
        console.log(e)
        return false
    }finally{
        client.end();
    }

}

async function signup(client, firstname, lastname, email, password) {
    res = await exec_query(client, 'select * from public.users where email = $1', [email])
    if (res.rows.length > 0) {
        return {
            status: false,
            message: 'This email has been used to open an account on this platform'
        }
    }
    params = [firstname, lastname, email, await bcrypt.hash(password, 10)]
    await exec_query(client, 'INSERT INTO users (firstname,lastname,email, passwordhash) VALUES ($1, $2, $3, $4)', params)
    return {
        status: true,
        message: 'Registration successful!'
    }
}

async function signin(client, email, password) {
    failed = {
        status: false,
        message: 'Login failed'
    }
    res = await exec_query(client, 'select * from public.users where email = $1', [email])
    if (res.rows.length != 1) {
        return failed
    }
    user = res.rows[0]
    if (!(await bcrypt.compare(password, user.passwordhash))) {
        return failed;
    }
    delete user.passwordhash
    return {
        status: true,
        message: 'Login successful',
        data: user
    }
}

function check_params(request, params) {
    p = {}
    for (var param of params) {
        if ((!request.hasOwnProperty(param))) {
            return {
                status: false,
                message: `${param} is required!`
            }
            break
        }
    	value = request[param].trim()
    	if ((!value || value == undefined || value == "" || value.length == 0)) {
    		return {
                status: false,
                message: `${param} is required!`
            }
    	}
        p[param] = request[param]
    }
    return {
    	status: true,
    	message: 'All clear',
    	data: p
    }
}

async function new_twitter_account(id,display_name,full_name,user_id) {
    client = connect_db()
    sql = 'INSERT INTO twitter_accounts (id,displayname,fullname,user_id) VALUES ($1,$2,$3,$4)'
    params = [ id,display_name,full_name,user_id ]
    stored = await exec_query(client, sql, params)
    if (stored == false) {
        return{
            status: false,
            message: 'Data not stored!'
        }
    }
    return {
        status: true,
        message: 'Data stored!'
    }
}

async function get_twitter_accounts(user_id) {
    client = connect_db()
    sql = 'select * from twitter_accounts where user_id = $1'
    params = [ user_id ]
    query = await exec_query(client, sql, params)
    if (query.rows.length < 1) {
        return {
            status: false,
            message: 'No accounts found!'
        }
    }
    accounts = query.rows
    return {
        status: true,
        message: 'Acount(s) found!!',
        data: accounts
    }
}

async function get_tweets(user_id) {
    client = connect_db()
    sql = 'select * from tweets where account_id = $1'
    params = [ user_id ]
    query = await exec_query(client, sql, params)
    if (query.rows.length < 1) {
        return {
            status: false,
            message: 'No tweets found!',
            data: []
        }
    }
    accounts = query.rows
    return {
        status: true,
        message: 'Tweets(s) found!!',
        data: accounts
    }   
}

async function add_tweet(tweet,user_id) {
    client = connect_db()
    params = [tweet.id,tweet.text,tweet.created_at, user_id]
    sql = 'INSERT INTO tweets (id,text,createdon, account_id) VALUES ($1, $2, $3, $4)'
    q = await exec_query(client, sql, params)
    if (!q) {
        return{            
            status: false,
            message: 'Tweet could not be saved!'
        }
    }
    return {
        status: true,
        message: 'Tweet saved successfully!'
    }
}

async function update_tweets(all_tweets, user_id) {
    p_tweets = await get_tweets(user_id)
    p_tweets = p_tweets.data
    stored_count = 0
    new_count = 0
    for (tweet of all_tweets) {
        if (!p_tweets.includes(tweet)) {
            new_count += 1
            added = await add_tweet(tweet,user_id)
            if (added.status) { stored_count += 1 }
        }
    }
    return {
        status: false,
        message: `Update complete!\nAll records: ${new_count}\nNew (recently stored) reords : ${stored_count}`
    }
}

module.exports = { connect_db, signin, signup, check_params, new_twitter_account, get_twitter_accounts, get_tweets, update_tweets }

// client = connect_db();
// // signup(client,'Claret','Nnamocha','devclareo@gmail.com','Alpha').then(response => {
// // 	console.log(response)
// // })
// signin(client,'devclareo@gmail.com', 'Alpha').then(response => {
// 	console.log(response)
// })