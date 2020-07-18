!function(t){var e=function(){function t(t,e,r){this.polyHandlerS=t,this.polyHandlerM=e,this.polyHandlerL=r,this.gs="",this.gm="",this.gl=""}return t.prototype={setId:function(t){this.id=t},createId:function(){var t=this;fetch("/generator/create-grid",{method:"POST"}).then(function(e){e.ok&&e.json().then(function(e){t.setId(e._id)})})},storeInDatabase:async function(t,e,r,n){if(void 0===r&&void 0===n&&void 0===e){var a,i=new URLSearchParams;i.append("data",JSON.stringify(this.polyHandlerS.polies));var o,d=await fetch("/generator/create-poly",{method:"POST",body:i});if(d.ok&&(a=await d.json()),(i=new URLSearchParams).append("name",t),i.append("polyref",a),!(d=await fetch("/generator/create-city",{method:"POST",body:i})).ok)return!1;o=await d.json(),document.body.innerHTML=JSON.stringify(o)}void 0!==e&&this._fillGrid(this.polyHandlerS,e),void 0!==r&&this._fillGrid(this.polyHandlerM,r),void 0!==n&&this._fillGrid(this.polyHandlerL,n),console.log("SUCCESS")},_fillGrid:async function(t,e){var r=-1;return t.getArr().getArr().forEach(async function(t){r++;var n=new URLSearchParams;n.append("data",JSON.stringify(t.getArr()));await fetch("/generator/create-grid-lat/"+e+"/"+r,{method:"POST",body:n})}),!0},_fillFullGrid:async function(t,e){var r=[];t.getArr().getArr().forEach(async function(t){r.push(t.getArr())});var n=new URLSearchParams;n.append("data",JSON.stringify(r));await fetch("/generator/create-full-grid/"+e,{method:"POST",body:n})},retrieveFromDatabase:function(t,e){var r=this;fetch("/generator/get-grid/"+(t||this.id),{method:"POST"}).then(function(t){t.ok?t.json().then(function(t){var n=new List;t.coords.forEach(function(t){n.add(new List(t))}),r.polyHandler.setRects(n),e&&e()}):console.log("ERROR")})},drawAll:function(t){var e=0;this.polyHandler.getArr().getArr().forEach(function(r){r.getArr().forEach(function(r){t.addPoly(new Rect(r.center,[r.leftBot,r.rightBot,r.rightTop,r.leftTop],++e).getPath())})})}},t}();e.create=function(){return new e},t.CityMap=e}(window);
// (function(win){

//     var CityMap = (function(){

//         function CityMap(polyHandlerS, polyHandlerM, polyHandlerL){
//             this.polyHandlerS = polyHandlerS;
//             this.polyHandlerM = polyHandlerM;
//             this.polyHandlerL = polyHandlerL;

//             this.gs = "";
//             this.gm = "";
//             this.gl = "";
//         }
//         CityMap.prototype = {
//             setId: function(id){
//                 this.id = id;
//             },
//             createId: function(){
//                 var self = this;

//                 fetch('/generator/create-grid', {
//                     method: 'POST',
//                 }).then(function(res){
//                     if(res.ok){
//                         res.json().then(function(data){
//                             self.setId(data._id);
//                         });
//                     }
//                 });
//             },
//             storeInDatabase: async function(name, gS , gM, gL){
//                     if(typeof gM === 'undefined' && typeof gL === 'undefined' && typeof gS === 'undefined'){
//                         var polyID;
//                     var data = new URLSearchParams();
//                     data.append('data', JSON.stringify(this.polyHandlerS.polies));
    
//                     //Store Poly
//                     var res = await fetch('/generator/create-poly', {
//                         method: 'POST',
//                         body: data
//                     })
//                         if(res.ok){
//                             polyID = await res.json();
//                         }
//                     //Create City
    
//                     data = new URLSearchParams();
//                     data.append('name', name);
//                     data.append('polyref', polyID);
//                     res = await fetch('/generator/create-city', {
//                         method: 'POST',
//                         body: data
//                     });
//                     var gData;
//                     if(!res.ok)
//                     return false;

//                     gData = await res.json();
//                     document.body.innerHTML = JSON.stringify(gData);
                    
//                     }
//                     if(typeof gS !== 'undefined')
//                            this._fillGrid(this.polyHandlerS, gS);
//                     if(typeof gM !== 'undefined')
//                            this._fillGrid(this.polyHandlerM, gM);

//                     if(typeof gL !== 'undefined')
//                             this._fillGrid(this.polyHandlerL, gL);


//                     // this._fillFullGrid(this.polyHandlerS, gData.gS);
            



//                     console.log('SUCCESS');

//             },
//             _fillGrid: async function(polyHandler, id){
//                 var line = -1;
//                 polyHandler.getArr().getArr().forEach(async function(latArr){
//                     line++;
                
//                     //[ADD BY ARRAY NEED TO LOOP THROUGH ITEMS TO ADD ID KEYS]

//                     var data = new URLSearchParams();
//                     data.append('data', JSON.stringify(latArr.getArr()));
//                     var res = await fetch('/generator/create-grid-lat/'+ id +'/'+line, {
//                                 method: 'POST',
//                                 body: data,
//                             });
//                 });
//                 return true;

//             },
//             _fillFullGrid: async function(polyHandler, id){
//                 var arr = [];
//                 polyHandler.getArr().getArr().forEach(async function(latArr){
//                     arr.push(latArr.getArr());
//                 });

//                   //[ADD BY ARRAY NEED TO LOOP THROUGH ITEMS TO ADD ID KEYS]
//                   var data = new URLSearchParams();
//                   data.append('data', JSON.stringify(arr));
//                   var res = await fetch('/generator/create-full-grid/'+ id, {
//                               method: 'POST',
//                               body: data,
//                           });
//             },
//             retrieveFromDatabase: function(id, callback){
//                 // var xml = new XMLHttpRequest();
//                 // xml.open("post", '/get-grid/'+(id || this.id));
//                 // xml.setRequestHeader('Content-Type', 'application/json');
//                 // xml.send();
//                 var self = this;
//               fetch("/generator/get-grid/"+(id || this.id), {
//                   method: 'POST'
//               }).then(function(res){
//                   if(res.ok){
//                     res.json().then(function(data){
//                         // this.polyHandler = data;
//                         var dd = new List();
//                         data.coords.forEach(function(arr){
//                             dd.add(new List(arr));
//                         });
//                         self.polyHandler.setRects(dd);
//                         if(callback){
//                             callback();
//                         }
//                     });
//                   }else{
//                       console.log("ERROR");
//                   }
//               });
//             },
//             drawAll: function(map){
//                 var i = 0;
//                 this.polyHandler.getArr().getArr().forEach(function(anotherArr){
//                             anotherArr.getArr().forEach(function(rect){
//                                 map.addPoly(new Rect(rect.center, [
//                                     rect.leftBot,
//                                     rect.rightBot,
//                                     rect.rightTop,
//                                     rect.leftTop
//                                 ],
//                                 ++i).getPath());
//                             });
//                         });
//             }

//         }
//         return CityMap;
//     })();

//     CityMap.create = function(){
//         return new CityMap();
//     }
//     win.CityMap = CityMap;
// })(window);