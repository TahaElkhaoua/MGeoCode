const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    profile: {
        fName: String,
        lName: String,
        address: String,
        phone: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error('Email format not valid!');
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer
    }
}, {useTimeStamps: true});

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10);
        // user.save(); 
    } 
    next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;