(function(win){

    // An Object Model to hold all poly Rectangles objects of a city 
    // starting from the center [Any point can be used]
    var PolyHandler = (function(){
        function PolyHandler(center, latDiff, lngDiff, polies, size,multiArr){
            this.center = center;
            this.latDiff = latDiff;
            this.lngDiff = lngDiff;
            this.polies = polies;
            this.size = size;
            this.rects = multiArr || List.create(); //multidimensional Array
        }
        PolyHandler.prototype = {
            //Create A Rectangle from center
            _createRect: function(center, id){
                var leftBot = {lat: center.lat - this.latDiff, lng: center.lng - this.lngDiff};
                var rightBot = { lat: center.lat - this.latDiff,lng: center.lng + this.lngDiff};
                var rightTop = { lat: center.lat + this.latDiff,lng: center.lng + this.lngDiff};
                var leftTop = { lat: center.lat + this.latDiff, lng: center.lng - this.lngDiff};

                return new Rect(center, [
                    leftBot,
                    rightBot,
                    rightTop,
                    leftTop
                ], id);
            },
            _contains: function(lat, lng){
                var self = this;
                    return google.maps.geometry.poly.containsLocation(
                        new google.maps.LatLng(lat, lng),
                        new google.maps.Polygon({paths: self.polies.getArr()})
                    );
            },
            _createRectsWithinLat: function(center){ // Creating Latitude Rectangles within a city borders
                var latRects = List.create();
                var i = 2;
                var polies = this.polies.getArr();

                console.log(center, polies);
                if(!this._contains(polies, center.lat, center.lng))
                    return ;

                latRects.add(this._createRect(center));                
                //Increasing Lat Position Rects
                while(this._contains(polies,center.lat + (this.latDiff * i), center.lng)){
                    latRects.add(this._createRect({ lat: center.lat + (this.latDiff * i),lng: center.lng}));
                    i += 2;
                }
                //Decreasing Lat Position Rects
                i = 2;
                while(this._contains(polies, center.lat - (this.latDiff * i), center.lng)){
                    latRects.addToStart(this._createRect({ lat: center.lat - (this.latDiff * i), lng: center.lng}));
                    i += 2;
                }
                return latRects;
            },
            createGrid: function(){
                var i = 2;
                var doubleList =  List.create();
                var polies = this.polies.getArr();

                doubleList.add(this._createRectsWithinLat({ lat: this.center.lat,lng: this.center.lng}));
                while(this._contains(polies,this.center.lat, this.center.lng  + (this.lngDiff * i))){
                    var rectL = this._createRectsWithinLat({ lat: this.center.lat,lng:  this.center.lng + (this.lngDiff * i)});
                        doubleList.add(rectL);
                        i+=2;
                    // i+=300;
                }
                i = 2;
                while(this._contains(polies,this.center.lat, this.center.lng  - (this.lngDiff * i))){
                    var rectL = this._createRectsWithinLat({ lat: this.center.lat,lng: this.center.lng - (this.lngDiff * i)});
                    doubleList.addToStart(rectL);
                    i+=2;
                    // i+=300;
                }
           
                this.rects = doubleList;
                this._setupIds();
                console.log(doubleList);
                return doubleList;
            },
            //PORNOOOOOOOOOOOOO DOWN HERE
            _setupIds: function(){
                var id = 0;
                this.rects.actionOnAll(function(itemsList){
                   if(itemsList){
                    itemsList.actionOnAll(function(item){
                        item.gsId(++id);
                    });
                   }
                });
                // var arr = this.rects.getArr();
                // var cont = new List();
                // for(var i=0;i<arr.length;i++){
                //     var arr2 = arr[i].getArr();
                //     var listLat = new List();
                //     for(var n=0;n<arr2.length;n++){
                        
                //         var item = arr2[n];
                //         item.id = ++id;
                //         listLat.add(item);
                //     }
                //     cont.add(listLat);
                // }
                // this.rects = cont;
            },
            findZone: function(location){
                //find Longitude Line
                var finalRect = undefined;
                    this.rects.find(function(latItems){
                        var firstRect = latItems.getArr()[0];
                        if(location.lng <= firstRect.rightBot.lng && location.lng >= firstRect.leftBot.lng){
                            return true;
                        }
                    }).forEach(function(lngLine){
                        //now Get the latitude to reach Zone
                        lngLine.find(function(item){
                            if(location.lat <= item.rightTop.lat && location.lat >= item.leftBot.lat){
                                return finalRect = item;
                            }
                        });
                    });
                    return finalRect;
            },
            getArr: function(){
                return this.rects;
            },
            applyActionSep: function(action){
                this.rects.actionOnAll(function(latArr){
                    latArr.actionOnAll(function(rect){
                        action(rect);
                    });
                });
            },
            setRects: function(rects){
                this.rects = rects;
            }
        }

        return PolyHandler;
    })();
    PolyHandler.create = function(){
        return new PolyHandler();
    }
    win.PolyHandler = PolyHandler;

})(window);