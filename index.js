const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

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
  NameCorrect = true;
  if(users.length!=0){
    console.log('f')
    users.forEach(element => {
      if (element === user.name) {
        NameCorrect = false
      }
    })
  }
  if(NameCorrect == false){
    res.sendStatus(500)
    console.log("false")
  } else {
    users.push(user.name)
    res.sendStatus(200)
    console.log("true")
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

app.listen(3000, '0.0.0.0', () => console.log('>>> Server started'))