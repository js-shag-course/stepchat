const express = require('express')
const app = express()

const users = []

app.listen(3000)

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send('stepchat api v0.0.2 ' + req.params.id)
})

app.get('/users', function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(users))
})

app.post('/users', function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log(req)
    res.end(JSON.stringify(req.body))
})


