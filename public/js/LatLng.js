(function(win){

    var LatLng = (function(){

        function LatLng(lat, lng){
            this.lat = lat;
            this.lng = lng;
        }
        LatLng.prototype = {
            gsLL: function(){
                return {lat: this.lat, lng: this.lng};
            },gsLat: function(lat){
                if(lat)
                    return this.lat = lat;
                return this.lat;
            },
            gsLng: function(lng){
                if(lng)
                    return this.lng = lng;
                return this.lng;
            }
        };
        return LatLng;
    })();

    LatLng.create = function(lat, lng){
        return new LatLng(lat, lng);
    }

    win.LatLng = LatLng;
})(window);