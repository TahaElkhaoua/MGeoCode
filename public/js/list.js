(function(win, doc){

    var List = (function(){
        function list(params){
            this.items = [];
        }
        list.prototype = {
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
            }
        }
        return list;
    })();
    List.create = function(){
        return new List();
    }

    win.List = List;

})(window, document);