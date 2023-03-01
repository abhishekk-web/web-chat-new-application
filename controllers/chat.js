const Chat = require('../models/chat');
const User = require('../models/user');
const userController = require('../controllers/user');
const {Op} = require('sequelize');

// here is the backend of chatting
exports.chat=async(req,res)=>{
    try{
        console.log(req.body)
        const chat= req.body.chat;
        console.log("the new chat is"+ chat);
        const id=req.body.toUser;
        if(!chat){
            return res.status(400).json({message:'please enter the message'})
        }
        await Chat.create({messages:chat,toUser:id, userId: req.user.id}).then(()=>{
            console.log(req.user.name)
            res.status(200).json({UserName:req.user.name,message:'message sent successfully', messages: chat})

        })
    }catch(err){
        res.status(500).json({message:'internal server error',success:false})
    }   
}

// this is the controller to send all the chats to the frontend

exports.getChat = async (req, res) => {

    try{
        const user =await User.findAll({where:{id:{[Op.ne]: +req.user.id}},
            attributes:['id','name']
        })
        res.status(200).json({user,success:true, user:user})
    }catch(err){
        res.status(500).json({message:err,success:false})
    }

}


exports.getAllChats=async(req,res)=>{
    try{
        console.log("All good");
    const chatpersonId = +req.params.chatpersonId;
    console.log("chat id is "+chatpersonId)
    console.log(req.user.id);
    if(chatpersonId ==0){
        return res.status(200).json({message:'successful'})
    }
    console.log(chatpersonId)
    const chatTwoWay=await Chat.findAll({
        limit:10,
        order:[["updatedAt","DESC"]],
        where:{
            [Op.or]:[
                {toUser:chatpersonId,userId:+req.user.id},
                {toUser:+req.user.id,userId:chatpersonId}
            ]
        },
        attributes:['messages'],
        include:{
            model:User,
            where:{
                [Op.or]:[{id:+req.user.id},{id:chatpersonId}]
            },
            attributes:['name']
        }

    })
    console.log("chat two way is "+chatTwoWay);
        res.status(200).json({chats:chatTwoWay.reverse(),success:true})
}catch(err){
    console.log(err);
    res.status(500).json({message:'internal server error',success:false})
}
    }