const Chat = require('../models/chat');
const User = require('../models/user');
const userController = require('../controllers/user');
const {Op} = require('sequelize');

// here is the backend of chatting
exports.chat = async(req, res) => {

    try {

        const {message} = req.body;
    
        // firstly we are getting the data which matches with the userId
            const name = req.user.name;
            const data = await Chat.create({messages: message, userId: req.user.id})        
            res.status(200).json({success: true, message: "message successfully sent", chat: data, name:name})

    
    }
    catch(err){
        console.log(err);
    }

}

// this is the controller to send all the chats to the frontend

exports.getChat = async (req, res) => {

    try {

        // here we are getting the query id
        const newMessage = req.query.id || -1;

        // here we are using left outer join
        const chats = await Chat.findAll({include: 
            // through inner join we are getting the name of the user
            {
                model: User,
                as: 'user',
                attributes: ['name']

            },
                where: {
                id: 
                {
                    // id should be greater than the id that we feteched from the frontend
                    [Op.gt]: newMessage
                }

            }

        })

        // then we send the json response to the frontend
        res.status(200).json({success: true, chat: chats});
    
    }
    catch(err){
        console.log(err);
    }

}