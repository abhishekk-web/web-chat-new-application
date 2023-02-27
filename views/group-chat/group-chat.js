const userLeft = document.getElementById('left')
const userRight = document.getElementById('right')
const messageHeader=document.getElementById('message-card-header')
const groupMessage=document.getElementById('chat-messages')
const toast=document.getElementById('toast-msg')
const oneChat=document.getElementById('one-to-one-chat')
const creategroup=document.getElementById('create-group')

oneChat.addEventListener('click',onetoone)
function onetoone(){
    window.location.href="../chat-screen/chat-screen.html"
}

creategroup.addEventListener('click',Creategroup)
function Creategroup(){
    window.location.href="../make-group/make-group.html"
}

let groupId;


async function allLoginUsers(){
    const token=localStorage.getItem('token')
    userLeft.innerHTML=""
   await axios.get('http://localhost:3000/group-chat/allusersgroup',{headers:{"Authorization":token}})
   .then(response=>{
    console.log(response)
    console.log(response.data.user)
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
        console.log("the id is "+id);
        groupId=id;
        const userMessage = `Message to Group: ${name} <input type='hidden' id='msg-header-user-id' value='${id}'/>`;
        console.log("the user message is "+userMessage)
        messageHeader.innerHTML=userMessage;
        groupMessage.innerHTML="";
        getGroupMessages(id);
    }
}
async function  getGroupMessages(groupId=0){
    console.log('dhf')
    groupMessage.innerHTML="";
    const token=localStorage.getItem('token')
    const response= await axios.get(`http://localhost:3000/group-chat/allgroupmessages/${groupId}`,{headers:{"Authorization":token}})
    console.log(response)
   if(response.status ==200 && response.data.groupMessages){
      const chats=response.data.groupMessages;
      chats.forEach((group)=>{
        console.log(group)
        const chatNodes=`<li class="list-group-item1">${group.userName}:${group.groupMessage}</li>`
        groupMessage.innerHTML +=chatNodes
      })
   }
}
async function chat(e){
    e.preventDefault()
    const id1 = +document.getElementById('msg-header-user-id').value;
    console.log("the id1 is "+id1);
   
    const group1=e.target.group2.value;
    console.log(group1);
    if(!group1){
       return alert('Enter a message')
    }
    try{
    const groupDetails={
       groupMessage: group1,
       groupId:id1
    }
    console.log(groupDetails)
    const token=localStorage.getItem('token')
    await axios.post('http://localhost:3000/group-chat/groupmessage',groupDetails,{headers:{"Authorization":token}})
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
    getGroupMessages(groupId)
    // },5000)
    }

window.addEventListener('DOMContentLoaded',showScreen)
userLeft.addEventListener('click',userClick)