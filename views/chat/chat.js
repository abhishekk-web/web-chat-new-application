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
        const response = await axios.post("http://localhost:3000/message/chat", chatDetails, {headers: {"Authorization": token}});
        alert(response.data.message);

    }
    catch(err){
        console.log(err);
    }

}

// this is for showing all the chats

window.addEventListener("DOMContentLoaded",  () => {

    showChats();

})

async function showChats() {

    try {

        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/message/getchat", {headers: {"Authorization": token}});
        if(response.status === 200){
            console.log(response);
        }
        else{
            throw new Error;
        }    
    }
    catch(err){
        document.body.innerHTML += `<div style="color:red">${err}</div>`
    }

}