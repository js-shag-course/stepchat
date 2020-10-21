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
  const msg = {
    action: '', // message, userIn, UserOut
    payload: {
      // something
    }
  }
  ws.on('message', function incoming(msg) {
    // messages.push({ name: 'socket-user', text: message })
    // console.log(message)
    // ws.send(JSON.stringify(messages))
    ws.send(JSON.stringify(messages))
    msg = JSON.parse(msg)

    if(msg.action === 'message') {
      if (msg.payload.text.length === 0 || msg.payload.text.length > 512) {
        ws.send(JSON.stringify({
          type: 'error',
          msg: 'Плохое сообщение'
        }))
        return new Error('bad msg')
      }
      messages.push({
        date: new Date(Date.now()),
        name: msg.payload.name,
        text: msg.payload.text,
        type: msg.payload.type
      })
      ws.send(JSON.stringify(messages))
    }

    if (msg.action == 'userIn') {
      if (msg.payload.login.length === 0 || msg.payload.login.length > 128) {
        ws.send(JSON.stringify({
          type: 'error',
          msg: 'Плохой Логин'
        }))
        return new Error('bad login')
      }
      if (msg.payload.password.length < 6 || msg.payload.password.length > 128) {
        ws.send(JSON.stringify({
          type: 'error',
          msg: 'Плохой пароль'
        }))
        return new Error('bad password')
      }

      users.push({
        loginTime: new Date(Date.now()),
        login: msg.payload.login,
        password: msg.payload.password,
        name: msg.payload.name,
        avatar: msg.payload.avatar,
      })
    }

    if (msg.action == 'userOut') {

    }

  })
})

app.listen(3000, '0.0.0.0')