const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    user: {
        type : mongoose.Types.ObjectId,
        required:  true,
        ref: 'User'
    },
    city: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'City'
    },
    data: []
},{timestamps: true});

const Stat = mongoose.model('Stat', statSchema);
module.exports = Stat;