const express = require('express');
const router = express.Router();
var inside = require('point-in-polygon');

const User = require('../models/User');
const Grid = require('../models/Grid');
const City = require('../models/City');
const Stat = require('../models/Stat');


const findUser = async (req, res, next)=>{
    let key = req.params.key;
    const user = await User.findOne({'apikeys.key': key});
    req.user = user;


    next();
}

const searchPoly =  async (req, res, next)=>{
    const grids = req.user.grids;
    const lat = req.body.lat;
    const lng = req.body.lng;

    for(let x=0;x<grids.length;x++){
        const gid = grids[x].grid;
        const grid = await Grid.findOne({_id: gid});
        if(grid){
            const coords = grid.coords;
            let counter = 0;

            //Loop through grid coords
            for(let n=0;n<coords.length;n++){
                const latCoords = coords[n];
                for(let l=0;l<latCoords.length;l++){
                    counter++;
                    const rect =  [ 
                        [latCoords[l].leftBot.lat, latCoords[l].leftBot.lng],
                        [latCoords[l].rightBot.lat, latCoords[l].rightBot.lng],
                        [latCoords[l].rightTop.lat, latCoords[l].rightTop.lng],
                        [latCoords[l].leftTop.lat, latCoords[l].leftTop.lng],
                     ];

                     if(inside([lat, lng], rect)){
                         req.zone = counter;
                         req.id = req.user._id;
                         req.city = grid.city;
                         req.rect = rect;
                         next();
                        return ;
                     }
                }
            }
    

        }
    }
}
router.post('/insert-data/:key', findUser, searchPoly, async (req, res)=>{
   
    let date = new Date();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();
    let name = month + "-" +year;


    let obj = `{"zone": ${req.zone}, "${name}": ${1}, "rect": []}`;

    let stat = await Stat.findOne({user: req.id, city: req.city});
   if(!stat){
    obj = JSON.parse(obj);
    obj["rect"] = req.rect;
       stat = new Stat({
        user: req.id,
        city: req.city,
        data: [obj]
       });
       await stat.save();
       res.json(stat);
   }else{
       //Stats Already Exist With same user and city Grid

        //check does zone already have data
        for(let x=0;x<stat.data.length;x++){
            if(stat.data[x].zone == req.zone){

                //object has zone and year&Month
                if(name in stat.data[x]){

                    stat.data[x][name] = stat.data[x][name] + 1;
                    stat.markModified('data');
                    await stat.save();
                    res.json(stat);
                    return ;
                }else{ // Object has zone but year and Month never registered

                    stat.data[x][name] = 1;
                    stat.markModified('data');
                    await stat.save();
                    res.json(stat);
                    return ;
                }   


            }
        }

        //zone does not exist
        obj = JSON.parse(obj);
        obj["rect"] = req.rect;
        stat.data.push();
        await stat.save();
        res.json(stat);
   }

});

module.exports = router;