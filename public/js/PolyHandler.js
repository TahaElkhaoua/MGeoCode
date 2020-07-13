(function(win){

    // An Object Model to hold all poly Rectangles objects of a city 
    // starting from the center [Any point can be used]
    var PolyHandler = (function(){
        function PolyHandler(center, latDiff, lngDiff, multiArr){
            this.center = center;
            this.latDiff = latDiff;
            this.lngDiff = lngDiff;
            this.rects = multiArr || new List(); //multidimensional Array
        }
        PolyHandler.prototype = {
            //Create A Rectangle from center
            _createRect: function(center){
                var leftBot = new LatLng(center.gsLat() - this.latDiff, center.gsLng() - this.lngDiff);
                var rightBot = new LatLng(center.gsLat() - this.latDiff, center.gsLng() + this.lngDiff);
                var rightTop = new LatLng(center.gsLat() + this.latDiff, center.gsLng() + this.lngDiff);
                var leftTop = new LatLng(center.gsLat() + this.latDiff, center.gsLng() - this.lngDiff);

                return new Rect(center, [
                    leftBot,
                    rightBot,
                    rightTop,
                    leftTop
                ]);
            },
            _contains: function(polies, lat, lng){
                    return google.maps.geometry.poly.containsLocation(
                        new google.maps.LatLng(lat, lng),
                        new google.maps.Polygon({paths: polies})
                    );
            },
            _createRectsWithinLat: function(polies, center){ // Creating Latitude Rectangles within a city borders
                var latRects = new List();
                var i = 2;
                if(!this._contains(polies, center.gsLat(), center.gsLng()))
                    return [];

                latRects.add(this._createRect(center));                
                //Increasing Lat Position Rects
                while(this._contains(polies,center.gsLat() + (this.latDiff * i), center.gsLng())){
                    latRects.add(this._createRect(new LatLng(center.gsLat() + (this.latDiff * i), center.gsLng())));
                    i += 2;
                }
                //Decreasing Lat Position Rects
                i = 2;
                while(this._contains(polies, center.gsLat() - (this.latDiff * i), center.gsLng())){
                    latRects.addToStart(this._createRect(new LatLng(center.gsLat() - (this.latDiff * i), center.gsLng())));
                    i += 2;
                }
                return latRects;
            },
            createGrid: function(polies){
                var i = 2;
                var doubleList = new List();


                doubleList.add(this._createRectsWithinLat(polies, new LatLng(this.center.gsLat(), this.center.gsLng())));
                while(this._contains(polies,this.center.gsLat(), this.center.gsLng()  + (this.lngDiff * i))){
                    var rectL = this._createRectsWithinLat(polies, new LatLng(this.center.gsLat(), this.center.gsLng() + (this.lngDiff * i)));
                    doubleList.add(rectL);
                    i+=2;
                    // i+=300;
                }
                i = 2;
                while(this._contains(polies,this.center.gsLat(), this.center.gsLng()  - (this.lngDiff * i))){
                    var rectL = this._createRectsWithinLat(polies, new LatLng(this.center.gsLat(), this.center.gsLng() - (this.lngDiff * i)));
                    doubleList.addToStart(rectL);
                    i+=2;
                    // i+=300;
                }
           
                this.rects = doubleList;
                this._setupIds();
                return doubleList;
            },
            //PORNOOOOOOOOOOOOO DOWN HERE
            _setupIds: function(){
                var id = 0;
                this.rects.actionOnAll(function(items){
                    items.actionOnAll(function(item){
                        item.gsId(++id);
                    });
                });
            },
            findZone: function(location){
                //find Longitude Line
                var finalRect = undefined;
                    this.rects.find(function(latItems){
                        var firstRect = latItems.getArr()[0];
                        if(location.gsLng() <= firstRect.rightBot.gsLng() && location.gsLng() >= firstRect.leftBot.gsLng()){
                            return true;
                        }
                    }).forEach(function(lngLine){
                        //now Get the latitude to reach Zone
                        lngLine.find(function(item){
                            if(location.gsLat() <= item.rightTop.gsLat() && location.gsLat() >= item.leftBot.gsLat()){
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
            }
        }

        return PolyHandler;
    })();
    PolyHandler.create = function(){
        return new PolyHandler();
    }
    win.PolyHandler = PolyHandler;

})(window);