const express = require('express');
const router = express.Router();
const authenticateController=require('../middleware/auth');
const groupController=require('../controllers/createGroup');
router.post('/creategroup',authenticateController.authenticate, groupController.postCreateGroup);
router.get('/allgroups',authenticateController.authenticate, groupController.allGroups);
router.get('/allusers',authenticateController.authenticate, groupController.allUsers);
router.post('/adduser',authenticateController.authenticate, groupController.addUser);
router.post('/deleteuser',authenticateController.authenticate, groupController.deleteUser);

module.exports = router;