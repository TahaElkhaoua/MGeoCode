const mongoose = require('mongoose');

let gridSchema = new mongoose.Schema({
    alias: String,
    coords: [
        [
            {
                idAlias: Number,
                alias: String,
                leftBot: {lat: Number, lng: Number},
                rightBot: {lat: Number, lng: Number},
                rightTop: {lat: Number, lng: Number},
                leftTop: {lat: Number, lng: Number},
            }
        ]
    ]

}, {useTimestamps: true});


let Grid = mongoose.model('Grid', gridSchema);
module.exports = Grid;