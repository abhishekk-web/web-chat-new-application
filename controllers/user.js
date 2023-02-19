const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function isstringvalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

function isnumbervalid(number){
    if(number == undefined|| number.length === 0){
        return true;
    }
    else{
        return false;
    }
}

exports.signUp = async (req, res) => {

    try {

    const {name,email,phone,password}= req.body

    const saltRounds = 10;

    if(isstringvalid(name) || isstringvalid(email) || isnumbervalid(phone) || isstringvalid(password)){
        return res.status(400).json({err:"Bad parameters, form is not completely filled"});
    }

    const find = await User.findAll({where: {email:email}});

    if(find.length>0){  // here if the user already present then it just sent the response that user already present
            return res.status(404).json({message: "User already exist"});
        }
        else{   // if user is not present here we'll create the user
            bcrypt.hash(password, saltRounds, async(err, hash)=> {  // firstly we our using brcypt here, where took password first then saltrounds

                console.log(err);
                const data = User.create({name: name, email: email, phone:phone, password: hash});   // here we sets our password as hash
                res.status(200).json({success: true, message: "successfully added user", data:data});

            })
        }

    }
    catch(err){ // here we are checking all the errors
        console.log(err);
        return res.status(500).json({message:err});
    }

}

const  generateAccessToken = (id, name) =>{
    return jwt.sign({ userId: id, name: name}, 'secrets');
}

exports.login = async (req, res) => {

    try {

        console.log(req.body);
    const {email, password} = req.body;

    if(isstringvalid(email) || isstringvalid(password)){
        return res.status(400).json({err:"Bad parameters, form is not completely filled"});

    }

    const data = await User.findAll({where: {email:email}});
    if(data.length > 0){

        bcrypt.compare(password, data[0].password, (err, response)=> {
            if(err){
                console.log(err);
            }
            if(response == true){
                return res.status(200).json({success: true, message: "user found successfully", token:generateAccessToken(data[0].id, data[0].name) });
            }
            else{
                return res.status(401).json({success: false, message: "password is incorrect"});    // if the password is incorrect then sends the json response that password is incorrect

            }
        })

    }
    else{
        return res.status(404).json({success: false, message: "User not found"});   // if the user not found then it sends the response that the user not found
    }

    }
    catch(err){
        console.log(err);
    }
}

exports.generateAccessToken = generateAccessToken;