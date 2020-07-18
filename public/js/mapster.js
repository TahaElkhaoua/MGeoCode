!function(t,e,n,o){var a=function(){function t(t,e){this.gMap=new n.maps.Map(t,e),this.markers=o.create()}return t.prototype={zoom:function(t){if(!t)return this.gMap.getZoom();this.gMap.setZoom(t)},_on:function(t){var e=this;n.maps.event.addListener(t.obj,t.event,function(n){t.callback.call(e,n)})},addMarker:function(t){var e;return t.position={lat:t.lat,lng:t.lng},e=this._createMarker(t),this.markers.add(e),t.event&&this._on({obj:e,event:t.event.name,callback:t.event.callback}),t.content&&this._on({obj:e,event:"click",callback:function(o){new n.maps.InfoWindow({content:t.content}).open(this.gMap,e)}}),e},findBy:function(t){return this.markers.find(t)},removeBy:function(t){var e=this;this.markers.find(t,function(t){t.forEach(function(t){t.setMap(null),e.markers.remove(t)})})},addListener:function(t,e){this.gMap.addListener(t,function(t){alert("Hi"),e(t)})},_createMarker:function(t){return t.map=this.gMap,new n.maps.Marker(t)},addPoly:function(t,e){var o=new n.maps.Polygon({paths:t,strokeColor:"#ecf0f1",strokeOpacity:.8,strokeWeight:2,fillColor:"#34495e",fillOpacity:.1});return e&&n.maps.event.addListener(o,"click",e),o.setMap(this.gMap),this._zoomToObject(o),o},addStatPoly:function(t,e,o){var a=new n.maps.Polygon({paths:t,strokeColor:"#f1c40f",strokeOpacity:1,strokeWeight:1,fillColor:"#f1c40f",fillOpacity:e,zIndex:100});return o&&n.maps.event.addListener(a,"click",o),a.setMap(this.gMap),this._zoomToObject(a),a},addSearchPoly:function(t,e){var o=new n.maps.Polygon({paths:t,strokeColor:"#ecf0f1",strokeOpacity:0,strokeWeight:4,fillColor:"#ff7675",fillOpacity:.7,zIndex:50});return e&&n.maps.event.addListener(o,"click",e),o.setMap(this.gMap),this._zoomToObject(o),o},addGrid:function(t,e){var o=new n.maps.Polygon({paths:t,strokeColor:"#ecf0f1",strokeOpacity:1,strokeWeight:.5,fillColor:"#81ecec",fillOpacity:.3});return e&&n.maps.event.addListener(o,"click",function(t){e(t)}),o.setMap(this.gMap),o},_zoomToObject:function(t,e){var o=new n.maps.LatLngBounds,a=[];a=void 0!==t?t.getPath().getArray():e;for(var i=0;i<a.length;i++)o.extend(a[i]);null==t&&this.gMap.fitBounds(o)}},t}();a.create=function(t,e){return new a(t,e)},t.Mapster=a}(window,document,google,window.List);
// (function(win, doc, google, List){


//     //Mapster Module
//     var Mapster = (function(){

//         function Mapster(element, opts){
//             this.gMap = new google.maps.Map(element, opts);
//             this.markers = List.create();
//         }
//         Mapster.prototype = {
//             zoom: function(value){
//                 if(value)
//                     this.gMap.setZoom(value);
//                 else 
//                     return this.gMap.getZoom();
//             },
//             _on: function(opts){
//                 var self = this;
//                 google.maps.event.addListener(opts.obj, opts.event, function(e){
//                     (opts.callback).call(self, e);
//                 });
//             },
//             addMarker: function(opts){
//                 var marker;
//                 opts.position= {
//                     lat: opts.lat,
//                     lng: opts.lng
//                 };
//                 marker = this._createMarker(opts);
//                 this.markers.add(marker);
//                 if(opts.event){
//                     this._on({
//                         obj: marker,
//                         event: opts.event.name,
//                         callback: opts.event.callback 
//                     });
//                 };
//                 if(opts.content){
//                     this._on({
//                         obj: marker,
//                         event: 'click',
//                         callback: function(e){
//                             var info = new google.maps.InfoWindow({
//                                 content: opts.content
//                             });
//                             info.open(this.gMap, marker);
//                         }

