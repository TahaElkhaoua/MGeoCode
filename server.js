const path = require('path');
const mongoose = require('mongoose');
//ADD DATABASE CONNECTION
require('./database/mongoose');

//SERVER 
const express = require('express');
const app = express();

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

app.use('/', require('./routes/main'));





//[TESTING PURPOSES ROUTES]
app.post('/create-grid', async (req, res)=>{

    const grid = new Grid();
    await grid.save();
    res.json(grid);

});

app.post('/create-grid/:id/:line', async (req, res)=>{
    const grid = await Grid.findOne({_id:  (req.params.id)});
    if(!grid)
        return res.status(404).send();

        let arr = grid.coords[req.params.line] || [];
        arr.push(JSON.parse(req.body.obj));

        if(grid.coords[req.params.line])
            grid.coords[req.params.line] = arr;
        else
            grid.coords.push(arr);


        await grid.save();
    res.send('success');
});

app.post('/create-grid-lat/:id/:line', async (req, res)=>{
    const grid = await Grid.findOne({_id:  (req.params.id)});
    if(!grid)
        return res.status(404).send();

        grid.coords.push(JSON.parse(req.body.data));


        await grid.save();
    res.send('success');
});

app.post('/get-grid/:id', async (req, res)=>{
    const grid = await Grid.findOne({_id:  (req.params.id)});
    if(!grid)
    return res.status(404).send();

    res.json(grid);
});









// app.get('/', (req, res)=>{
//     const grid = new Grid({
//         alias: "Casa",
//         coords: [
//             [
//                 {
//                     id: 1,
//                     alias: "String",
//                     leftBot: {lat: 2, lng: 2},
//                     rightBot: {lat: 2, lng: 2},
//                     rightTop: {lat: 2, lng: 2},
//                     leftTop: {lat: 2, lng: 2},
//                 },
//                 {
//                     id: 1,
//                     alias: "String",
//                     leftBot: {lat: 2, lng: 2},
//                     rightBot: {lat: 2, lng: 2},
//                     rightTop: {lat: 2, lng: 2},
//                     leftTop: {lat: 2, lng: 2},
//                 }
//             ],
//             [
//                 {
//                     id: 1,
//                     alias: "String",
//                     leftBot: {lat: 2, lng: 2},
//                     rightBot: {lat: 2, lng: 2},
//                     rightTop: {lat: 2, lng: 2},
//                     leftTop: {lat: 2, lng: 2},
//                 },
//                 {
//                     id: 1,
//                     alias: "String",
//                     leftBot: {lat: 2, lng: 2},
//                     rightBot: {lat: 2, lng: 2},
//                     rightTop: {lat: 2, lng: 2},
//                     leftTop: {lat: 2, lng: 2},
//                 }
//             ]
//         ]
//     });

//     res.json(grid);
// });



app.listen(port, (err)=>{
    if(!err)
        console.log(`server listening on port #${port}`);
    else 
        console.log(err.message);
});