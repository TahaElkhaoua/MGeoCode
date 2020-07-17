

(function(win, doc, mapster){
    var options =  {
        center: {lat : 33.5803154,lng: -7.6036127}, //Casa Center
        zoom: 12,
        disableDefaultUI: true,
        styles: win.mapStyle1
        };
    var element = document.querySelector('.map');
    var map = mapster.create(element,options);

    var mapC = MainController.create(map);
    mapC.retrieveCities();



    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } 
      }
      var self = this;
    win.showPosition = function(position){
        // map._zoomToObject(undefined, [{lat: position.coords.latitude,lng:  position.coords.longitude}]);
    }
    getLocation();
  


    win.check = function(element, changer){
        var ele = document.querySelector("#"+changer);
        var ele2 = document.querySelector('.'+changer);
        if(ele.classList.contains('options__conf--show')){
             ele.classList.remove('options__conf--show');
             ele2.classList.remove('options__svg__conf--show');
        }else{
        ele.classList.add('options__conf--show');
        ele2.classList.add('options__svg__conf--show');
        }
    }
    map.gMap.setZoom(13);


})(window, document, window.Mapster || (window.Mapster = {}));