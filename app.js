const express = require('express');
const app = express();
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const passport = require('passport')
const dotenv = require('dotenv');
const cors = require('cors')

app.use(cors())

dotenv.config();


app.use(express.json())

//Passport middleware
app.use(passport.initialize())

//Passport config
require('./controller/passport')(passport);

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

module.exports = app;