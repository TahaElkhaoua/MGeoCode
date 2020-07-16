(function(win, doc, mapster){
    // var options =  {
    //     center: {lat : 33.5803154,lng: -7.6036127}, //Casa Center
    //     zoom: 12,
    //     disableDefaultUI: true,
    //     styles: win.mapStyle1
    //     };
    // var element = document.querySelector('.map');
    // var map = mapster.create(element,options);

    var casaPolyHandlerS = new PolyHandler(
        {lat: 33.5803154,lng : -7.6036127},
        .001,.0008,
        casaPoly,
        'S'
    );    
    casaPolyHandlerS.createGrid(win.casaPoly.getArr()); // Create Grid Since The Parametre is passed Empty

    var casaPolyHandlerM = new PolyHandler(
        {lat: 33.5803154,lng : -7.6036127},
        .003,.001,
        casaPoly,
        'M'
    );    
    casaPolyHandlerM.createGrid(win.casaPoly.getArr()); // Create Grid Since The Parametre is passed Empty

    var casaPolyHandlerL = new PolyHandler(
        {lat: 33.5803154,lng : -7.6036127},
        .006,.003,
        casaPoly,
        'L'
    );    
    casaPolyHandlerL.createGrid(win.casaPoly.getArr()); // Create Grid Since The Parametre is passed Empty






    var casaCity = new CityMap(casaPolyHandlerS, casaPolyHandlerM, casaPolyHandlerL);
    win.startStoreProcess = function(){
        casaCity.storeInDatabase('Casablanca');
    }
    win.store = function(idS, idM, idL){
        casaCity.storeInDatabase('Casablanca',idS , idM, idL);
    }

    // casaCity.createId();
    // console.log(casaCity);
    // casaCity.storeInDatabase("5f0f15faed96be38300036fa");
    // casaCity.retrieveFromDatabase('5f0de67bf530762d6838a9e3', function(){
    //     casaCity.drawAll(map);
        // win.find = function(lat, lng){
        //     console.log(casaPolyHandler.findZone({lat, lng}));
        // }
    // });

})(window, document, window.Mapster || (window.Mapster = {}));