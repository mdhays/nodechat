'use strict'

const express = require('express')
const app = express()
const pg = require('pg').native
const server = require('http').createServer(app)
const ws = require('socket.io')(server)

const PORT = process.env.PORT || 3000
const POSTGRES_URL = process.env.POSTGRES_URL
  || 'postgres://localhost:5432/nodechat'

let db

app.set('view engine', 'jade')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/chats', (req, res) => {
  db.query('SELECT * FROM chats', (err, result) => {
    if (err) throw err

    res.send(result.rows)
  })
})

pg.connect(POSTGRES_URL, (err, client) => {
  if (err) throw err

  db = client

  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
  })
})

ws.on('connection', socket => {
  console.log('socket connected')

  socket.on('sendChat', msg => {
    console.log(msg)
    socket.broadcast.emit('receiveChat', msg)
  })
})



