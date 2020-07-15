const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');


const Grid = require('../models/Grid');

const isAdmin = (req, res, next)=>{
    if(!req.user.admin)
        res.redirect('/');
    next();
}

router.use(isAuthenticated);
router.use(isAdmin);

router.get('/', (req, res)=>{
    res.render('generator');
});

//[TESTING PURPOSES ROUTES]
router.post('/create-grid', async (req, res)=>{

    const grid = new Grid();
    await grid.save();
    res.json(grid);

});

router.post('/create-grid/:id/:line', async (req, res)=>{
    const grid = await Grid.findOne({_id:  (req.params.id)});
    if(!grid)
        return res.status(404).send();

        let arr = grid.coords[req.params.line] || [];
        arr.push(JSON.parse(req.body.obj));

        if(grid.coords[req.params.line])
            grid.coords[req.params.line] = arr;
        else
            grid.coords.push(arr);


        await grid.save();
    res.send('success');
});

router.post('/create-grid-lat/:id/:line', async (req, res)=>{
    const grid = await Grid.findOne({_id:  (req.params.id)});
    if(!grid)
        return res.status(404).send();

        grid.coords.push(JSON.parse(req.body.data));


        await grid.save();
    res.send('success');
});

router.post('/get-grid/:id', async (req, res)=>{
    const grid = await Grid.findOne({_id:  (req.params.id)});
    if(!grid)
    return res.status(404).send();

    res.json(grid);
});











module.exports = router;