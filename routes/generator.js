const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');


const Grid = require('../models/Grid');
const Poly = require('../models/Poly');
const City = require('../models/City');

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


router.post('/create-full-grid/:id', async (req, res)=>{
    const grid = await Grid.findOne({_id:  (req.params.id)});
    if(!grid)
        return res.status(404).send();

        grid.coords = (JSON.parse(req.body.data));


        await grid.save();
    res.send('success');
});



router.post('/get-grid/:id', async (req, res)=>{
    const grid = await Grid.findOne({_id:  (req.params.id)});
    if(!grid)
    return res.status(404).send();

    res.json(grid);
});


//Create Polies 

router.post('/create-poly', async (req, res)=>{
    const poly = new Poly({
        coords: JSON.parse(req.body.data).items
    });
    await poly.save();
    res.json(poly._id);
});

//Create City

router.post('/create-city', async(req, res)=>{
    const city = new City({
        name: req.body.name,
        polycords: req.body.polyref
    });
    await city.save();

    const gS = new Grid({size: 'S', city: city._id});
    const gM = new Grid({size: 'M', city: city._id});
    const gL = new Grid({size: 'L', city: city._id});
    
    await gS.save();
    await gM.save();
    await gL.save();

    res.json({
        city: city._id,
        gS: gS._id,
        gM: gM._id,
        gL: gL._id,
    });
});


module.exports = router;