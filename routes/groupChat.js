const express = require('express');
const router = express.Router();
const authenticateController=require('../middleware/auth');
const groupChatController=require('../controllers/groupChat');

router.get('/allusersgroup',authenticateController.authenticate, groupChatController.allUserGroups);
router.post('/groupmessage',authenticateController.authenticate, groupChatController.groupMessage);
router.get('/allgroupmessages/:groupchat',authenticateController.authenticate, groupChatController.allGroupMesssage);

module.exports = router;