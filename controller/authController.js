const User = require('../models/User')
const { promisify } = require('util')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const gravatar = require('gravatar')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

exports.allUser = async (req, res) => {
    const all_user = await User.find();
    res.json(all_user)
}

exports.register = async (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    let { name, email, password, avatar, date } = req.body;

    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
        errors.email = "Email already exists."
        return res.status(400).json(errors)
    }

    //Hashing
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt)

    const avatarSave = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    const newUser = new User({
        name,
        email,
        password: passwordHash,
        avatar: avatarSave
    })

    const user = await newUser.save();
    res.json({ user })

}

//@route    GET api/users/login
//@desc     LOGIN USER / RETURN JWT TOKEN
//@access   PUBLIC

exports.login = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    let { email, password } = req.body;

    const user = await User.findOne({ email: email })

    if (!user) {
        errors.email = "There is no email as per your input."
        return res.status(400).json(errors)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        errors.password = "Incorrect password"
        return res.status(400).json(errors)
    }

    const payload = { id: user.id, name: user.name, email: user.email, avatar: user.avatar }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 36000 })

    res.json({
        success: true,
        token: 'Bearer ' + token
    })

}

exports.protect = catchAsync(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1]
    }
    // if (!token) {
    //     return next(new appError("You are not loggedin", 401))
    // }
    // 2) verify token
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY)
    // 3) check if user still exists

    const currentUser = await User.findById(decoded.id)
    // if (!currentUser) {
    //     return next(new appError(`The user belonging to this token is no longer exists`, 401))
    // }

    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     return next(new appError("User recently changed password! Please login again", 401))
    // }

    req.user = currentUser
    // console.log(req.user);
    next()
})