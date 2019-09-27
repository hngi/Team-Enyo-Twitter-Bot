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

async function query(client, sql, params) {
    try {
        q = {
            name: Date.now().toString(),
            text: sql,
            values: params,
        }

        return await client.query(q)
    } catch (e) {
        console.log('Error 2')
    }

}

async function signup(client, firstname, lastname, email, password) {
    res = await query(client, 'select * from public.users where email = $1', [email])
    if (res.rows.length > 0) {
        return {
            status: false,
            message: 'This email has been used to open an account on this platform'
        }
    }
    params = [firstname, lastname, email, await bcrypt.hash(password, 10)]
    await query(client, 'INSERT INTO users (firstname,lastname,email, passwordhash) VALUES ($1, $2, $3, $4)', params)
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
    res = await query(client, 'select * from public.users where email = $1', [email])
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

module.exports = { connect_db, signin, signup, check_params }

// client = connect_db();
// // signup(client,'Claret','Nnamocha','devclareo@gmail.com','Alpha').then(response => {
// // 	console.log(response)
// // })
// signin(client,'devclareo@gmail.com', 'Alpha').then(response => {
// 	console.log(response)
// })