//                     });
//                 }
//                 return marker;
//             },
//             findBy: function(callback){
//                 return this.markers.find(callback);
//             },
//             removeBy: function(callback){
//                 var self = this;
//                 this.markers.find(callback, function(items){
//                     items.forEach(function(marker){
//                         marker.setMap(null);
//                         self.markers.remove(marker);
//                     });
//                 })
//             },
//             addListener: function(event, callback){
//                 this.gMap.addListener(event, function(e){
//                     alert('Hi');
//                     callback(e);
//                 });
//             },
//             _createMarker: function(opts){
//                 opts.map = this.gMap;
//                 return new google.maps.Marker(opts);
//             },
//             addPoly: function(path, action){
//                 var poly = new google.maps.Polygon({
//                     paths: path,
//                     strokeColor: '#ecf0f1',
//                     strokeOpacity: .8,
//                     strokeWeight: 2,
//                     fillColor: '#34495e',
//                     fillOpacity: .1
//                   });
//                   if(action)
//                   google.maps.event.addListener(poly, 'click', action);

//                   poly.setMap(this.gMap);
//                   this._zoomToObject(poly);
//                   return poly;
//             },
//             addStatPoly: function(path, op, action){
//                 var opa = (op > .4) ? op : .4;
//                     var poly = new google.maps.Polygon({
//                         paths: path,
//                         strokeColor: '#f1c40f',
//                         strokeOpacity: 1,
//                         strokeWeight: 1,
//                         fillColor: '#f1c40f',
//                         fillOpacity: op,
//                         zIndex: 100
//                       });
//                       if(action)
//                         google.maps.event.addListener(poly, 'click', action);
    
//                       poly.setMap(this.gMap);
//                       this._zoomToObject(poly);
//                       return poly;
//             },
//             addSearchPoly: function(path, action){
//                 var poly = new google.maps.Polygon({
//                     paths: path,
//                     strokeColor: '#ecf0f1',
//                     strokeOpacity: 0,
//                     strokeWeight: 4,
//                     fillColor: '#ff7675',
//                     fillOpacity: .7,
//                     zIndex: 50
//                   });
//                   if(action)
//                   google.maps.event.addListener(poly, 'click', action);

//                   poly.setMap(this.gMap);
//                   this._zoomToObject(poly);
//                   return poly;
//             },
//             addGrid: function(path, action){
//                 var poly = new google.maps.Polygon({
//                     paths: path,
//                     strokeColor: '#ecf0f1',
//                     strokeOpacity: 1,
//                     strokeWeight: .5,
//                     fillColor: '#81ecec',
//                     fillOpacity: .3
//                   });
//                   if(action)
//                     google.maps.event.addListener(poly, 'click', function(e){
//                         action(e);
//                     });

//                   poly.setMap(this.gMap);
//                 //   this._zoomToObject(poly);
//                   return poly;
//             },
//             _zoomToObject: function(obj, arr){
//                 var bounds = new google.maps.LatLngBounds();
//                 var points = [];
//                 if(typeof obj !== 'undefined')
//                     points = obj.getPath().getArray();
//                     else 
//                         points = arr;
//                 for (var n = 0; n < points.length ; n++){
//                     bounds.extend(points[n]);
//                 }
//                 if(obj == undefined)
//                     this.gMap.fitBounds(bounds);

//             }
//         };

//         return Mapster;
//     })();

//     Mapster.create = function(e, o){
//         return new Mapster(e, o);
//     };


//     win.Mapster = Mapster;
// })(window, document, google, window.List);