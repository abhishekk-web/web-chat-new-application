// frontend of login page

async function login(e){

    try {

    e.preventDefault();

    // storing all the data that user fills through the form
    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }

    // we are sending the data to the backend
    const response = await axios.post("http://localhost:3000/user/login", loginDetails);
    console.log(response);
    if(response.status === 200){
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
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