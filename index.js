var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())


// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})

var token = "EAAEgEMhLmvEBAFjRhe0m1EI42BT5VZCTUawwZCkI6Xc3JDePtSZBPOHf2rRQGxaTEozlZBIG4asBZA6JMYUXL44sR9UuJzDM3ZB8Sep8sUZBT7GmAkPsv7nACZApUrJ7N0WmovHxBfiQ4zAyEuHfi3UJ3aAJk4JA5zkZD"


// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})