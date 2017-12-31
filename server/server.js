const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')
const {generateMessage , generateLocationMessage} = require('./utils/message.js')

const publicPath = path.join(__dirname, '/../public')

var app = new express();
var server = http.createServer(app);
const port = process.env.PORT || 3001;
var io = socketIO(server);
console.log('before establishing connection')
io.on('connection', (socket) => {
    console.log('new user connected')
    socket.emit('newMessage',generateMessage('Admin','Welcome')) ; 

    socket.broadcast.emit('newMessage',generateMessage('Admin','A new user joined'));

    socket.on('disconnect', (socket) => {
        console.log('client disconnected')
    });

    socket.on('createMessage',function(message , callback){
        console.log('new message',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.txt,
        //     createdAt: new Date().getTime()
        // })
    }) ; 

    socket.on('createLocationMessage',function(coords){
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude , coords.longitude))
    })
    
}


);



app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
})

