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
        new LatLng(33.5803154,-7.6036127),
        .001,.0008
    );

    // map.addPoly(win.casaPoly.getArr());
    casaPolyHandler.createGrid(win.casaPoly.getArr()).getArr().forEach(function(latArr){
        latArr.getArr().forEach(function(rect){
            map.addPoly(rect.getPath(), function(e){
                console.log(rect);
            });
        });
    });
    win.find = function(lat, lng){
        console.log(casaPolyHandler.findZone(new LatLng(lat, lng)));
    }


    

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