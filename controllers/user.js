const User = require('../models/user');
const bcrypt = require('bcrypt');

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
            res.status(404).json({success:false, message: "User already exist"});
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