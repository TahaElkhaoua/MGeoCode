
(function(win){

    var CityMap = (function(){

        function CityMap(polyHandler){
            this.polyHandler = polyHandler;
        }
        CityMap.prototype = {
            setId: function(id){
                this.id = id;
            },
            createId: function(){
                var self = this;

                fetch('/create-grid', {
                    method: 'POST',
                }).then(function(res){
                    if(res.ok){
                        res.json().then(function(data){
                            self.setId(data._id);
                        });
                    }
                });
            },
            storeInDatabase: function(id, callback){
                var i = 0;
                var line = -1;
                this.polyHandler.getArr().getArr().forEach(function(latArr){
                    line++;
                    // [CREATE ITEM BY ITEM PROVIDES A WAY TO ADD ID KEYS]
                    // latArr.getArr().forEach(function(rect){
                    //     i++;
                    //     var data = new URLSearchParams();
                    //     // data.append('idAlias' , i);
                    //     // data.append('leftBot' ,{lat:rect.leftBot.lat, lng:rect.leftBot.lng});
                    //     // data.append('rightBot',rect.rightBot);
                    //     // data.append('rightTop' ,rect.rightTop);
                    //     // data.append('leftTop' ,rect.leftTop);
                        
                    //     rect.id = i;
                    //     data.append('obj', JSON.stringify(rect));

                    //     fetch('/create-grid/'+(id || this.id)+'/'+line, {
                    //         method: 'POST',
                    //         body: data
                    //     }).then(function(res){
                    //         if(res.ok){
                    //             res.text().then(function(text){
                    //                 console.log(text);
                    //             });
                    //         }
                    //     }).catch(function(err){
                    //         console.log(err);
                    //     });


                    // });

                    //[ADD BY ARRAY NEED TO LOOP THROUGH ITEMS TO ADD ID KEYS]
                    var data = new URLSearchParams();
                    data.append('data', JSON.stringify(latArr.getArr()));
                    fetch('/create-grid-lat/'+ id +'/'+line, {
                                method: 'POST',
                                body: data,
                            }).then(function(res){
                                if(res.ok){
                                   console.log('SUCCESS');
                                }
                            });

                });
            },
            retrieveFromDatabase: function(id, callback){
                // var xml = new XMLHttpRequest();
                // xml.open("post", '/get-grid/'+(id || this.id));
                // xml.setRequestHeader('Content-Type', 'application/json');
                // xml.send();
                var self = this;
              fetch("/get-grid/"+(id || this.id), {
                  method: 'POST'
              }).then(function(res){
                  if(res.ok){
                    res.json().then(function(data){
                        // this.polyHandler = data;
                        var dd = new List();
                        data.coords.forEach(function(arr){
                            dd.add(new List(arr));
                        });
                        self.polyHandler.setRects(dd);
                        if(callback){
                            callback();
                        }
                    });
                  }else{
                      console.log("ERROR");
                  }
              });
            },
            drawAll: function(map){
                var i = 0;
                this.polyHandler.getArr().getArr().forEach(function(anotherArr){
                            anotherArr.getArr().forEach(function(rect){
                                map.addPoly(new Rect(rect.center, [
                                    rect.leftBot,
                                    rect.rightBot,
                                    rect.rightTop,
                                    rect.leftTop
                                ],
                                ++i).getPath());
                            });
                        });
            }

        }
        return CityMap;
    })();

    CityMap.create = function(){
        return new CityMap();
    }
    win.CityMap = CityMap;
})(window);