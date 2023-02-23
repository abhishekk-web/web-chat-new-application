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
const groupRoute = require('./routes/group');

// Models
const user = require('./models/user');
const chat = require('./models/chat');
const group = require('./models/group');
const userGroup = require('./models/userGroup');

// Associations
user.hasMany(chat);
chat.belongsTo(user);

group.hasMany(chat);
chat.belongsTo(group);

user.hasMany(userGroup);
group.hasMany(userGroup);

userGroup.belongsTo(user);
userGroup.belongsTo(group);

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
app.use('/user', groupRoute);

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

