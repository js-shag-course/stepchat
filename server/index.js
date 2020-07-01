const
  express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const validation = require('./validation')
const shortid = require('shortid')
const passwordEncrypt = require('./passwordEncryption')

// post body settings
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let chats = []
let users = []

app.get('/chats', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(chats))
})

app.get('/chats/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  try {
    const chat = chats.find(chat => {
      return chat.id === req.params.id
    })
    if (!chat) throw new Error('there is no such chat')
    res.send(JSON.stringify(chat))
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }
})

app.put('/chats/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const chat = chats.find(chat => {
      return chat.id === req.params.id
    })
    if (!chat) throw new Error('there is no such chat')

    if (req.body.title) chat.title = req.body.title
    if (req.body.users) {
      req.body.users.forEach(element => {
        const user = users.find(user => { return user.id === element })
        if (!user) throw new Error('such user does not exist')
        if (chat.users.find(user => { return user === element })) { throw new Error('this user is already in this group') }
        chat.users.push(element)
        user.chats.push(chat.id)
      })
    }
    if (req.body.admins) {
      req.body.admins.forEach(element => {
        if (!chat.users.find(user => { return user === element })) { throw new Error('there is no such user in this group') }
        if (chat.admins.find(user => { return user === element })) { throw new Error('this user is already an administrator') }
        chat.admins.push(element)
      })
    }
    if (req.body.messages) { req.body.messages.forEach(element => { chat.messages.push(element) }) }

    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }
})

app.delete('/chats/:chatId/users/:userId', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const chat = chats.find(chat => {
      return chat.id === req.params.chatId
    })
    if (!chat) throw new Error('there is no such chat')

    const user = users.find(user => {
      return user.id === req.params.userId
    })
    if (!user) throw new Error('there is no such user')
    if (!chat.users.find(user => { return user === req.params.userId })) { throw new Error('there is no such user in this group') }

    if (chat.admins.includes(user.id)) { chat.admins.splice(chat.admins.indexOf(user.id), 1) }

    chat.users.splice(chat.users.indexOf(user.id), 1)
    user.chats.splice(user.chats.indexOf(chat.id), 1)

    res.status(200).send(JSON.stringify(user))
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }
})

app.delete('/chats/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const chat = chats.find(chat => {
      return chat.id === req.params.id
    })
    if (!chat) throw new Error('there is no such chat')

    chat.users.forEach(element => {
      const user = users.find(user => { return user.id === element })
      user.chats.splice(user.chats.indexOf(chat.id), 1)
    })

    chats = chats.filter(chat => {
      return chat.id !== req.params.id
    })
    res.status(200).send(chat)
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }
})

app.post('/chats', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    req.body.users.forEach(element => {
      const user = users.find(user => { return user.id === element })
      if (!user) throw new Error('such user does not exist')
    })
    req.body.admins.forEach(element => {
      const user = req.body.users.find(user => { return user === element })
      if (!user) throw new Error('there is no such member in this group')
    })
    if (validation.checkLength(req.body.title) && req.body.messages) {
      const chat = {
        id: shortid.generate(),
        title: req.body.title,
        users: req.body.users,
        admins: req.body.admins,
        messages: req.body.messages
      }

      req.body.users.forEach(element => {
        const user = users.find(user => { return user.id === element })
        user.chats.push(chat.id)
      })
      chats.push(chat)
      res.status(200).send(JSON.stringify(chat))
    } else throw new Error('some of the options are empty')
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }
})

app.get('/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(users))
})

app.get('/users/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  try {
    const user = users.find(user => {
      return user.id === req.params.id
    })
    if (!user) throw new Error('there is no such user')
    res.send(JSON.stringify(user))
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }

  /* for filter
    res.send(JSON.stringify(users.find(user => {
        return user.id === Number(req.query.id) || user.name === req.query.name
    }))) */
})

app.put('/users/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const user = users.find(user => {
      return user.id === req.params.id
    })
    if (!user) throw new Error('there is no such user')

    if (req.body.userName) user.userName = req.body.userName
    if (req.body.password) user.password = req.body.password
    if (req.body.friends) {
      req.body.friends.forEach(element => {
        const friend = users.find(friend => { return friend.id === element })
        if (!friend) throw new Error('such friend does not exist')
        if (user.friends.find(friend => { return friend === element })) { throw new Error('this user already has this friend') }
        friend.friends.push(user.id)
        user.friends.push(element)
      })
    }
    if (req.body.chats) {
      req.body.chats.forEach(element => {
        const chat = chats.find(chat => { return chat.id === element })
        if (!chat) throw new Error('such chat does not exist')
        if (user.chats.find(chat => { return chat === element })) { throw new Error('this user is already in this chat') }
        user.chats.push(element)
      })
    }
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }
})

app.delete('/users/:id/friends/:friendId', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const user = users.find(user => {
      return user.id === req.params.id
    })
    if (!user) throw new Error('there is no such user')

    const friend = users.find(friend => {
      return friend.id === req.params.friendId
    })
    if (!friend) throw new Error('there is no such friend')

    user.friends.splice(user.friends.indexOf(friend.id), 1)
    friend.friends.splice(friend.friends.indexOf(user.id), 1)

    res.status(200).send(friend)
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }
})

app.delete('/users/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const user = users.find(user => {
      return user.id === req.params.id
    })
    if (!user) throw new Error('there is no such user')

    user.chats.forEach(element => {
      const chat = chats.find(chat => { return chat.id === element })
      chat.users.splice(chat.users.indexOf(user.id), 1)
    })

    user.friends.forEach(element => {
      const friend = users.find(friend => { return friend.id === element })
      friend.friends.splice(friend.friends.indexOf(element), 1)
    })

    users = users.filter(user => {
      return user.id !== req.params.id
    })
    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }
})

app.post('/users', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    req.body.friends.forEach(element => {
      const user = users.find(user => { return user.id === element })
      if (!user) throw new Error('such friend does not exist')
    })

    req.body.chats.forEach(element => {
      const chat = chats.find(chat => { return chat.id === element })
      if (!chat) throw new Error('such chat does not exist')
    })

    if (req.body.userName && req.body.password) {
      const user = {
        id: shortid.generate(),
        userName: req.body.userName,
        password: await passwordEncrypt.hashPassword(req.body.password),
        friends: req.body.friends,
        chats: req.body.chats
      }

      user.friends.forEach(element => {
        const friend = users.find(friend => { return friend.id === element })
        friend.friends.push(user.id)
      })

      req.body.chats.forEach(element => {
        const chat = chats.find(chat => { return chat.id === element })
        chat.users.push(user.id)
      })
      users.push(user)
      res.status(200).send(JSON.stringify(user))
    } else throw new Error('some of the options are empty')
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }
})

app.get('/chats/messages/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  try {
    const chat = chats.find(chat => {
      return chat.id === req.params.id
    })
    if (!chat) throw new Error('there is no such messages in chat')
    res.send(JSON.stringify(chat.message))
  } catch (err) {
    res.status(500).send(JSON.stringify({ Error: err.message }))
  }
})
app.listen(port, () => {
  console.log('server staring on port ' + port)
})

module.exports.chats = chats
module.exports.users = users
