const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    polycords: {
        type: mongoose.Types.ObjectId,
        ref: 'Poly'
    }
},
{timestamps: true});


const City = mongoose.model('City', citySchema);

module.exports = City;