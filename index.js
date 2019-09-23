const http = require("http")
const express = require('express')
const fs = require("fs")

const app = express()
const port = process.env.PORT || 8081

require('dotenv').config()


app.get('/', function(request, response) {
    fs.readFile(`${process.env.VIEWS_DIR}/index.html`, 'utf8', function(err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(data)
    })
})

app.listen(port, function() {
    console.log(`Server running at http://127.0.0.1:${this.address().port}/`)
})