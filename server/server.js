const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '/../public')

var app = new express();
var server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected')
    socket.on('disconnect', (socket) => {
        console.log('client disconnected')
    })
}


);



app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
})

