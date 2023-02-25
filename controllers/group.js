const Group = require('../models/group');
const userGroup = require('../models/userGroup');
const User = require('../models/user');

exports.group = async (req, res) => {

    try {

        console.log(req.body.id);
        const response = await Group.create({name: req.body.name});
        const userGroupData = await userGroup.create({userId:req.user.id,groupId:response.id});
        res.status(200).json({success: true, message: "group has been successfully created", groupChat: userGroupData});

    }
    catch(err){
        console.log(err);
    }

}

exports.getGroup = async(req, res) => {

    try {
    
        const groupChats = await userGroup.findAll({where: {userId: req.user.id}});
        // console.log(groupChats);
        const theArray = [];
        for(let i = 0;i<groupChats.length; i++){
            theArray.push(groupChats[i].groupId);
        }
        console.log(theArray);

        const response = await Group.findAll({where: {id: theArray}});

        res.status(200).json({groupChat: response});

    }
    catch(err){
        console.log(err);
    }

}