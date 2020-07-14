(function(win, doc, mapster){
    var options =  {
        center: {lat : 33.5803154,lng: -7.6036127}, //Casa Center
        zoom: 12,
        disableDefaultUI: true,
        styles: win.mapStyle2
        };
    var element = document.querySelector('.map');
    var map = mapster.create(element,options);

    var casaPolyHandler = new PolyHandler(
        {lat: 33.5803154,lng : -7.6036127},
        .001,.0008
    );

    // casaPolyHandler.createGrid(win.casaPoly.getArr());
    var casaCity = new CityMap(casaPolyHandler);
    // casaCity.createId();
    // casaCity.storeInDatabase('5f0de67bf530762d6838a9e3');
    // casaCity.retrieveFromDatabase('5f0de67bf530762d6838a9e3');

    // map.addPoly(win.casaPoly.getArr());
    // var i = 0;
    // casaPolyHandler.createGrid(win.casaPoly.getArr()).getArr().forEach(function(latArr){
    //     i++;
    //     latArr.getArr().forEach(function(rect){
    //         map.addPoly(rect.getPath());
    //         database.ref('Casa/'+i+'/'+rect.gsId()).set(rect.toObj());
    //     });
    // });

    // var total = new List();
    // database.ref('Casa').once('value', function(snapshot){
    //     snapshot.forEach(function(snapshotChild){
    //         var part = new List();
    //         snapshotChild.forEach(function(actualChild){
    //             var obj = actualChild.val();

    //             part.add( new Rect(new LatLng(obj.center.lat, obj.center.lng),
    //             [new LatLng(obj.leftBot.lat, obj.leftBot.lng),
    //                  new LatLng(obj.rightBot.lat, obj.rightBot.lng),
    //                  new LatLng(obj.rightTop.lat, obj.rightTop.lng),
    //                  new LatLng(obj.leftTop.lat, obj.leftTop.lng)],
    //             obj.id,
    //             obj.alias
    //         ));

    //         });
    //         total.add(part);
    //     });
    // });

    // casaPolyHandler = new PolyHandler(
    //     new LatLng(33.5803154,-7.6036127),
    //     .001,.0008,
    //     total
    // );

    // win.draw = function(){
    //     casaPolyHandler.getArr().getArr().forEach(function(anotherArr){
    //         anotherArr.getArr().forEach(function(rect){
    //             map.addPoly(rect.getPath());
    //         });
    //     });
    // }
    
    // win.find = function(lat, lng){
    //     console.log(casaPolyHandler.findZone(new LatLng(lat, lng)));
    // }


    

    // var marker = map.addMarker({
    //     id: 66,
    //     lat: 38,
    //     lng: -122,
    //     content: 'Hello It s the web',
    //     event: {
    //         name: 'click',
    //         callback: function(e){
    //         }
    //     }
    // });

    // for(var i = 0;i<50;i++){
    //     map.addMarker({
    //         id: i,
    //         lat: 38 + Math.random(),
    //         lng: -122 + Math.random(),
    //         content: 'Hello It s the web',
    //     });
    // }
    // var found = map.findBy(function(marker){
        // return marker.id === 2;
    // });
    // map._removeMarker(marker);


})(window, document, window.Mapster || (window.Mapster = {}));