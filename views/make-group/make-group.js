const createdGroupShow= document.getElementById('created-group-show')
const userRight = document.getElementById('right')
const listContact = document.getElementById('list-of-all-contacts')
const messageHeader=document.getElementById('message-card-header')
const chatMessage=document.getElementById('chat-messages')
const addToUser=document.getElementById('create-group-user')
const toast=document.getElementById('toast-msg')
const adminTrue=document.getElementById('admin-yes')
const adminFalse=document.getElementById('admin-no')
const oneChat=document.getElementById('one-to-one-chat')
const groupChat=document.getElementById('group-chat')
groupChat.addEventListener('click',groupTalk)
function groupTalk(){
    window.location.href="../group-chat/group-chat.html"
}
oneChat.addEventListener('click',onetoone)
function onetoone(){
    window.location.href="../chat-screen/chat-screen.html"
}

async function createGroup(e){
    try{
    e.preventDefault();
    const creategrpdata={
        groupName:e.target.creategroup.value
    }
    console.log(creategrpdata)
    const token=localStorage.getItem('token')
    const response=await axios.post('http://localhost:3000/group/creategroup',creategrpdata,{headers:{"Authorization":token}})
    console.log(response)
    if(response.status ==201){
        alert(response.data.message)
    }
    }catch(err){
        if(err.response.status==500){
            alert(err.response.data.message)
        }
    }
}
async function getContacts(){
    listContact.innerHTML="";
    const token=localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/group/allusers',{headers:{"Authorization":token}})
    console.log(response);
    const user1 =response.data.user;
    user1.forEach((user)=>{
        const childNodes=`<li class="list-group-item" >${user.name}<input type="hidden" class="user-id" value=${user.id} /></li>`
        listContact.innerHTML +=childNodes
    })
    
    
}
async function addUserToGroup(e){
    try{
    e.preventDefault()
    const adduser={
        groupName:e.target.grpname.value,
        email:e.target.email.value, 
    }
    const token=localStorage.getItem('token')
    const response=await axios.post('http://localhost:3000/group/adduser',adduser,{headers:{"Authorization":token}})
    console.log(response)
}catch(err){
    console.log(err)
}
}
async function removeUser(e){
    try{
    e.preventDefault()
    const removeanyuser={
      groupName:e.target.removeName.value,
      email:e.target.removeEmail.value
    }
    console.log(removeanyuser)
    const token=localStorage.getItem('token')
    const response = await axios.post('http://localhost:3000/group/deleteuser',removeanyuser,{headers:{"Authorization":token}})
    console.log(response)
}catch(err){
    console.log(err)
}
}
async function allShowgroup(){
    try{
    createdGroupShow.innerHTML="";
    const token=localStorage.getItem('token')
    const response=await axios.get('http://localhost:3000/group/allgroups',{headers:{"Authorization":token}})
    console.log(response)
    const group1=response.data.group
    console.log(group1)
    group1.forEach((group)=>{
        const childNodes=`<li class="list-group-item" >${group.name}<input type="hidden" class="user-id" value=${group.id} /></li>`
        createdGroupShow.innerHTML +=childNodes
    })
}catch(err){
    if(err.response.status==500){
        alert(err.response.data.message)
    }
}
}
function showScreen(){
    getContacts()
    allShowgroup()
    }

window.addEventListener('DOMContentLoaded',showScreen)
