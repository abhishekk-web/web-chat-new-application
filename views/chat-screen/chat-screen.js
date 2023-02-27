const userLeft = document.getElementById('left')
const userRight = document.getElementById('right')
const messageHeader=document.getElementById('message-card-header')
const chatMessage=document.getElementById('chat-messages')
const toast=document.getElementById('toast-msg')
const groupChat=document.getElementById('group-chat')
const creategroup=document.getElementById('create-group')

groupChat.addEventListener('click',groupTalk)
function groupTalk(){
    // console.log('true')
    window.location.href="../group-chat/group-chat.html"
}

creategroup.addEventListener('click',Creategroup)
function Creategroup(){
    console.log("group has been created");
    window.location.href="../make-group/make-group.html"
}




let toUserId;


async function allLoginUsers(){
    const token=localStorage.getItem('token')
    userLeft.innerHTML=""
   await axios.get('http://localhost:3000/message/getchat',{headers:{"Authorization":token}})
   .then(response=>{
    console.log(response)
    // console.log(response.data.user)
    const user1=response.data.user
    user1.forEach((user)=>{
        const childNodes=`<li class="list-group-item" >${user.name}<input type="hidden" class="user-id" value=${user.id} /></li>`
        userLeft.innerHTML +=childNodes
    })
   })
   
}
function userClick(e){
    if(e.target.className == "list-group-item"){
        // console.log(e.target)
        // console.log(e.target.textContent)
        // console.log(e.target.children[0].value)
        const name = e.target.textContent;
        const id = +e.target.children[0].value;
        toUserId:id;
        const userMessage = `Message to : ${name} <input type='hidden' id='msg-header-user-id' value='${id}'/>`;
        messageHeader.innerHTML=userMessage;
        chatMessage.innerHTML="";
        getChats(id);
    }
}
async function  getChats(toUserId =0){
    chatMessage.innerHTML="";
    const token=localStorage.getItem('token')
    console.log("hello world");
   const response= await axios.get(`http://localhost:3000/message/allchats/${toUserId}`,{headers:{"Authorization":token}})
   console.log(response)
   if(response.status ==200 && response.data.chats){
      const chats=response.data.chats;
      chats.forEach((chat)=>{
        console.log(chat)
        const chatNodes=`<li class="list-group-item1">${chat.user.name}:${chat.messages}</li>`
        chatMessage.innerHTML +=chatNodes
      })
   }
}
async function chat(e){
    e.preventDefault()
    const id1 = +document.getElementById('msg-header-user-id').value;
    const chat1=e.target.chat2.value;
    if(!chat1){
       return alert('Enter a message')
    }
    try{
    const chatDetails={
       chat: chat1,
       toUser:id1
    }
    console.log(chatDetails)
    const token=localStorage.getItem('token')
    await axios.post('http://localhost:3000/message/chat',chatDetails,{headers:{"Authorization":token}})
    .then(response=>{
        console.log(response)
        if(response.status ===200){
            alert(response.data.message)
        }
    })
}catch(err){
    console.log(err)
    if(err.response.status===400){
        alert(err.response.data.message)
    }
    if(err.response.status===500){
        alert(err.response.data.message)
    }
}
}
function showScreen(){
    allLoginUsers()
    // setInterval(()=>{
        getChats(toUserId)
    // },5000)
    }

window.addEventListener('DOMContentLoaded',showScreen)
userLeft.addEventListener('click',userClick)