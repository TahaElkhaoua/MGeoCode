const mongoose = require('mongoose');

const polySchema = new mongoose.Schema({
    coords: [
        {
            lat: Number,
            lng: Number
        }
    ]
}, {timestamps: true});

const Poly = mongoose.model('Poly', polySchema);
module.exports = Poly;