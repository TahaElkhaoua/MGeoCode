!function(t){var n=function(){function t(t,n,i,e,l,s){this.center=t,this.latDiff=n,this.lngDiff=i,this.polies=e,this.size=l,this.rects=s||List.create()}return t.prototype={_createRect:function(t,n){var i={lat:t.lat-this.latDiff,lng:t.lng-this.lngDiff},e={lat:t.lat-this.latDiff,lng:t.lng+this.lngDiff},l={lat:t.lat+this.latDiff,lng:t.lng+this.lngDiff},s={lat:t.lat+this.latDiff,lng:t.lng-this.lngDiff};return new Rect(t,[i,e,l,s],n)},_contains:function(t,n){return google.maps.geometry.poly.containsLocation(new google.maps.LatLng(t,n),new google.maps.Polygon({paths:this.polies.getArr()}))},_createRectsWithinLat:function(t){var n=List.create(),i=2;this.polies.getArr();if(!this._contains(t.lat,t.lng))return n;for(n.add(this._createRect(t));this._contains(t.lat+this.latDiff*i,t.lng);)n.add(this._createRect({lat:t.lat+this.latDiff*i,lng:t.lng})),i+=2;for(i=2;this._contains(t.lat-this.latDiff*i,t.lng);)n.addToStart(this._createRect({lat:t.lat-this.latDiff*i,lng:t.lng})),i+=2;return n},createGrid:function(){var t=2,n=List.create();this.polies.getArr();for(n.add(this._createRectsWithinLat({lat:this.center.lat,lng:this.center.lng}));this._contains(this.center.lat,this.center.lng+this.lngDiff*t);){var i=this._createRectsWithinLat({lat:this.center.lat,lng:this.center.lng+this.lngDiff*t});n.add(i),t+=2}for(t=2;this._contains(this.center.lat,this.center.lng-this.lngDiff*t);){i=this._createRectsWithinLat({lat:this.center.lat,lng:this.center.lng-this.lngDiff*t});n.addToStart(i),t+=2}return this.rects=n,this._setupIds(),console.log(n),n},_setupIds:function(){var t=0;this.rects.actionOnAll(function(n){n&&n.actionOnAll(function(n){n.gsId(++t)})})},findZone:function(t){var n=void 0;return this.rects.find(function(n){var i=n.getArr()[0];if(t.lng<=i.rightBot.lng&&t.lng>=i.leftBot.lng)return!0}).forEach(function(i){i.find(function(i){if(t.lat<=i.rightTop.lat&&t.lat>=i.leftBot.lat)return n=i})}),n},getArr:function(){return this.rects},applyActionSep:function(t){this.rects.actionOnAll(function(n){n.actionOnAll(function(n){t(n)})})},setRects:function(t){this.rects=t}},t}();n.create=function(){return new n},t.PolyHandler=n}(window);
// (function(win){

//     // An Object Model to hold all poly Rectangles objects of a city 
//     // starting from the center [Any point can be used]
//     var PolyHandler = (function(){
//         function PolyHandler(center, latDiff, lngDiff, polies, size,multiArr){
//             this.center = center;
//             this.latDiff = latDiff;
//             this.lngDiff = lngDiff;
//             this.polies = polies;
//             this.size = size;
//             this.rects = multiArr || List.create(); //multidimensional Array
//         }
//         PolyHandler.prototype = {
//             //Create A Rectangle from center
//             _createRect: function(center, id){
//                 var leftBot = {lat: center.lat - this.latDiff, lng: center.lng - this.lngDiff};
//                 var rightBot = { lat: center.lat - this.latDiff,lng: center.lng + this.lngDiff};
//                 var rightTop = { lat: center.lat + this.latDiff,lng: center.lng + this.lngDiff};
//                 var leftTop = { lat: center.lat + this.latDiff, lng: center.lng - this.lngDiff};

