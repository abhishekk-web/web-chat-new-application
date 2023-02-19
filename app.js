const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');

const app = express();

app.use(bodyParser.json({extended: false}));
app.use(cors());

const userRoute = require('./routes/user');

app.use("/user", userRoute);

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

