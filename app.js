// we are requiring all the express libraries here

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');

// we are initializing express in app

const app = express();

// Routes
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const createGroupRoute = require('./routes/createGroup');
const groupChatRoute = require('./routes/groupChat');

// Models
const User = require('./models/user');
const Chat = require('./models/chat');
const Group = require('./models/group');
const Groupchat = require('./models/groupChat');
const Usergroup = require('./models/userGroup');


// Associations
User.hasMany(Chat);
Chat.belongsTo(User);


User.hasMany(Groupchat);
Groupchat.belongsTo(User)

User.belongsToMany(Group,{through:Usergroup});
Group.belongsToMany(User,{through:Usergroup});
// using the express libraries
app.use(bodyParser.json({extended: false}));
app.use(cors(
    {
    origin: "http://127.0.0.1:5500",
    credentials: true
}

));

// we are using routes here
app.use("/user", userRoute);
app.use("/message", chatRoute);
app.use("/group", createGroupRoute);
app.use("/group-chat", groupChatRoute);

// we are running our server and database here
sequelize
// .sync({force:true})
.sync()
.then((result)=> {
    // console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})

