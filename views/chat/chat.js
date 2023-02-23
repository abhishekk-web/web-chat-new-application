// frontend of chats

// this is for showing all the chats

window.addEventListener("DOMContentLoaded",  () => {

    // setInterval(()=> {
        
        showMessage();

    // }, 1000)

})

async function chat(e){

    try {

        e.preventDefault();

        // we are storing the message that user sends
        const chatDetails = {
            message: e.target.message.value
        }

        // here we are sending the message to the backend
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:3000/message/chat", chatDetails, {headers: {"Authorization": token}});
        alert(response.data.message);
        showChats();

    }
    catch(err){
        console.log(err);
    }

}

async function showMessage() {

    try {
  
        const parentNode = document.getElementById("chat-head");
        parentNode.innerHTML = " ";
        const messagesToken = JSON.parse(localStorage.getItem("messageToken"));
        
        // if there's no token in local Storage then firstly we have to create that
        if(!messagesToken){

            const response = await axios.get('http://localhost:3000/message/getchat');
            // here we want that only 10 messages should be send into the localStorage
            const newResponse = response.data.chat.slice(response.data.chat.length - 10, response.data.chat.length);
            const chat = JSON.stringify(newResponse);
            localStorage.setItem("messageToken", chat);

            for(let i = 0;i<response.data.chat.length; i++){
                showMessages(response.data.chat[i].user.name, response.data.chat[i].message);
            }

        }
        else{
            // if the token is already there then we just have to fetch the data from the local storage
            for(let i =0;i<messagesToken.length; i++){
                showMessages(messagesToken[i].user.name, messagesToken[i].messages);
            }
        }

    }
    catch(err){
        console.log(err);
    }

}



async function showChats() {

    try {

        const token = localStorage.getItem("token");
        var messageToken = JSON.parse(localStorage.getItem("messageToken"));
        let newMessage;

        // here we are checking that data exist or not in message token
        if(messageToken.length != 0){

            // here we are getting the id of the second last message
            newMessage = messageToken[messageToken.length - 1].id;

        }
        else{
            // if its equal to 0 then we just -1 so that we'll get the last message
            newMessage = -1;
        }
        
        // here we are sending the second last message's id to the backend through query parameters
        const response = await axios.get(`http://localhost:3000/message/getchat?id=${newMessage}`, {headers: {"Authorization": token}});
        const allMsgs = messageToken.concat(response.data.chat);

        // here we are checking the length of the messages is more than 10 or less than equals to 10
        if(allMsgs.length > 10){
            const saves = allMsgs.slice(allMsgs.length - 10, allMsgs.length);
            localStorage.setItem("messageToken", JSON.stringify(saves));

        }
        else{
            localStorage.setItem("messageToken", JSON.stringify(allMsgs));
        }

        showMessage();
    
    }
    catch(err){
        document.body.innerHTML += `<div style="color:red">${err}</div>`
    }

}

function showMessages(name, message)
{
    const parentNode = document.getElementById('chat-head')
    const childHTML=`<li class="chat-msg-li">${name} : ${message}</li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;

}



