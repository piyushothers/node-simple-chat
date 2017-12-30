var socket = io();

socket.on('connect',function(){
    console.log('connected to the server')
    
});

socket.on('disconnect',function(){
    console.log('disconnected from the server');
});

socket.emit('createMessage',{
    from:'jen@example.com',
    text:'Hey , this is Andrew'
})

socket.on('newMessage',function(msg){
    console.log('new message',msg);
})

