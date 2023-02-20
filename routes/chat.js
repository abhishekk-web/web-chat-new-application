const express = require('express');
const chatController = require('../controllers/chat');
const authController = require('../middleware/auth');

const router = express.Router();

router.post("/chat", authController.authenticate, chatController.chat);

module.exports = router;