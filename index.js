const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'tmp/' })
const tmpDir = __dirname + '/tmp'
const uploadDir = __dirname + '/public/uploads'

app.use(bodyParser.json())
app.use(express.static('public'))

const messages = []
const users = []
const usersOnline = []

app.get('/', (req, res) => res.status(200).json({
  users: users,
  messages: messages
}))

app.post('/message', (req, res) => {
  const message = req.body
  
  if (!message.name || !message.text) {
    res.sendStatus(500)
  } else {
    messages.push({ name: message.name, text: message.text })
    res.sendStatus(200)
  }
})

app.post('/user', (req, res) => {
  const user = req.body

  if (!user.name) {
    res.sendStatus(500)
  } else {
    users.push(user.name)
    res.sendStatus(200)
  }
})
app.delete('/user/:name', (req, res) => {
  const user = req.params.name

  if (users.includes(user)) {
    users.splice(users.indexOf(user), 1)
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

// upload files
app.post('/files', upload.single('image'), (req, res) => {
  const file = req.file
  const fileType = file.mimetype.split('/')
  const validTypes = ['svg+xml', 'png', 'gif', 'jpeg']

  if (file.size > 1000000) {
    delBadFile(file.filename)
    res.status(500).json({
      type: 'error',
      message: 'Файл слишком большой'
    })
  }
  if (fileType[0] !== 'image') {
    delBadFile(file.filename)
    res.status(500).json({
      type: 'error',
      message: 'Загружать можно только изображения'
    })
  }
  if (validTypes.includes(fileType[1])) {
    fs.renameSync(tmpDir + '/' + file.filename, uploadDir + '/' + file.originalname)
    res.status(200).json({
      type: 'success',
      message: 'Изображение загружено',
      path: '/uploads/' + file.originalname
    })
  } else {
    delBadFile(file.filename)
    res.status(500).json({
      type: 'error',
      message: 'недопустимый формат изображения'
    })
  }
})

function delBadFile(fileName) {
  fs.unlinkSync(tmpDir + '/' + fileName)
}

// Web Socket
wss.on('connection', (ws) => {
  ws.send(JSON.stringify({
    action: 'sendData',
    payload: {
      users: usersOnline,
      messages: messages
    }
  }))

  ws.on('message', function incoming(msg) {
    ws.send(JSON.stringify(messages))
    msg = JSON.parse(msg)

    // Get Message
    if(msg.action === 'message') {
      if (msg.payload.text.length === 0 || msg.payload.text.length > 512) {
        ws.send(JSON.stringify({
          action: 'sendStatus',
          payload: {
            type: 'error',
            msg: 'Плохое сообщение'
          }
        }))
        return
      }
      messages.push({
        date: new Date(Date.now()),
        name: msg.payload.name,
        text: msg.payload.text,
        type: msg.payload.type
      })
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            action: 'sendData',
            payload: {
              users: usersOnline,
              messages: messages
            }
          }))
        }
      })
    }

    // Get new user
    if (msg.action === 'register') {
      const notUnique = users.find(user => {
        return user.login === msg.payload.login
      })
      if (notUnique || msg.payload.login.length === 0 || msg.payload.login.length > 128) {
        ws.send(JSON.stringify({
          action: 'sendStatus',
          payload: {
            type: 'error',
            msg: 'Плохой Логин'
          }
        }))
        return 
      }
      if (msg.payload.password.length < 6 || msg.payload.password.length > 128) {
        ws.send(JSON.stringify({
          action: 'sendStatus',
          payload: {
            type: 'error',
            msg: 'Плохой Пароль'
          }
        }))

        return 
      }

      const newUser = {
        loginTime: new Date(Date.now()),
        login: msg.payload.login,
        password: msg.payload.password,
        name: msg.payload.name
          ? msg.payload.name
          : msg.payload.login,
        avatar: msg.payload.avatar
          ? msg.payload.avatar
          : 'https://robohash.org/' + msg.payload.login
      }
    
      users.push(newUser)
      usersOnline.push({
        name: newUser.name,
        login: newUser.login,
        avatar: newUser.avatar
      })
      ws.send(JSON.stringify({
        action: 'sendStatus',
        payload: newUser
      }))
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            action: 'sendData',
            payload: {
              users: usersOnline,
              messages: messages
            }
          }))
        }
      })
    }

    if (msg.action === 'login') {
      // msg.payload.login
      // msg.payload.password

      const userIndex = users.findIndex(user => user.login === msg.payload.login)

      if (userIndex < 0) {
        ws.send(JSON.stringify({
          action: 'sendStatus',
          payload: {
            type: 'error',
            msg: 'Пользователь не найден'
          }
        }))
      } else if (users[userIndex].password !== msg.payload.password) {
        ws.send(JSON.stringify({
          action: 'sendStatus',
          payload: {
            type: 'error',
            msg: 'Неправильный пароль'
          }
        }))
      } else {
        const loginUser = {
          name: users[userIndex].name,
          login: users[userIndex].login,
          avatar: users[userIndex].avatar
        }
        usersOnline.push(loginUser)
        ws.send(JSON.stringify({
          action: 'sendStatus',
          payload: loginUser
        }))
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              action: 'sendData',
              payload: {
                users: usersOnline,
                messages: messages
              }
            }))
          }
        })
      }
    }
    if (msg.action === 'logout') {
      const userIndex = usersOnline.findIndex(user => user.login === msg.payload.login)
      if (userIndex >= 0) {
        usersOnline.splice(userIndex, 1)
        ws.send(JSON.stringify({
          action: 'sendStatus',
          payload: {
            type: 'success',
            msg: 'Вы вышли из чата'
          }
        }))
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              action: 'sendData',
              payload: {
                users: usersOnline,
                messages: messages
              }
            }))
          }
        })
      }
    }
  })
})

app.listen(3000, '0.0.0.0')