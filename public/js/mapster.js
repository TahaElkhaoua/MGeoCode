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
            addListener: function(event, callback){
                this.gMap.addListener(event, function(e){
                    alert('Hi');
                    callback(e);
                });
            },
            _createMarker: function(opts){
                opts.map = this.gMap;
                return new google.maps.Marker(opts);
            },
            addPoly: function(path, action){
                var poly = new google.maps.Polygon({
                    paths: path,
                    strokeColor: '#ecf0f1',
                    strokeOpacity: .8,
                    strokeWeight: 2,
                    fillColor: '#34495e',
                    fillOpacity: .1
                  });
                  if(action)
                  google.maps.event.addListener(poly, 'click', action);

                  poly.setMap(this.gMap);
                  this._zoomToObject(poly);
                  return poly;
            },
            addStatPoly: function(path, op, action){
                var opa = (op > .4) ? op : .4;
                    var poly = new google.maps.Polygon({
                        paths: path,
                        strokeColor: '#f1c40f',
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        fillColor: '#f1c40f',
                        fillOpacity: op,
                        zIndex: 100
                      });
                      if(action)
                        google.maps.event.addListener(poly, 'click', action);
    
                      poly.setMap(this.gMap);
                      this._zoomToObject(poly);
                      return poly;
            },
            addSearchPoly: function(path, action){
                var poly = new google.maps.Polygon({
                    paths: path,
                    strokeColor: '#ecf0f1',
                    strokeOpacity: 0,
                    strokeWeight: 4,
                    fillColor: '#ff7675',
                    fillOpacity: .7,
                    zIndex: 50
                  });
                  if(action)
                  google.maps.event.addListener(poly, 'click', action);

                  poly.setMap(this.gMap);
                  this._zoomToObject(poly);
                  return poly;
            },
            addGrid: function(path, action){
                var poly = new google.maps.Polygon({
                    paths: path,
                    strokeColor: '#ecf0f1',
                    strokeOpacity: 1,
                    strokeWeight: .5,
                    fillColor: '#81ecec',
                    fillOpacity: .3
                  });
                  if(action)
                    google.maps.event.addListener(poly, 'click', function(e){
                        action(e);
                    });

                  poly.setMap(this.gMap);
                //   this._zoomToObject(poly);
                  return poly;
            },
            _zoomToObject: function(obj, arr){
                var bounds = new google.maps.LatLngBounds();
                var points = [];
                if(typeof obj !== 'undefined')
                    points = obj.getPath().getArray();
                    else 
                        points = arr;
                for (var n = 0; n < points.length ; n++){
                    bounds.extend(points[n]);
                }
                if(obj == undefined)
                    this.gMap.fitBounds(bounds);

            }
        };

        return Mapster;
    })();

    Mapster.create = function(e, o){
        return new Mapster(e, o);
    };


    win.Mapster = Mapster;
})(window, document, google, window.List);