const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const isAuthenticated = require('../middleware/auth');
const genKey = require('../middleware/apikey');

const User = require('../models/User');
const City = require('../models/City');
const { route } = require('./generator');
const Grid = require('../models/Grid');
const Poly = require('../models/Poly');
const Stat = require('../models/Stat');

router.get('/', isAuthenticated, (req, res)=>{
    res.render('index');
});
router.get('/landing', (req, res)=>{
    res.render('landing', {
        errors: req.flash('error')
    });
});

router.post('/create-user', async (req, res)=>{
    const user = new User({
        profile: {
            ...req.body
        },
        ...req.body
    });
    await user.save();
    res.send('Recieved');
});


router.get('/logged', (req, res)=>{
    res.send('SUCCESS');
});

router.get('/failed', (req, res)=>{
    res.send(`*error : ${req.flash('error')}`);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/logged',
    failureRedirect: '/failed'
}));

router.get('/get-user', isAuthenticated, (req, res)=>{
    res.json(req.user._id);
});

router.post('/get-all-cities', isAuthenticated, async (req, res)=>{
    const cities = await City.find({});
    res.json(cities);
});

//DEVELOPEMENT ROUTE ==> NOT ANYMORE
router.post('/insert-city/:cid/:gSize', isAuthenticated, async (req, res)=>{
    const user = await User.findOne({_id: req.user._id});
    if(!user.grids)
        user.grids = [];


    const grid = await Grid.findOne({city: req.params.cid, size:  req.params.gSize});

    if(!grid)
        return res.status(404).send();

    user.grids.push({
        city: req.params.cid,
        grid: grid._id
    });

    await user.save();
    res.json(user);
});

router.post('/has-city-grid', isAuthenticated, async (req, res)=>{
    const user = await User.findOne({_id: req.user._id});
    
    let data = [];
    for(var i=0;i<user.grids.length;i++){

        let size = 0;
        let g = await Grid.findOne({_id: user.grids[i].grid});
        g.coords.forEach(e => {
            size += e.length;
        });
        data.push({city: user.grids[i].city, grid: g._id,size});
    }

    res.json(data);
});

router.post('/get-grids/:id', isAuthenticated, async (req, res)=>{
    const grid = await Grid.findOne({_id: req.params.id});
    res.json(grid.coords);
});

router.post('/get-polies/:id', isAuthenticated, async (req, res)=>{
    const p = await Poly.findOne({_id: req.params.id});
    if(!p)
        return res.status(404).send('ERROR');

    res.json(p.coords);
});






///API GEN ROUTE

router.post('/gen-key', isAuthenticated, genKey, async (req, res)=>{
    const user = await User.findOne({_id: req.user._id});
    if(user.apikeys.length <3){
        user.apikeys.push({
            key: req.key
        });
        await user.save();
        res.send(req.key);
    }else {
        res.send('Only Three keys allowed per user');
    }
    
});



//Statistical Module Response Route

router.post('/month-stats', isAuthenticated,async (req, res)=>{
    let user = req.user._id;
    // let user = req.body.user;
    let city = req.body.city;

    let date = new Date();
    let year = "-"+date.getFullYear();
    let month = req.body.month;


    let stats = await Stat.findOne({user, city});
    //if stats exist
    if(stats){
        //if a specefic month is selected
        if(month !== '0'){
            let total = 0;
            let selector = month+year;
            let data = [];
            for(let x=0;x<stats.data.length;x++){
                if(selector in stats.data[x]){
                    total += stats.data[x][selector];

                    data.push({
                        counter: stats.data[x][selector],
                        rect: stats.data[x].rect
                    });
                }
            }



            let obj = {
                total: total,
                data: data
            };

            res.json(obj);
        }else {

            let total = 0;
            let selector = month+year;
            let data = [];
            for(let x=0;x<stats.data.length;x++){
                let counter = 0;
                for(let n=1;n<=12;n++){
                    selector = n+year;
                    if(selector in stats.data[x]){
                        total += stats.data[x][selector];
                        counter += stats.data[x][selector];
                    }
                }
               if(counter !=0){
                data.push({
                    counter: counter,
                    rect: stats.data[x].rect
                });
               }
            }



            let obj = {
                total: total,
                data: data
            };

            res.json(obj);
        }

    }else {
        res.json({total: 0});
    }

});


router.post('/zone-stats/:city/:zone', isAuthenticated,async (req, res)=>{
    let user = req.user._id;
    // let user = req.body.user;
    let city = req.params.city;
    let zone = Number.parseInt(req.params.zone);

    let stats = await Stat.findOne({user, city, 'data.zone': zone});
    if(stats){

        stats.data.forEach((statData)=>{
            if(statData.zone == zone){
                const obj = {};
                for(var x=1;x<=12;x++){
                    const selector = x + '-' + (new Date()).getFullYear();
                    if(selector in statData){
                        obj[""+x] = statData[selector];
                    }else{
                        obj[""+x] = 0;
                    }
                }
                res.json(obj);
                return;
            }
        });

    }else {
        res.json({});
    }
});

router.post('/update', isAuthenticated, async (req, res)=>{
    const user = await User.findOne({_id: req.user._id});

    const phone = (req.body.phone.length > 8) ? req.body.phone : user.phone ;
    const email = (req.body.email.length > 5) ? req.body.email : user.email;
    const password = (req.body.password.length > 5) ? req.body.password : user.password;

    user.profile.phone = phone;
    user.email = email;
    user.password = password;

    try {
        await user.save();
        res.status(200).send("Success");
    }catch(e){
        res.status(400).send("Could not update");
    }
});

router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

module.exports = router;