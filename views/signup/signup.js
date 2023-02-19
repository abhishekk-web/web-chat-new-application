async function signup(e) {

    try {

    e.preventDefault();
    console.log(e.target.name.value);

    const signUp = {

        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        password: e.target.password.value

    }
    console.log(signUp);
    const response = await axios.post('http://localhost:3000/user/signup', signUp);
    if(response.status === 200){
        alert(response.data.message);
        // window.location.href = ('../login/login.html'); // if the user found then it goes to the login form
    }
    else{
        throw new Error(response.data.message); // we there is an error it will goes to the catch block
    }
   

    }
    catch(err){
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`       // it gets all the error
    }

}