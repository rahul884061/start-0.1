const socket = io()
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

const append = (message)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageArea.append(messageElement);
}


//const sendButton = document.getElementById('send-btn');

do{
    name = prompt('PLEASE ENTER YOUR NAME')
}while(!name)



socket.emit('new-user-joined', name)




socket.on('user-joined', name => {
    append(`${name} joined the chat`)

})





textarea.addEventListener('keyup', (e) => {
    if(e.key == 'Enter'){
        sendMessage(e.target.value)
    }
})

//sendButton.addEventListener('click', function() {
  //  sendMessage(sendButton);
  //});

// name send




  // message
function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }
    // append (msg show hear first)
    appendMessage(msg, 'outgoing')
    textarea.value = ''

    // server send
    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// recive msg

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
})