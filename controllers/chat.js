const Chat = require('../models/chat');
const User = require('../models/user');
const userController = require('../controllers/user');

// here is the backend of chatting
exports.chat = async(req, res) => {

    try {

        const {message} = req.body;
    
        // firstly we are getting the data which matches with the userId
        // const check = await Chat.findOne({where: {userId: req.user.id}});

        // then we are checking here that if there is no data in the database then we'll create that data if data already exists then we update that data
        // if(check == null){

            const data = await Chat.create({messages: message, userId: req.user.id})        
            res.status(200).json({success: true, message: "message successfully sent", chat: data})

        // }
        // else{

        //     const data = await Chat.update({messages: message}, {where: {userId: req.user.id}});
        //     res.status(200).json({success: true, message: "message successfully sent", chat: data});

        // }
    
    }
    catch(err){
        console.log(err);
    }

}

// this is the controller to send all the chats to the frontend

exports.getChat = async (req, res) => {

    try {

        const chats = await Chat.findAll({include: [
            {
              model: User,
              required: false,
            },
          ]});
        console.log(chats);
        res.status(200).json({success: true, chat: chats});

    }
    catch(err){
        console.log(err);
    }

}