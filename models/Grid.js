const mongoose = require('mongoose');

let gridSchema = new mongoose.Schema({
    size: {
        type: String,
        maxlength: 1,
        minlength: 1,
        required: true
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'City',
        required: true
    }, 
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

}, {timestamps: true});


let Grid = mongoose.model('Grid', gridSchema);
module.exports = Grid;