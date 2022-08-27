const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const messages = require('./routes/api/messages')
const socketio = require('socket.io')
const http = require('http')

var server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
})

dotenv.config();

const uri = process.env.DATABASE_LOCAL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DATABASE IS SUCCESSFULLY CONNECTED');
})

// Assign socket object to every request
app.use(function (req, res, next) {
    req.io = io;
    next();
});

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)
app.use('/api/messages', messages)

io.on('connection', function (socket) {
    console.log('socket.io connection made');
});

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`))