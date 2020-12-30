const path= require("path");
const express= require('express');
const http= require('http');

const socketIO= require('socket.io');

const publicPath= path.join(__dirname , "/../public");

const port= process.env.PORT || 3000;

let app= express();
let server= http.createServer(app);

let io= socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log("A new user has joined / connected ");

    socket.on('disconnect',()=>{
        console.log("User disconnected");
    })
});



server.listen(port, ()=>{
    console.log("Listening to server");
})


