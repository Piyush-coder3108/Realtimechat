const path= require("path");
const express= require('express');
const http= require('http');

const socketIO= require('socket.io');

const users={};
const publicPath= path.join(__dirname , "/../public");

const port= process.env.PORT || 3000;

let app= express();
let server= http.createServer(app);

let io= socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    // console.log("A new user has joined / connected ");
    
    


    // socket.on('createMessage',(message)=>{
    //     console.log(`Received message is from: ${message.from} and message is: ${message.text}`);
    //     socket.broadcast.emit('newMessage',{
    //         from: message.from,
    //         text: "New user Joined the chat",
    //         createdat: new Date().getTime()
    //     })
    // });

    // socket.on('disconnect',()=>{
    //     console.log("User disconnected");
    // })

    socket.on('new-user-joined',name =>{
        // console.log("User joined is :",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });


    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

});



server.listen(port, ()=>{
    console.log("Listening to server");
})


