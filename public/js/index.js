let socket= io();
// var name=prompt("Enter your name");
//    socket.on('connect',()=>{
//        console.log("connected");

//        socket.emit('createMessage',{
//            from: name,
//            text : "Hello Buddies"
//        })
//    });

//    socket.on('disconnect',()=>{
//        console.log("disconnected");
//    });

//    socket.on('newMessage',(message)=>{
//        console.log(`Server received this message ${message.from} and ${message.text} and ${message.createdat}`);
//    })
const form=document.getElementById("send-container");

const messageinput=document.getElementById('messageinp');

const messagecontainer= document.querySelector(".container");


const name= prompt("Enter your name: ");
console.log(name);

const append=(message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);

}

form.addEventListener('submit',(e)=>{
 e.preventDefault();
 const message=messageinput.value;
 append(`You: ${message}`,`right`);
 socket.emit('send',message);
 messageinput.value="";
})
socket.emit('new-user-joined',name);

socket.on('user-joined', data=>{
append(`${data} joined the chat`,'center')
})

socket.on('receive', data =>{
    append(`${data.name}:  ${data.message}`,`left`)
})

socket.on('left', data =>{
    append(`${data} has left the chat `,`center`)
})