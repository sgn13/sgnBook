const User = require('../models/User')
const catchAsync = require('../utils/catchAsync')
const multer = require('multer')
const appError = require('../utils/appError')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image/users')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `user=${req.user.id}-${Date.now()}.${ext}`)
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new appError('Not an image! Please upload only image', 404), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadUserPhoto = upload.single('avatar')

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}

// exports.getUsers = catchAsync(async (req, res, next) => {
//     const users = await User.find()
//     res.status(201).json({
//         status: 'success',
//         data: {
//             user: users
//         }
//     })
// })

exports.updateMe = catchAsync(async (req, res, next) => {

    if (req.body.password) {
        return next(new appError("This route is not for password update", 401))
    }
    const filteredObject = filterObj(req.body, 'name', 'email')

    if (req.file) filteredObject.avatar = req.file.filename

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObject, {
        new: true,
        runValidators: true
    })
    console.log(updatedUser);

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })

})

// exports.deleteMe = catchAsync(async (req, res, next) => {

//     await User.findByIdAndUpdate(req.user.id, { active: false })
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })

// })