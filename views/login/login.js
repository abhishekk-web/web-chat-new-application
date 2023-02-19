async function login(e){

    try {

    e.preventDefault();

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }

    console.log(loginDetails);

    const response = await axios.post("http://localhost:3000/user/login", loginDetails);
    if(response.status === 200){
        alert(response.data.message);
        window.location.href="../chat/chat.html";
    }
    else{
        throw new Error('Failed to login');
    }

    }
    catch(err){
        alert(err);
        document.body.innerHTML += `<div style="color:red">${err}</div>`
    }

}