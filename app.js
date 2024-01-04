require('dotenv').config();

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const connectDB = require('./server/config/db')

const app = express();

const PORT = 3000 || process.env.PORT;

// connect to DB
connectDB()

// adding middleware
app.use(express.urlencoded( { extended: true}))
app.use(express.json())

// public folder setting
app.use(express.static('public'))

// templating engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

// routes: 
app.use('/', require('./server/routes/main'))

app.listen(PORT, ()=> {
    console.log(`Listening on port: ${PORT}`);
})

