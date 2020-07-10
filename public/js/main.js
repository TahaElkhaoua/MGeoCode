(function(win, doc, mapster){
    var options =  {
        center: {lat : 33.351177, lng : -7.577820}, //Casa Center
        zoom: 11,
        disableDefaultUI: true
    };
    var element = document.querySelector('.map');
    var map = mapster.create(element,options);

    

    map.addPoly(win.casaPoly.getArr());



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