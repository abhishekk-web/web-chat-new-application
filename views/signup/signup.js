// front end of sign up page

async function signup(e) {

    try {

    e.preventDefault();
    console.log(e.target.name.value);

    // storing all the data that the user fills through the form
    const signUp = {

        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        password: e.target.password.value

    }
    console.log(signUp);

    // sending the sign up details to the backend
    const response = await axios.post('http://localhost:3000/user/signup', signUp);
    if(response.status === 200){
        alert(response.data.message);
        window.location.href = ('../login/login.html'); // if the user found then it goes to the login form
    }
    else if(response.status === 404){
        console.log("error");
    }
    else{
        console.log(response.data.message);
        throw new Error(response.data.message); // we there is an error it will goes to the catch block
    }
   

    }
    catch(err){
        alert(err);
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`       // it gets all the error
    }

}