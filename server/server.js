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
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome'
    }) ;

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text:'A new user joined'
    })
    socket.on('disconnect', (socket) => {
        console.log('client disconnected')
    });

    socket.on('createMessage',function(message){
        console.log('new message',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt : new Date().getTime()
        })
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.txt,
        //     createdAt: new Date().getTime()
        // })
    })
    
}


);



app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
})

