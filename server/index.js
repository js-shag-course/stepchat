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


let chats = []

app.get('/chats', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(chats))
    
})

app.get('/chats/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    
    try{
        let chat = chats.find(chat => {
            return chat.id === Number(req.params.id)
        })
        if(!chat) throw new Error('there is no such chat')
        res.send(JSON.stringify(chat))
    }
    catch(err){
        res.status(500).send(`Error: ${err.message}`)
    }
})

app.put('/chats/:id', (req, res) => {
    try{
        let chat = chats.find(chat => {
            return chat.id === Number(req.params.id)
        })
        if(!chat) throw new Error('there is no such chat')

        if (req.body.title) chat.title = req.body.title
        if (req.body.users) { req.body.users.forEach(element => { chat.users.push(element) })}
        if (req.body.admins) { req.body.admins.forEach(element => { chat.admins.push(element) })}
        if (req.body.messages) { req.body.messages.forEach(element => { chat.messages.push(element) })}

        res.sendStatus(200)
    }
    catch(err){
        res.status(500).send(`Error: ${err.message}`)
    }
})

app.delete('/chats/:id', (req, res) => {
    try{
        let chat = chats.find(chat => {
            return chat.id === Number(req.params.id)
        })
        if(!chat) throw new Error('there is no such chat')

        chats = chats.filter(chat => {
            return chat.id !== Number(req.params.id)
        })
        res.status(200).send(chat)
    }
    catch(err){
        res.status(500).send(`Error: ${err.message}`)
    }
})


app.post('/chats', (req, res) => {
    try{
        if(req.body.title &&
            req.body.users &&
            req.body.admins &&
            req.body.messages // need to add other conditions
        ){
            let chat = {
                id: ++chatsIdIncrementer,
                title: req.body.title,
                users: req.body.users,
                admins: req.body.admins,
                messages: req.body.messages
            }
            chats.push(chat)
            res.status(200).send(JSON.stringify(chat))
        } else throw new Error('some of the options are empty')
    }
    catch(err){
        res.status(500).send(`Error: ${err.message}`)
    }
})
module.exports.chats = chats


let users = []
module.exports.users = users

app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(users))
})

app.get('/users/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    
    try{
        let user = users.find(user => {
            return user.id === Number(req.params.id)
        })
        if(!user) throw new Error('there is no such user')
        res.send(JSON.stringify(user))
    }
    catch(err){
        res.status(500).send(`Error: ${err.message}`)
    }

    /* for filter
    res.send(JSON.stringify(users.find(user => {
        return user.id === Number(req.query.id) || user.name === req.query.name
    }))) */
})

app.put('/users/:id', (req, res) => {
    try{
        let user = users.find(user => {
            return user.id === Number(req.params.id)
        })
        if(!user) throw new Error('there is no such user')

        if (req.body.userName) user.userName = req.body.userName
        if (req.body.password) user.password = req.body.password
        if (req.body.friends) { req.body.friends.forEach(element => { user.friends.push(element) })}
        if (req.body.chats) { req.body.chats.forEach(element => { user.chats.push(element) })}

        res.sendStatus(200)
    }
    catch(err){
        res.status(500).send(`Error: ${err.message}`)
    }
})

app.delete('/users/:id', (req, res) => {
    try{
        let user = users.find(user => {
            return user.id === Number(req.params.id)
        })
        if(!user) throw new Error('there is no such user')

        users = users.filter(user => {
            return user.id !== Number(req.params.id)
        })
        res.status(200).send(user)
    }
    catch(err){
        res.status(500).send(`Error: ${err.message}`)
    }
})

app.post('/users', (req, res) => {
    try{
        if(req.body.userName &&
            req.body.password &&
            req.body.friends &&
            req.body.chats // need to add other conditions
        ){
            let user = {
                id: ++usersIdIncrementer,
                userName: req.body.userName,
                password: req.body.password,
                friends: req.body.friends,
                chats: req.body.chats
            }
            users.push(user)
            res.status(200).send(JSON.stringify(user))
        } else throw new Error('some of the options are empty')
    }
    catch(err){
        res.status(500).send(`Error: ${err.message}`)
    }
})

app.get('/chats/getMessages',(req,res) =>{
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(chats[Number(req.query.id)].messages))
})
app.listen(port, () => {
    console.log('server strting on port ' + port);
})