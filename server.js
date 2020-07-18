const path = require('path');
const mongoose = require('mongoose');
//ADD DATABASE CONNECTION
require('./database/mongoose');

//SERVER 
const express = require('express');
const app = express();

const compression = require('compression');

const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');


//SEREVR VIEWS
const ejsMate = require('ejs-mate');

const port = process.env.PORT || 5000;

const Grid = require('./models/Grid');


const publicPath = path.join(__dirname, 'public');

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.use(compression());
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(flash());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'Secret',
    cookie: {secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/api'));
app.use('/', require('./routes/main'));
app.use('/generator', require('./routes/generator')); //MAP DATA GENERATOR SHOULD BE A PRIVATE ROUTE





app.listen(port, (err)=>{
    if(!err)
        console.log(`server listening on port #${port}`);
    else 
        console.log(err.message);
});