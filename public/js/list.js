!function(t,i){var n=function(){function t(t){this.items=t||[]}return t.prototype={actionOnAll:function(t){for(var i=0;i<this.items.length;i++)t(this.items[i])},getArr:function(){return this.items},add:function(t){this.items.push(t)},remove:function(t){var i=this.items.indexOf(t);-1!==i&&this.items.splice(i,1)},find:function(t,i){for(var n=this.items,e=n.length,s=[],o=0;o<e;o++)t(n[o])&&s.push(n[o]);return i&&i.call(this,s),s},addToStart:function(t){this.items=[t].concat(this.items)}},t}();n.create=function(){return new n},t.List=n}(window,document);
// (function(win, doc){

//     var List = (function(){
//         function List(list){
//             this.items = list || [];
//         }
//         List.prototype = {
//             actionOnAll :  function(callback){
//                 for(var i=0;i<this.items.length;i++){
//                     callback(this.items[i]);
//                 }
//                 // this.items.forEach(function(item){
//                 //     callback(item);
//                 // });
//             }
//             ,
//             getArr: function(){
//                 return this.items;
//             },
//             add: function(item){
//                 this.items.push(item);
//             },
//             remove: function(item){
//                 var indexOf = this.items.indexOf(item);
//                 if(indexOf !== -1)
//                     this.items.splice(indexOf, 1);
//             },
//             find: function(callback, action){
//                 var callbackReturn,
//                 items = this.items,
//                 length = items.length,
//                 matches = [],
//                 i = 0;

//                 for(;i<length;i++){
//                     callbackReturn = callback(items[i]);
//                     if(callbackReturn){
//                         matches.push(items[i]);
//                     }
//                 }
//                 if(action){
//                     action.call(this, matches);
//                 }
//                 return matches;
//             },
//             addToStart: function(item){
//                 this.items = [item].concat(this.items);
//             }
//         }
//         return List;
//     })();
//     List.create = function(){
//         return new List();
//     }

//     win.List = List;

// })(window, document);