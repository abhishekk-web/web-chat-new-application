async function login(e){

    e.preventDefault();

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }

    console.log(loginDetails);

}