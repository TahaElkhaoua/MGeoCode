(function(win, doc){

    var List = (function(){
        function List(list){
            this.items = list || [];
        }
        List.prototype = {
            actionOnAll :  function(callback){
                for(var i=0;i<this.items.length;i++){
                    callback(this.items[i]);
                }
                // this.items.forEach(function(item){
                //     callback(item);
                // });
            }
            ,
            getArr: function(){
                return this.items;
            },
            add: function(item){
                this.items.push(item);
            },
            remove: function(item){
                var indexOf = this.items.indexOf(item);
                if(indexOf !== -1)
                    this.items.splice(indexOf, 1);
            },
            find: function(callback, action){
                var callbackReturn,
                items = this.items,
                length = items.length,
                matches = [],
                i = 0;

                for(;i<length;i++){
                    callbackReturn = callback(items[i]);
                    if(callbackReturn){
                        matches.push(items[i]);
                    }
                }
                if(action){
                    action.call(this, matches);
                }
                return matches;
            },
            addToStart: function(item){
                this.items = [item].concat(this.items);
            }
        }
        return List;
    })();
    List.create = function(){
        return new List();
    }

    win.List = List;

})(window, document);