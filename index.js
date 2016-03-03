'use strict';

const server = require('http').createServer(); // This starts the server using native Node syntax.
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}.`);
});