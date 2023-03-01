const {Op} =require('sequelize');
const Group=require('../models/group');
const User=require('../models/user');
const Usergroup = require('../models/usergroup');
const Groupchat=require('../models/groupChat');


exports.allUserGroups=async(req,res)=>{
    try{
        console.log("the req.user is "+req.user.id);
    const user =await req.user.getGroups({attributes:['id','name']})
        console.log(user);
    console.log("the users are "+user)
    res.status(200).json({user,success:true})
}catch(err){
    console.log(err);
    res.status(500).json({message:err,success:false})
}
}
exports.groupMessage=async(req,res)=>{
    try{
        console.log(req.body)
        const{groupMessage,groupId} =req.body;
        const userName=req.user.name;
        console.log("The group message is "+ groupMessage)
        if(!groupMessage || !groupId){
            return res.status(400).json({message:'bad parameters'})
        }
        const response=await Groupchat.create({groupMessage:groupMessage,groupId:+groupId,userName:userName, userId: req.user.id});
        console.log(response);
        res.status(200).json({message:'message sent successfully'})
    }
    catch(err)  {
        res.status(500).json({message:err,success:false})
    }
}
exports.allGroupMesssage=async(req,res)=>{
    try{
        const groupId=+req.params.groupchat;
        console.log("the group id is "+groupId)
        const groupMessages=await Groupchat.findAll({
            limit:15,
            order:[["updatedAt","DESC"]],
            where:{groupId},
            attributes:["groupMessage","userName"]
        })
        console.log("group messages are "+groupMessages)
        res.status(200).json({groupMessages:groupMessages.reverse(),message:'successful'})
    }
    catch(err){
        res.status(500).json({message:err,success:false})
    }
}