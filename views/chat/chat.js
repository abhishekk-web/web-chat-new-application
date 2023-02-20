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
    console.log(response);

    }
    catch(err){
        console.log(err);
    }

}