const {Op} =require('sequelize');
const Group=require('../models/group');
const User=require('../models/user');
const Usergroup = require('../models/usergroup');


exports.postCreateGroup=async(req,res)=>{
    try{
        console.log("hello world");
    const groupName = req.body.groupName;
    await req.user.createGroup({name :groupName})
    res.status(201).json({message:'group created successfully'})
    }catch(err){
        res.status(500).json({message:'internal server problem'})
    }
}
exports.allGroups=async(req,res)=>{
    try{
    const group = await req.user.getGroups({attributes:['id','name']});
    res.status(200).json({group,success:true})
    }catch(err){
        res.status(500).json({message:'internal server problem'})
    }

}
exports.allUsers=async(req,res)=>{
    try{
        console.log("hello");
    const user=await User.findAll({where:{id:{[Op.ne]: +req.user.id}},
        attributes:['id','email','name']
    })
    console.log(user);
        res.status(200).json({user})
    }catch(err){
        res.status(500).json({message:'internal server problem'})
    }
}
exports.addUser=async(req,res)=>{
    try{
    console.log('fbdh',req.body)
    const {groupName,email} = req.body;
    console.log(groupName);
    // const admin=req.body.isAdmin;
    // console.log(admin)
    // console.log(groupName)
    // console.log(email)
    const user = await User.findOne({where:{email}});
    const group = await Group.findOne({where:{name:groupName}});
    // console.log(user,group)
    if(!user){
        return res.status(400).json({message:'user or group not found'})
    }
    const userInUserGroup =await Usergroup.findOne({where:{userId:+user.id,groupId:+group.id}});
    if(!userInUserGroup){
        await Usergroup.create({userId:+user.id,groupId:+group.id})
        return res.status(201).json({message:'added user to the group'})
    }
    await Usergroup.update({where:{userId:+user.id,groupId:+group.id}})
    return res.status(201).json({message:'update user in the group'})
}
catch(err){
    res.status(500).json({message:'internal server problem'})
}
}
exports.deleteUser=async(req,res)=>{
    try{
    console.log('efgrh',req.body)
    const{groupName,email}=req.body
    const{id:groupId}=await Group.findOne({where:{groupName}})
    console.log('dgch',groupId)
    const userHasPermission=await Usergroup.findOne({where:{groupId,userId:+req.user.id}})
    if(userHasPermission){
        const userToBeRemoved=await User.findOne({where:{email}});
        const removeUser=await Usergroup.destroy({
            where:{userId:userToBeRemoved.id,groupId}
        })
        if(removeUser){
            return res.status(200).json({message:'removed user'})
        }
        return res.status(400).json({message:'user is not present in the group'})
    }
    return res.status(404).json({message:'you are not admin to delete the user'})
    }catch(err){
        res.status(500).json({message:'internal server problem'})
    }
}

