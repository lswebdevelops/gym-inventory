require('dotenv').config();

const express = require('express')
const expressLayout = require('express-ejs-layouts')

const app = express();

const PORT = 3000 || process.env.PORT;

// public folder setting
app.use(express.static('public'))

// templating engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

// routes: 
// instead> 
// app.get('/', (req, res) => {
//     res.send('hello')
// })
app.use('/', require('./server/routes/main'))

app.listen(PORT, ()=> {
    console.log(`Listening on port: ${PORT}`);
})

