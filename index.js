'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const ws = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}.`);
});

ws.on('connection', socket => {
  console.log('connection', socket);

  socket.on('sendChat', msg => {
    console.log(msg)
    socket.broadcast.emit('receiveChat', msg)
  })
});