(function(win){

    var Rect = (function(){
        //ptsArr is a list of LatLng Objects
        function Rect(center, ptsArr, id, alias){
            this.id = id; //Optional id attribute [For lists of items]     
            this.alias = alias;
            this.center   = center;
            this.leftBot  = ptsArr[0];
            this.rightBot = ptsArr[1];
            this.rightTop = ptsArr[2];
            this.leftTop = ptsArr[3];
        }
        Rect.prototype = {
            getPath: function(){
                return [
                    (this.leftBot),
                    (this.rightBot),
                    (this.rightTop),
                    (this.leftTop)
                ];
            },
            gsId: function(id){
                if(id)
                    return this.id = id;
                return this.id
            },
            gsAlias: function(alias){
                if(alias)
                    return this.alias = alias;
                return this.alias;
            },
            toObj: function(){
                return {
                    id: this.id,
                    alias: this.alias || "",
                    center: this.center,
                    leftBot: this.leftBot,
                    rightBot: this.rightBot,
                    rightTop: this.rightTop,
                    leftTop: this.leftTop
                };
            }
        }

        return Rect;
    })();

    Rect.create = function(){
        return new Rect();
    }
    win.Rect = Rect;
})(window);