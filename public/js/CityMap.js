
(function(win){

    var CityMap = (function(){

        function CityMap(polyHandler){
            this.polyHandler = polyHandler;
        }
        CityMap.prototype = {
            createId: function(){
                var xml = new XMLHttpRequest();
                xml.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        this.id = JSON.parse(this.responseText)._id;
                    }
                }
                xml.open('post', '/create-grid');
                xml.setRequestHeader('Content-type', 'application/json');
                xml.send();
            },
            storeInDatabase: function(id){
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
                    fetch('/create-grid-lat/'+(id || this.id)+'/'+line, {
                                method: 'POST',
                                body: data,
                            }).then(function(res){
                                if(res.ok){
                                    res.text().then(function(text){
                                        console.log(text);
                                    });
                                }
                            });

                });
            },
            retrieveFromDatabase: function(id){
                // var xml = new XMLHttpRequest();
                // xml.open("post", '/get-grid/'+(id || this.id));
                // xml.setRequestHeader('Content-Type', 'application/json');
                // xml.send();

              fetch("/get-grid/"+(id || this.id), {
                  method: 'POST'
              }).then(function(res){
                  if(res.ok){
                      res.json().then(function(data){
                        console.log(data);
                      });
                  }else{
                      console.log("ERROR");
                  }
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