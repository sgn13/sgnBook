const AppError = require('../utils/appError')

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path} : ${err.value}`
    return new AppError(message, 400)
}

const handleDuplicateFieldsErrorDB = err => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
    const message = `Duplicate field value: ${value}. Please use another value`
    return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    console.log(errors, "helskdnfo");

    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
    })
}

const sendErrorProd = (err, res) => {
    // Operational , trusted error : send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
        //Programming or other unknown error : don't leak error details
    } else {
        console.log('ERROR KNOWN', err);
        res.status(500).json({
            status: 'error',
            message: " Something went very wrong"
        })
    }
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err, name: err.name, errmsg: err.errmsg }
        console.log(error.name);
        if (error.name === 'CastError') error = handleCastErrorDB(error)
        if (error.code === 11000) error = handleDuplicateFieldsErrorDB(error)
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error)
        sendErrorProd(error, res)
    }
}