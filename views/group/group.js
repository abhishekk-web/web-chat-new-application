
// this is for showing all the chats

window.addEventListener("DOMContentLoaded",  () => {

    // setInterval(()=> {

        showMessage();

    // }, 1000)

})

window.addEventListener('DOMContentLoaded', () => {

    allGroups();

})

document.getElementById("send-btn").onclick = async() => {

    const msg = document.getElementById("msg-input").value;
    // document.getElementById("msg-input").value = " ";
    const groupId = localStorage.getItem("groupsId");
    const msgs = {
        msg:msg,
        groupId: groupId
    }

    try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:3000/message/chat", msgs, {headers: {"Authorization": token}});
        console.log(response);
    }
    catch(err){
        console.log(err);
    }

}

if(localStorage.getItem("groupsId")){
    // setInterval(() => {
        const id=localStorage.getItem("groupsId");
        showChats(id);
    // }, 3000);
}



async function chat(e){

    try {
        e.preventDefault();
        // we are storing the message that user sends
        const groupId = localStorage.getItem("groupsId");
        const chatDetails = {
            message: e.target.messages.value,
            groupId: groupId
        }
        console.log(chatDetails);

        // here we are sending the message to the backend
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:3000/message/chat", chatDetails, {headers: {"Authorization": token}});
        console.log(response);
        alert(response.data.message);
        showChats();

    }
    catch(err){
        console.log(err);
    }

}

document.getElementById("chat-grp").onclick = async()=> {

    try {
        const id = event.target.id;
        console.log(id);
        localStorage.setItem("groupId", id);
        const obj = {
            id:id
        }
        showChats();
    }
    catch(err){
        console.log(err);
    }
}



async function showChats(id) {

    try {

        console.log("chats");
        const token = localStorage.getItem("token");

        var messageToken = JSON.parse(localStorage.getItem("messageToken"));
        console.log(messageToken);
        let newMessage;

        // here we are checking that data exist or not in message token
        if(messageToken.length != 0){

            // here we are getting the id of the second last message
            newMessage = messageToken[messageToken.length - 1].id;
            console.log(newMessage);

        }
        else{
            // if its equal to 0 then we just -1 so that we'll get the last message
            newMessage = -1;
        }

         // here we are sending the second last message's id to the backend through query parameters
         const groupId = localStorage.getItem("groupId");
         const response = await axios.get(`http://localhost:3000/message/getchat?id=${newMessage}`, {headers: {"Authorization": token}});
         console.log(response);
         const allMsgs = messageToken.concat(response.data.chat);
         console.log(allMsgs);
 
         // here we are checking the length of the messages is more than 10 or less than equals to 10
         if(allMsgs.length > 10){
             const saves = allMsgs.slice(allMsgs.length - 10, allMsgs.length);
             localStorage.setItem("messageToken", JSON.stringify(saves));
 
         }
         else{

            localStorage.setItem("messageToken", JSON.stringify(allMsgs));
        }

        showMessage(id);

    }
    catch(err){
        document.body.innerHTML += `<div style="color:red">${err}</div>`
    }

}

async function showMessage(id) {

    try {

        console.log("hello world");
        const parentNode = document.getElementById("chat-head");
        parentNode.innerHTML = " ";
        const messagesToken = JSON.parse(localStorage.getItem("messageToken"));

        // if there's no token in local Storage then firstly we have to create that
        if(!messagesToken){
            console.log("data is there");
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:3000/message/getchat', {headers: {"Authorization": id}});
            console.log(response);
            // here we want that only 10 messages should be send into the localStorage
            const newResponse = response.data.chat.slice(response.data.chat.length - 10, response.data.chat.length);
            const chat = JSON.stringify(newResponse);
            localStorage.setItem("messageToken", chat);

            for(let i = 0;i<response.data.chat.length; i++){
                showMessages(response.data.chat[i].user.name, response.data.chat[i].message);
            }

        }
        else{
            console.log("data is not there");
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

async function allGroups() {

    try {
        
        const token = localStorage.getItem("token");
        let response = await axios.get(`http://localhost:3000/user/getgroup`, {headers: {"Authorization": token}});
        const parentNode=document.getElementById("chat-grp");
        for(let i=0;i<response.data.length;i++){
            const childHTML=` <li class="group-names" id=${response.data[i].id}>${response.data[i].name}</li>`
            parentNode.innerHTML=parentNode.innerHTML+childHTML;
        }

    }
    catch(err){
        console.log(err);
    }

}

document.getElementById("grpbtn").onclick = async() => {

    try {
        const token = localStorage.getItem("token");
        let response = await axios.get(`http://localhost:3000/user/getgroup`, {headers: {"Authorization": token}} );
        console.log(response);
        const parentNode = document.getElementById('check-box');
        for(let i=0;i<response.data.groupChat.length; i++){
            const childHTML = `<input type="checkbox" name=${response.data.groupChat[i].name} class='cb' id=${response.data.groupChat[i].id}>
            <label for="user">${response.data.groupChat[i].name}</label><br>`
            parentNode.innerHTML=parentNode.innerHTML+childHTML;
        }

    }
    catch(err){
        console.log(err);
    }

}

// if(localStorage.getItem("gid")){
//     setInterval(() => {
//         const id=localStorage.getItem("gid");
//         showChats(id);
//     }, 3000);
// }

function showMessages(name, message)
{
    const parentNode = document.getElementById('chat-head')
    const childHTML=`<li class="chat-msg-li">${name} : ${message}</li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;

}

async function createNewGroup(e){

    e.preventDefault();
    console.log("hello world");
    const checkBox = document.getElementsByClassName('cb');
    console.log(checkBox);
    const name=document.getElementById("grpName").value;
    const theArray=[];
    for (var check of checkBox) {  
        if (check.checked)  
          theArray.push(check.id)  
      }
      console.log("the array is "+theArray);
      const obj={
        name:name,
        id: theArray
      }
      const token = localStorage.getItem("token");
      const response= await axios.post(`http://localhost:3000/user/group`,obj, {headers: {"Authorization": token}});
      console.log(response);
      localStorage.setItem("groupsId", response.data.groupChat.id);
      alert(response.data.message);

}
