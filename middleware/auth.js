

const isAuthenticated = (req, res, next)=>{
    if(!req.user)
        return res.redirect('/landing');
    res.locals.user = req.user;
    next();
}

module.exports = isAuthenticated;