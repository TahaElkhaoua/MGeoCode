(function(win, doc, mapster){
    var options =  {
        center: {lat : 33.5803154,lng: -7.6036127}, //Casa Center
        zoom: 12,
        disableDefaultUI: true,
        styles: win.mapStyle1
        };
    var element = document.querySelector('.map');
    var map = mapster.create(element,options);

    var casaPolyHandler = new PolyHandler(
        {lat: 33.5803154,lng : -7.6036127},
        .001,.0008
    );
    var casaCity = new CityMap(casaPolyHandler);



    // casaPolyHandler.createGrid(win.casaPoly.getArr());
    // casaCity.createId();
    // console.log(casaCity);
    // casaCity.storeInDatabase('5f0e06bd51ea6558c05d88e6');
    // casaCity.retrieveFromDatabase('5f0de67bf530762d6838a9e3', function(){
    //     casaCity.drawAll(map);
        // win.find = function(lat, lng){
        //     console.log(casaPolyHandler.findZone({lat, lng}));
        // }
    // });

})(window, document, window.Mapster || (window.Mapster = {}));