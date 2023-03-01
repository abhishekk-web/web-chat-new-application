const {Op} =require('sequelize');
const Groups=require('../models/group');
const User=require('../models/user');
const Usergroup = require('../models/userGroup');


exports.postCreateGroup=async(req,res)=>{
    try{

    console.log("hello world");
    const groupName = req.body.groupName;
    await req.user.createGroup({name :groupName},{through:{admin:true}})
    // console.log(groups);
    res.status(201).json({message:'group created successfully'})
    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server problem'})
    }
}
exports.allGroups=async(req,res)=>{
    try{
        console.log(req.user.id);
        const group = await req.user.getGroups({attributes:['id','name'],through:{admin:true}});
    // const group = await Groups.findAll();    
    console.log(group);
    console.log("total groups are "+group);
    res.status(200).json({group,success:true})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'internal server problem'})
    }

}
exports.allUsers=async(req,res)=>{
    try{
        console.log("hello");
    const user=await User.findAll({where:{id:{[Op.ne]: +req.user.id}},
        attributes:['id','email','name']
    })
    // console.log(user);
        res.status(200).json({user})
    }catch(err){
        res.status(500).json({message:'internal server problem'})
    }
}
exports.addUser=async(req,res)=>{
    try{

    const {groupName,email} = req.body;
    console.log(groupName);
    const admin=req.body.isAdmin;
    // console.log(admin)
    // console.log(groupName)
    // console.log(email)
    const user = await User.findOne({where:{email}});
    const group = await Groups.findOne({where:{name:groupName}});
    console.log(group);
    // console.log(user,group)
    if(!user){
        return res.status(400).json({message:'user or group not found'})
    }
    const userInUserGroup =await Usergroup.findOne({where:{userId:+user.id,groupId:+group.id}});
    console.log(userInUserGroup);
    if(!userInUserGroup){
        const users = await Usergroup.create({admin,userId:user.id,groupId:group.id})
        console.log(users);
        return res.status(201).json({message:'added user to the group', data:users})
    }
    const users = await Usergroup.update({admin},{where:{userId:+user.id,groupId:+group.id}})
    console.log(users);
    return res.status(201).json({message:'update user in the group', data: users})
}
catch(err){
    // console.log(err);
    res.status(500).json({message:'internal server problem'})
}
}
exports.deleteUser=async(req,res)=>{
    try{
    console.log('efgrh',req.body)
    const{groupName,email}=req.body
    const{id:groupId}=await Groups.findOne({where:{name:groupName}})
    console.log('dgch',groupId)
    const userHasPermission=await Usergroup.findOne({where:{admin:true,groupId,userId:+req.user.id}})
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

