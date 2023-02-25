const jwt = require('jsonwebtoken');
const user = require('../models/user');
const group = require('../models/group');

// this is the middleware function for authentication
exports.authenticate = async(req, res, next) => {

    try {

        const token = req.header("Authorization");
        const userId = jwt.verify(token, "secrets");
        const theUser = await user.findByPk(userId.userId);
        
        req.user = theUser;
        next();

    }

    catch(err) {
        return res.status(400).json({success: false});
    }

}