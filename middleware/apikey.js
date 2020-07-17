const rand = require('generate-key');

const genKey = (req, res, next)=>{
    req.key = rand.generateKey(); 
next();
};

module.exports = genKey;