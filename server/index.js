const 
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 3000,
    validation = require('./validation')
;

// crutches

let chatsIdIncrementer = 0,
    usersIdIncrementer = 0;

// /crutches

// post body settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



/* chat example

 {
    "id": 1,
	"participants": [
			{
					"id": 2,
					"name": "name"
			}
	],
	"admins": [
			{
					"id": 2,
					"name": "name"
			}
	],
	"messagesHistory": [
			{
					"sender": {
							"id": 2,
							"name": "name"
					},
					"timeOfSend": "12:31:2020 PM 12:00",
					"messageBody": "Hello World!!!"
			}
	]
}

*/

const chats = []

app.get('/chats', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(chats))
    
})

app.get('/chats/filter', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    // request url example       
    //  chats/filter?id=104

    res.send(JSON.stringify(chats.find(chat => {
        return chat.id === Number(req.query.id)
    })))
})


app.post('/chats', (req, res) => {
    chats.push({
        id: ++chatsIdIncrementer,
        participants: req.body.participants,
        admins: req.body.admins,
        messagesHistory: req.body.messagesHistory
    })
    res.sendStatus(200)
})
module.exports.chats = chats



/* user example

    {
        "id": 1,
        "name": "name",
        "password": "secretPassword",
        "friends": [
            {
                "id": 1,
                "name": "name"
            }
        ],
        "chats": [
            {
                "id": 1
            },
            {
                "id": 2
            },
            {
                "id": 3
            }
        ]
    }

*/

const users = []
module.exports.users = users

app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(users))
})

app.get('/users/filter', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    // request url example       
    //  users/filter?name=Name&id=104
    res.send(JSON.stringify(users.find(user => {
        return user.id === Number(req.query.id) || user.name === req.query.name
    })))
})
app.post('/users', (req, res) => {
    users.push({
        id: ++usersIdIncrementer,
        name: req.body.name,
        password: req.body.password, // I think need to use base64
        friends: req.body.friends,
        chats: req.body.chats
    })
    res.sendStatus(200)
})

app.get('/chats/getMessages',(req,res) =>{
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(chats[Number(req.query.id)].messagesHistory))
})
app.listen(port, () => {
    console.log('server strting on port ' + port);
})