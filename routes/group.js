const express = require('express');
const groupController = require('../controllers/group');
const authController = require('../middleware/auth');

const router = express.Router();

router.post('/group', authController.authenticate, groupController.group);

router.get('/getgroup', authController.authenticate, groupController.getGroup);

module.exports = router;