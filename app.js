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
const user = require('./models/user');
const chat = require('./models/chat');
const group = require('./models/group');
const userGroup = require('./models/userGroup');

// Associations
user.hasMany(chat);
chat.belongsTo(user);

user.hasMany(group);
group.belongsTo(user);

user.belongsToMany(group,{through: userGroup});
group.belongsToMany(user, {through: userGroup});

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

