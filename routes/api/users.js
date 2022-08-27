const express = require('express')
const router = express.Router();
const authController = require('../../controller/authController')
const userController = require('../../controller/userController')
const passport = require('passport')

router.get('/', authController.allUser)

router.post('/register', authController.register)

router.post('/login', authController.login)

router.get('/current', authController.protect, (req, res) => {
    res.json(req.user)
})

router.patch('/updateMe', authController.protect, userController.uploadUserPhoto, userController.updateMe)

module.exports = router;