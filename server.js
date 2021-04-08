const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const uri = process.env.DATABASE_LOCAL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DATABASE IS SUCCESSFULLY CONNECTED');
})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`))