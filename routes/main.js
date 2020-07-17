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

module.exports = router;