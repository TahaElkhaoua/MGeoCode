(function(win, doc, mapster){
    // var options =  {
    //     center: {lat : 33.5803154,lng: -7.6036127}, //Casa Center
    //     zoom: 12,
    //     disableDefaultUI: true,
    //     styles: win.mapStyle1
    //     };
    // var element = document.querySelector('.map');
    // // var map = mapster.create(element,options);

    // var casaPolyHandlerS = new PolyHandler(
    //     {lat: 33.5803154,lng : -7.6036127},
    //     .001,.0008,
    //     casaPoly,
    //     'S'
    // );    
    // casaPolyHandlerS.createGrid(win.casaPoly.getArr()); // Create Grid Since The Parametre is passed Empty
    // var casaPolyHandlerM = new PolyHandler(
    //     {lat: 33.5803154,lng : -7.6036127},
    //     .003,.001,
    //     casaPoly,
    //     'M'
    // );    
    // casaPolyHandlerM.createGrid(win.casaPoly.getArr()); // Create Grid Since The Parametre is passed Empty
    // var casaPolyHandlerL = new PolyHandler(
    //     {lat: 33.5803154,lng : -7.6036127},
    //     .006,.003,
    //     casaPoly,
    //     'L'
    // );    
    // casaPolyHandlerL.createGrid(win.casaPoly.getArr()); // Create Grid Since The Parametre is passed Empty
    // var casaCity = new CityMap(casaPolyHandlerS, casaPolyHandlerM, casaPolyHandlerL);


    ////////////////////////////////////////////////////
    
    var rabatPolyHandlerS = new PolyHandler(
        {lat: 34.0378992,lng: -6.8427075},
        .001,.0008,
        rabatPoly,
        'S'
    );    
    rabatPolyHandlerS.createGrid(); // Create Grid Since The Parametre is passed Empty
    var rabatPolyHandlerM = new PolyHandler(
        {lat: 34.0378992,lng: -6.8427075},
        .003,.001,
        rabatPoly,
        'M'
    );    
    rabatPolyHandlerM.createGrid(win.rabatPoly.getArr()); // Create Grid Since The Parametre is passed Empty
    var rabatPolyHandlerL = new PolyHandler(
        {lat: 34.0378992,lng: -6.8427075},
        .006,.003,
        rabatPoly,
        'L'
    );    
    rabatPolyHandlerL.createGrid(win.rabatPoly.getArr()); // Create Grid Since The Parametre is passed Empty
    var rabatCity = new CityMap(rabatPolyHandlerS, rabatPolyHandlerM, rabatPolyHandlerL);


    //////////////////////////////////////////////


    win.startStoreProcess = function(city){
        switch(city){
            case 'casa': 
                casaCity.storeInDatabase('Casablanca');
                break;
            case 'rabat': 
                rabatCity.storeInDatabase('Sale');
                break;
        }
    }
    win.store = function(city,idS, idM, idL){
        switch(city){
            case 'casa': 
                casaCity.storeInDatabase('Casablanca',idS , idM, idL);
                break;
            case 'rabat': 
                rabatCity.storeInDatabase('Sale',idS , idM, idL);
                break;
        }
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