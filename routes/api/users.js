const express = require('express')
const router = express.Router();
const authController = require('../../controller/authController')
const passport = require('passport')

router.get('/', authController.allUser)

router.post('/register', authController.register)

router.post('/login', authController.login)

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user)
})

module.exports = router;