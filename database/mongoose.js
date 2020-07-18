const mongoose = require('mongoose');

mongoose.connect('mongodb://tahaelkhaoua:9nNEEFL7FbPgb1M8@ds115353.mlab.com:15353/mgeocode', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});