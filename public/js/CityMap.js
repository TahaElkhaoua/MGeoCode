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
                    latArr.getArr().forEach(function(rect){
                        i++;
                        const r = {
                            idAlias : i,  
                            leftBot :rect.leftBot.gsLL(),
                            rightBot:rect.rightBot.gsLL(),
                            rightTop :rect.rightTop.gsLL(),
                            leftTop :rect.leftTop.gsLL()
                        }

                        var forD = new FormData();
                        forD.append("data", "Hi");
                        
                        var xml = new XMLHttpRequest();
                        xml.open("post", '/create-grid/'+(id || this.id)+'/'+line);
                        xml.setRequestHeader('Content-Type', 'application/json');
                        xml.send(JSON.stringify(r));
                    })
                });
            },
            retrieveFromDatabase: function(id){
                var xml = new XMLHttpRequest();
                xml.open("post", '/get-grid/'+(id || this.id));
                xml.setRequestHeader('Content-Type', 'application/json');
                xml.send();

                xml.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        document.body.innerHTML=    ( this.responseText);
                    }
                }
            }

        }
        return CityMap;
    })();

    CityMap.create = function(){
        return new CityMap();
    }
    win.CityMap = CityMap;
})(window);