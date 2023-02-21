// frontend of chats

async function chat(e){

    try {

        e.preventDefault();

        // we are storing the message that user sends
        const chatDetails = {
            message: e.target.message.value
        }

        // here we are sending the message to the backend
        const token = localStorage.getItem("token");
        var messageToken = JSON.parse(localStorage.getItem("messageToken") || "[]");
        // const messagesToken = [];
        const response = await axios.post("http://localhost:3000/message/chat", chatDetails, {headers: {"Authorization": token}});
        alert(response.data.message);
        const id = response.data.chat.id;
        const message = response.data.chat.messages;
        console.log(message);
       
        var messageNewToken = {
            id:id, message:message
        };
        messageToken.push(messageNewToken);
        localStorage.setItem("messageToken", JSON.stringify(messageToken));

    }
    catch(err){
        console.log(err);
    }

}

// this is for showing all the chats

window.addEventListener("DOMContentLoaded",  () => {

    // setInterval(()=> {
        
        showChats();

    // }, 1000)

})

function showMessages(id, name, message)
{
    const parentNode = document.getElementById('chat-head')
    const createNewUser = `<li id='${id}'> ${name} - ${message} -</li>`

    parentNode.innerHTML += createNewUser;

}

async function showChats() {

    try {

        const token = localStorage.getItem("token");
        var messageToken = JSON.parse(localStorage.getItem("messageToken") || "[]");
        console.log(messageToken);
        
        const response = await axios.get(`http://localhost:3000/message/getchat`, {headers: {"Authorization": token}});
        console.log(response);
        // messageToken.length = 10;
        if(response.status === 200){
            
            for(let i=0;i<messageToken.length; i++){

                    if(i>=10){
                        var messageTokens = messageToken.splice(i,8);
                        localStorage.setItem('messageToken', JSON.stringify(messageTokens));
                    }
                    
                    const id = messageToken[i].id;
                    const message = messageToken[i].message;
                
                    showMessages(id, message);
                
            }
            

        }
        else{
            throw new Error;
        }    
    }
    catch(err){
        document.body.innerHTML += `<div style="color:red">${err}</div>`
    }

}