const express = require('express');
const app = express();
const users = require('./routes/api/users')
// const profile = require('./routes/api/profile')
// const posts = require('./routes/api/posts')
// const messages = require('./routes/api/messages')
const passport = require('passport')
const dotenv = require('dotenv');
const cors = require('cors')

app.use(cors())

dotenv.config();


app.use(express.json())
app.use('/static', express.static('./public/image/posts'))
app.use('/staticUser', express.static('./public/image/users'))

//Passport middleware
app.use(passport.initialize())

//Passport config
require('./controller/passport')(passport);

// app.use('/api/users', users)
// app.use('/api/profile', profile)
// app.use('/api/posts', posts)
// app.use('/api/messages', messages)
// app.use("/api/messages", messages);

module.exports = app;