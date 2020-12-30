let socket= io();
var name=prompt("Enter your name");
   socket.on('connect',()=>{
       console.log("connected");

       socket.emit('createMessage',{
           from: name,
           text : "Hello Buddies"
       })
   });

   socket.on('disconnect',()=>{
       console.log("disconnected");
   });

   socket.on('newMessage',(message)=>{
       console.log(`Server received this message ${message.from} and ${message.text} and ${message.createdat}`);
   })