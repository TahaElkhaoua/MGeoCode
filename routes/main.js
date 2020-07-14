const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const isAuthenticated = require('../middleware/auth');

const User = require('../models/User');

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

module.exports = router;