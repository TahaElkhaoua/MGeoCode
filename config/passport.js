const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const User = require('../models/User');

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{

    const user = await User.findOne({email});
    if(!user)
        return done(null, false, req.flash('error', 'User could not be found'));

    if(! await bcrypt.compare(password, user.password))
        return done(null, false, req.flash('error', 'Passwords do not match'));

    return done(null, user);
}));

passport.serializeUser((user, done)=>{ return done(null, user._id)});
passport.deserializeUser(async (_id, done) => {
    return done(null, await User.findOne({_id}));
});


module.exports = passport;