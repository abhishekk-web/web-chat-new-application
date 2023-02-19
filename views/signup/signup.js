async function signup(e) {

    e.preventDefault();
    console.log(e.target.name.value);

    const signUp = {

        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        password: e.target.password.value

    }

    console.log(signUp);

}