const Chat = require('../models/chat');

// here is the backend of chatting
exports.chat = async(req, res) => {

    try {

        const {message} = req.body;
    
        // firstly we are getting the data which matches with the userId
        const check = await Chat.findOne({where: {userId: req.user.id}});

        // then we are checking here that if there is no data in the database then we'll create that data if data already exists then we update that data
        if(check == null){

            const data = await Chat.create({messages: message, userId: req.user.id})        

        }
        else{

            const data = await Chat.update({messages: message}, {where: {userId: req.user.id}});
         
        }
    
    }
    catch(err){
        console.log(err);
    }

}