(function(win, doc, google, List){


    //Mapster Module
    var Mapster = (function(){

        function Mapster(element, opts){
            this.gMap = new google.maps.Map(element, opts);
            this.markers = List.create();
        }
        Mapster.prototype = {
            zoom: function(value){
                if(value)
                    this.gMap.setZoom(value);
                else 
                    return this.gMap.getZoom();
            },
            _on: function(opts){
                var self = this;
                google.maps.event.addListener(opts.obj, opts.event, function(e){
                    (opts.callback).call(self, e);
                });
            },
            addMarker: function(opts){
                var marker;
                opts.position= {
                    lat: opts.lat,
                    lng: opts.lng
                };
                marker = this._createMarker(opts);
                this.markers.add(marker);
                if(opts.event){
                    this._on({
                        obj: marker,
                        event: opts.event.name,
                        callback: opts.event.callback 
                    });
                };
                if(opts.content){
                    this._on({
                        obj: marker,
                        event: 'click',
                        callback: function(e){
                            var info = new google.maps.InfoWindow({
                                content: opts.content
                            });
                            info.open(this.gMap, marker);
                        }

                    });
                }
                return marker;
            },
            findBy: function(callback){
                return this.markers.find(callback);
            },
            removeBy: function(callback){
                var self = this;
                this.markers.find(callback, function(items){
                    items.forEach(function(marker){
                        marker.setMap(null);
                        self.markers.remove(marker);
                    });
                })
            },
            _createMarker: function(opts){
                opts.map = this.gMap;
                return new google.maps.Marker(opts);
            },
            addPoly: function(path, action){
                var poly = new google.maps.Polygon({
                    paths: path,
                    strokeColor: '#FFF',
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: '#54a0ff',
                    fillOpacity: .3
                  });
                  google.maps.event.addListener(poly, 'click', action);
                  poly.setMap(this.gMap);
                  return poly;
            }
        };

        return Mapster;
    })();

    Mapster.create = function(e, o){
        return new Mapster(e, o);
    };


    win.Mapster = Mapster;
})(window, document, google, window.List);