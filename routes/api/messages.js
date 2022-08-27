const express = require('express');
const router = express.Router();
const messageController = require('../../controller/messageController')
const authController = require('../../controller/authController')

router.get('/conversations', authController.protect, messageController.conversations)
router.get('/conversations/query', authController.protect, messageController.conversationsQuery)
router.post('/', authController.protect, messageController.privateMessage)

module.exports = router;