//                 return new Rect(center, [
//                     leftBot,
//                     rightBot,
//                     rightTop,
//                     leftTop
//                 ], id);
//             },
//             _contains: function(lat, lng){
//                 var self = this;
//                 var check = google.maps.geometry.poly.containsLocation(
//                     new google.maps.LatLng(lat, lng),
//                     new google.maps.Polygon({paths: self.polies.getArr()})
//                 );
//                     return check;
//             },
//             _createRectsWithinLat: function(center){ // Creating Latitude Rectangles within a city borders
//                 var latRects = List.create();
//                 var i = 2;
//                 var polies = this.polies.getArr();

//                 if(!this._contains(center.lat, center.lng)){
//                     return latRects;
//                 }

//                 latRects.add(this._createRect(center));                
//                 //Increasing Lat Position Rects
//                 while(this._contains(center.lat + (this.latDiff * i), center.lng)){
//                     latRects.add(this._createRect({ lat: center.lat + (this.latDiff * i),lng: center.lng}));
//                     i += 2;
//                 }
//                 //Decreasing Lat Position Rects
//                 i = 2;
//                 while(this._contains(center.lat - (this.latDiff * i), center.lng)){
//                     latRects.addToStart(this._createRect({ lat: center.lat - (this.latDiff * i), lng: center.lng}));
//                     i += 2;
//                 }
//                 return latRects;
//             },
//             createGrid: function(){
//                 var i = 2;
//                 var doubleList =  List.create();
//                 var polies = this.polies.getArr();

//                 doubleList.add(this._createRectsWithinLat({ lat: this.center.lat,lng: this.center.lng}));
//                 while(this._contains(this.center.lat, this.center.lng  + (this.lngDiff * i))){
//                     var rectL = this._createRectsWithinLat({ lat: this.center.lat,lng:  this.center.lng + (this.lngDiff * i)});
//                         doubleList.add(rectL);
//                         i+=2;
//                     // i+=300;
//                 }
//                 i = 2;
//                 while(this._contains(this.center.lat, this.center.lng  - (this.lngDiff * i))){
//                     var rectL = this._createRectsWithinLat({ lat: this.center.lat,lng: this.center.lng - (this.lngDiff * i)});
//                     doubleList.addToStart(rectL);
//                     i+=2;
//                     // i+=300;
//                 }
           
//                 this.rects = doubleList;
//                 this._setupIds();
//                 console.log(doubleList);
//                 return doubleList;
//             },
//             //PORNOOOOOOOOOOOOO DOWN HERE
//             _setupIds: function(){
//                 var id = 0;
//                 this.rects.actionOnAll(function(itemsList){
//                    if(itemsList){
//                     itemsList.actionOnAll(function(item){
//                         item.gsId(++id);
//                     });
//                    }
//                 });
//                 // var arr = this.rects.getArr();
//                 // var cont = new List();
//                 // for(var i=0;i<arr.length;i++){
//                 //     var arr2 = arr[i].getArr();
//                 //     var listLat = new List();
//                 //     for(var n=0;n<arr2.length;n++){
                        
//                 //         var item = arr2[n];
//                 //         item.id = ++id;
//                 //         listLat.add(item);
//                 //     }
//                 //     cont.add(listLat);
//                 // }
//                 // this.rects = cont;
//             },
//             findZone: function(location){
//                 //find Longitude Line
//                 var finalRect = undefined;
//                     this.rects.find(function(latItems){
//                         var firstRect = latItems.getArr()[0];
//                         if(location.lng <= firstRect.rightBot.lng && location.lng >= firstRect.leftBot.lng){
//                             return true;
//                         }
//                     }).forEach(function(lngLine){
//                         //now Get the latitude to reach Zone
//                         lngLine.find(function(item){
//                             if(location.lat <= item.rightTop.lat && location.lat >= item.leftBot.lat){
//                                 return finalRect = item;
//                             }
//                         });
//                     });
//                     return finalRect;
//             },
//             getArr: function(){
//                 return this.rects;
//             },
//             applyActionSep: function(action){
//                 this.rects.actionOnAll(function(latArr){
//                     latArr.actionOnAll(function(rect){
//                         action(rect);
//                     });
//                 });
//             },
//             setRects: function(rects){
//                 this.rects = rects;
//             }
//         }

//         return PolyHandler;
//     })();
//     PolyHandler.create = function(){
//         return new PolyHandler();
//     }
//     win.PolyHandler = PolyHandler;

// })(window);