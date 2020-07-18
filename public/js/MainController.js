!function(e,t){var a=function(){function t(e){this.data=[],this.cities=[],this.map=e,this.pol,this.grid=[],this.polyHandler,this.cityIdHolder,this.searchPoly,this.statGrids=[]}return t.prototype={retrieveCities:async function(){this.cities=await(await fetch("/get-all-cities",{method:"post"})).json(),this._fillCities(this,function(){this._setUI()})},_fillCities:async function(e,t){this.data=await(await fetch("/has-city-grid/",{method:"POST"})).json(),t.call(e)},_hasCityGrid:function(e){for(var t=0;t<this.data.length;t++)if(e==this.data[t].city)return!0;return!1},_getGrids:function(e){for(var t=0;t<this.data.length;t++)if(e==this.data[t].city)return this.data[t].size;return"N/A"},_retrievePoly:async function(e,t=!0){var a=await(await fetch("/get-polies/"+e,{method:"POST"})).json();t&&(this.pol&&this.pol.setMap(null),this.pol=this.map.addPoly(a)),this.map._zoomToObject(void 0,a)},_getGridId:function(e){for(var t=0;t<this.data.length;t++)if(e==this.data[t].city)return this.data[t].grid;return null},_retrieveGrid:async function(e){var t=await(await fetch("/get-grids/"+e,{method:"POST"})).json(),a=0;this._emptyGrid();for(var r=new List,n=0;n<t.length;n++){for(var c=new List,i=0;i<t[n].length;i++){var o=new Rect(t[n][i].center,[t[n][i].leftBot,t[n][i].rightBot,t[n][i].rightTop,t[n][i].leftTop],++a);this.grid.push(this.map.addGrid(o.getPath(),function(e){document.querySelector(".search__box").value=e.latLng.lat()+", "+e.latLng.lng(),document.querySelector(".search__btn").click()})),c.add(o)}r.add(c)}this.polyHandler=new PolyHandler(void 0,void 0,void 0,this.pol,void 0,r)},_emptyGrid:function(){this.grid.forEach(function(e){e.setMap(null)})},setupGridGen:function(){var e=this;document.querySelector(".generator__form").onsubmit=async function(t){t.preventDefault();var a=document.querySelector("#selector").value,r=await(await fetch("/insert-city/"+e.cityIdHolder+"/"+a,{method:"POST"})).json();console.log(r),document.querySelector(".generator").classList.remove("generator--show"),e.retrieveCities()}},_setUI:async function(t){var a=this;document.querySelector(".options__content").innerHTML="",this.cities.forEach(function(t){var r=document.createElement("div");r.classList.add("options__item"),r.classList.add("u-text-center");var n=document.createElement("div");n.innerHTML="5555";var c=document.createElement("div");c.innerHTML=t.name;var i=document.createElement("div");i.innerHTML=a._hasCityGrid(t._id)?"<svg class='options__svg'><use xlink:href='#idea' /></svg><p>ACTIVE</p>":"<svg class='options__svg'><use xlink:href='#street-lamp' /></svg>INACTIVE";var o=document.createElement("div");o.innerHTML=a._getGrids(t._id);var s=document.createElement("div"),l=document.createElement("input");l.type="checkbox",l.className="PolyChecker",l.onchange=function(e){if(this.checked){a._retrievePoly(t.polycords);var r=this;document.querySelectorAll(".PolyChecker").forEach(function(e){e!==r&&(e.checked=!1)})}else a.pol.setMap(null)},s.appendChild(l);var d=document.createElement("div"),h=document.createElement("input");if(h.type="checkbox",h.className="GridChecker",a._hasCityGrid(t._id))h.onclick=function(){if(this.checked){for(var e=0;e<a.statGrids.length;e++)a.statGrids[e].setMap(null);a.statGrids=[];var r=this;document.querySelectorAll(".GridChecker").forEach(function(e){e!==r&&(e.checked=!1)}),a.searchPoly&&a.searchPoly.setMap(null),a._retrievePoly(t.polycords,!1),a._retrieveGrid(a._getGridId(t._id)),document.querySelector(".search").style.display="block",document.querySelector(".search form").onsubmit=async function(e){e.preventDefault();var r=document.querySelector(".search__box").value.split(","),n='{"lat":'+r[0]+',"lng":'+r[1]+"}";if(n){var c;try{c=a.polyHandler.findZone(JSON.parse(n))}catch(e){return document.querySelector(".search__define").classList.add("search__define--show"),document.querySelector(".search__define").innerHTML="<h2>NO RESULT FOUND</h2>",document.querySelector(".search__extra__define").classList.remove("search__extra__define--show"),void(a.searchPoly&&a.searchPoly.setMap(null))}var i=[c.leftBot,c.rightBot,c.rightTop,c.leftTop];a.map._zoomToObject(void 0,i),a.searchPoly&&a.searchPoly.setMap(null),a.searchPoly=a.map.addSearchPoly(i),document.querySelector(".search__define").classList.add("search__define--show"),document.querySelector(".search__define").innerHTML="<h2>ZONE #"+c.id+"</h2>",document.querySelector(".search__extra__define").classList.add("search__extra__define--show");var o=document.createElement("canvas");o.className="chart";var s=o.getContext("2d");document.querySelector(".search__extra__define").innerHTML="",document.querySelector(".search__extra__define").appendChild(o);let r=await(await fetch("/zone-stats/"+t._id+"/"+c.id,{method:"POST"})).json();var l=[];if("1"in r)for(var d=1;d<=12;d++)l.push(r[""+d]);else l=[0,0,0,0,0,0,0,0,0,0,0,0];new Chart(s,{type:"bar",data:{labels:["Jan","Feb","Mar","Avr","Mai","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],datasets:[{label:"Users",data:l,backgroundColor:"#f1c40f"}]},options:{}})}else document.querySelector(".search__define").classList.add("search__define--show"),document.querySelector(".search__define").innerHTML="<h2>NO RESULT FOUND</h2>",document.querySelector(".search__extra__define").classList.remove("search__extra__define--show"),a.searchPoly&&a.searchPoly.setMap(null)}}else{for(e=0;e<a.statGrids.length;e++)a.statGrids[e].setMap(null);a.statGrids=[],a._emptyGrid(),document.querySelector(".search__box").value="",a.searchPoly&&a.searchPoly.setMap(null),document.querySelector(".search").style.display="none",document.querySelector(".search__define").classList.remove("search__define--show"),document.querySelector(".search__extra__define").classList.remove("search__extra__define--show")}},d.appendChild(h);else{document.querySelector(".search__box").value="",a.searchPoly&&a.searchPoly.setMap(null);var u=document.createElement("button");u.classList.add("options__btn"),u.innerHTML="Generate Grid",u.onclick=function(){a.cityIdHolder=t._id,document.querySelector(".generator__bg").onclick=function(){document.querySelector(".generator").classList.remove("generator--show")},document.querySelector(".generator").classList.add("generator--show"),document.querySelector("#cityName").innerHTML=t.name,a.setupGridGen()},d.appendChild(u)}var m=document.createElement("div");m.innerHTML='<label for="'+t.name+'"><svg class="options__svg__conf '+t.name+'P"  id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m482 256c0-4.898-.162-9.85-.483-14.791l27.511-25.177-1.59-8.242c-2.012-10.424-4.692-20.819-7.967-30.896-3.273-10.077-7.216-20.063-11.717-29.683l-3.558-7.602-37.041-4.197c-5.266-8.327-11.092-16.334-17.405-23.92l7.46-36.553-6.129-5.732c-7.751-7.248-16.03-14.083-24.607-20.314-8.574-6.23-17.634-11.993-26.926-17.127l-7.347-4.059-32.402 18.36c-9.176-3.664-18.613-6.728-28.194-9.154l-15.427-33.909-8.33-1.033c-10.538-1.308-21.253-1.971-31.848-1.971l-60 90.5 60 90.5c41.421 0 75 33.579 75 75s-33.579 75-75 75l-50 90.5 50 90.5c10.599 0 21.313-.663 31.849-1.972l8.329-1.034 15.427-33.907c9.581-2.427 19.019-5.49 28.194-9.154l32.402 18.36 7.347-4.059c9.292-5.134 18.352-10.896 26.925-17.126 8.578-6.232 16.857-13.067 24.608-20.315l6.129-5.732-7.46-36.553c6.313-7.586 12.14-15.593 17.405-23.92l37.041-4.197 3.558-7.602c4.501-9.619 8.443-19.605 11.716-29.681 3.275-10.079 5.956-20.475 7.968-30.898l1.59-8.241-27.511-25.178c.321-4.942.483-9.892.483-14.791z" fill="#83a3ab"/><path d="m181 256c0-41.421 33.579-75 75-75v-181c-10.595 0-21.31.663-31.848 1.971l-8.33 1.033-15.427 33.909c-9.581 2.427-19.017 5.49-28.194 9.154l-32.402-18.36-7.347 4.059c-9.292 5.134-18.352 10.896-26.925 17.126-8.578 6.232-16.857 13.067-24.608 20.315l-6.129 5.732 7.46 36.553c-6.315 7.588-12.141 15.593-17.405 23.921l-37.041 4.196-3.558 7.602c-4.5 9.616-8.442 19.603-11.717 29.681-3.276 10.082-5.956 20.478-7.967 30.9l-1.59 8.24 27.511 25.177c-.321 4.941-.483 9.893-.483 14.791 0 4.899.162 9.849.483 14.791l-27.51 25.177 1.59 8.24c2.011 10.423 4.69 20.818 7.967 30.899 3.274 10.079 7.217 20.065 11.717 29.682l3.558 7.602 37.041 4.196c5.265 8.328 11.09 16.333 17.405 23.921l-7.46 36.553 6.129 5.732c7.751 7.248 16.03 14.083 24.607 20.314 8.574 6.23 17.634 11.993 26.926 17.127l7.347 4.059 32.402-18.36c9.178 3.664 18.613 6.728 28.194 9.154l15.427 33.907 8.329 1.034c10.535 1.309 21.249 1.972 31.848 1.972v-181c-41.421 0-75-33.579-75-75z" fill="#93b7c0"/><path d="m256 90-40 60.5 40 60.5c24.853 0 45 20.147 45 45s-20.147 45-45 45l-40 60.5 40 60.5c91.679 0 166-74.321 166-166s-74.321-166-166-166z" fill="#667e97"/><path d="m211 256c0-24.853 20.147-45 45-45v-121c-91.679 0-166 74.321-166 166s74.321 166 166 166v-121c-24.853 0-45-20.147-45-45z" fill="#728e95"/></g></svg></label>';var _=document.createElement("input");_.type="checkbox",_.id=t.name,_.classList.add("options__toggle"),_.onchange=function(){e.check(this,t.name+"P")};var p=document.createElement("div");p.classList.add("options__conf"),p.id=t.name+"P";var f=document.createElement("select");f.id=t.name+"-timezone";var v=document.createElement("option");v.value="0",v.innerHTML="ALL YEAR",f.appendChild(v);for(var y=1;y<=12;y++){var g=document.createElement("option");g.value=y,g.innerHTML=y,f.appendChild(g)}var S=document.createElement("div");S.className="time-container";var L=document.createElement("h2");L.innerHTML="Choose Month/Period :",S.appendChild(L),S.appendChild(f);var w=document.createElement("button");w.classList.add("genstat"),w.innerHTML="GENERATE STATISTICS",w.onclick=async function(){(c=new URLSearchParams).append("city",t._id),c.append("month",f.value);let e=await(await fetch("/month-stats",{method:"POST",body:c})).json();if(0==e.total);else{h.checked||h.click();for(var r=0;r<a.statGrids.length;r++)a.statGrids[r].setMap(null);a.statGrids=[];var n=0;for(r=0;r<e.data.length;r++){var c=e.data[r];n=c.counter>n?c.counter:n}e.data.forEach(function(e){for(var r=[],c=e.counter/n,i=0;i<e.rect.length;i++)r.push({lat:e.rect[i][0],lng:e.rect[i][1]});a._retrievePoly(t.polycords,!1),a.statGrids.push(a.map.addStatPoly(r,c,function(e){document.querySelector(".search").style.display="block",document.querySelector(".search__box").value=e.latLng.lat()+", "+e.latLng.lng(),document.querySelector(".search__btn").click()}))})}},p.appendChild(S),p.appendChild(w),r.appendChild(n),r.appendChild(c),r.appendChild(i),r.appendChild(o),r.appendChild(s),r.appendChild(d),r.appendChild(m);var C=document.querySelector(".options__content");C.appendChild(r),C.appendChild(_),C.appendChild(p)})}},t}();a.create=function(e){return new a(e)},e.MainController=a}(window,document);
// (function(window, documents){

//     var MainController = (function(){

//         function MainController(map){
//             this.data = [];
//             this.cities = [];
//             this.map = map;
//             this.pol;
//             this.grid = [];
//             this.polyHandler;
//             this.cityIdHolder;
//             this.searchPoly;
//             this.statGrids = [];
//         }
//         MainController.prototype = {
//             retrieveCities: async function(){
//                 this.cities = await (await fetch('/get-all-cities', {method: 'post'})).json();
//                 this._fillCities(this,function(){
//                     this._setUI();
//                 });
//             },
//             _fillCities: async function(context, callback){
//                 this.data = await (await fetch('/has-city-grid/', {method: 'POST'})).json();
//                 callback.call(context);
//             },
//             _hasCityGrid:  function(cid){
//                 for(var i=0;i<this.data.length;i++){
//                     if(cid == this.data[i].city)
//                         return true;
//                 }
//                 return false;
//             },
//             _getGrids: function(cid){
//                 for(var i=0;i<this.data.length;i++){
//                     if(cid == this.data[i].city)
//                         return this.data[i].size;
//                 }
//                 return 'N/A';
//             },
//             _retrievePoly: async function(id, draw=true){
//                 var polies = await (await fetch('/get-polies/'+id, {method: 'POST'})).json();
                
//               if(draw){
//                 if(this.pol) this.pol.setMap(null);
//                 this.pol = this.map.addPoly(polies);
//               }
//               this.map._zoomToObject(undefined,polies);
//             },
//             _getGridId: function(cid){
//                 for(var i=0;i<this.data.length;i++){
//                     if(cid == this.data[i].city)
//                         return this.data[i].grid;
//                 }
//                 return null;
//             },
//             _retrieveGrid: async function(id){
//                 var self = this;
//                 var rects = await (await fetch('/get-grids/'+id, {method: 'POST'})).json();
//                 var i = 0;
//                 this._emptyGrid();
//                 var arr = new List();
//                 for(var n=0;n<rects.length;n++){
//                     var arrLat = new List();
//                     for(var l=0;l<rects[n].length;l++){

//                         var r = new Rect(rects[n][l].center, [
//                             rects[n][l].leftBot,
//                             rects[n][l].rightBot,
//                             rects[n][l].rightTop,
//                             rects[n][l].leftTop
//                         ],
//                         ++i);
//                         self.grid.push(self.map.addGrid(r.getPath(), function(e){
//                             document.querySelector('.search__box').value = e.latLng.lat() + ', '+e.latLng.lng();
//                             document.querySelector('.search__btn').click();
//                         }));
//                         arrLat.add(r);
//                     };
//                     arr.add(arrLat);
//                 };

//                 self.polyHandler = new PolyHandler(undefined, undefined, undefined, self.pol, undefined, arr);
//             },
//             _emptyGrid: function(){
//                 this.grid.forEach(function(grid){
//                     grid.setMap(null);
//                 });
//             },
//             setupGridGen: function(){
//                 var self = this;
//                 document.querySelector('.generator__form').onsubmit = async function(e){
//                     e.preventDefault();
//                     var value = document.querySelector('#selector').value;
                    
//                     var sendVal = await (await fetch('/insert-city/'+self.cityIdHolder+'/'+value, {method: 'POST'})).json();
//                     console.log(sendVal);
//                     document.querySelector('.generator').classList.remove('generator--show');
//                     self.retrieveCities();
//                 };
//             }
//             ,_setUI: async function(city){
//                 var self = this;
//                 document.querySelector('.options__content').innerHTML = "";
//                 this.cities.forEach(function(city){

//                     var cont = document.createElement('div');
//                     cont.classList.add('options__item');
//                     cont.classList.add('u-text-center');

                   
//                     var id = document.createElement('div');
//                     id.innerHTML = "5555";

//                     var name = document.createElement('div');
//                     name.innerHTML = city.name;
                    
//                     var status = document.createElement('div');

//                     var activeText = "<svg class='options__svg'><use xlink:href='#idea' /></svg>";
//                     var unactiveText = "<svg class='options__svg'><use xlink:href='#street-lamp' /></svg>";

//                     status.innerHTML = (self._hasCityGrid(city._id)) ? activeText+'<p>ACTIVE</p>' : unactiveText+'INACTIVE';

//                     var GG = document.createElement('div');
//                     GG.innerHTML = self._getGrids(city._id); 

//                     var pol = document.createElement('div');
//                     // <input type="checkbox" id="casaCheck"></input>
//                     var check = document.createElement('input');
//                     check.type="checkbox";
//                     check.className = "PolyChecker"
//                     check.onchange = function(e){
//                         if(this.checked){
//                             self._retrievePoly(city.polycords);
//                             var s = this;
//                             document.querySelectorAll('.PolyChecker').forEach(function(item){
//                                 if(item !== s)
//                                     item.checked = false;
//                             });
//                         }else {
//                             self.pol.setMap(null);
//                         }
//                     }
//                     pol.appendChild(check);
//                     // pol.innerHTML +='<label for="casaCheck">Display Delimeters</label>'; 
                    

//                     var stats = document.createElement('div');
//                     var sInp = document.createElement('input');
//                     sInp.type = 'checkbox';
//                     sInp.className = "GridChecker";
//                     if(self._hasCityGrid(city._id)){
//                         sInp.onclick = function(){
//                             if(this.checked){
//                                 for(var x=0;x<self.statGrids.length;x++){
//                                     self.statGrids[x].setMap(null); 
//                                 }
//                                 self.statGrids = [];
//                                 var s = this;
//                                 document.querySelectorAll('.GridChecker').forEach(function(item){
//                                     if(item !== s)
//                                         item.checked = false;
//                                 });
//                                 if(self.searchPoly)
//                                 self.searchPoly.setMap(null);
//                                 self._retrievePoly(city.polycords, false);
//                                 self._retrieveGrid(self._getGridId(city._id));
//                                 document.querySelector('.search').style.display = "block";
//                                 document.querySelector('.search form').onsubmit = async function(e){
//                                     e.preventDefault();
//                                     var val = document.querySelector('.search__box').value.split(',');
//                                     var coords = '{"lat":'+val[0]+',"lng":'+val[1]+'}';
//                                         if(coords){
//                                             var zoneRect;
//                                             try {
//                                                 zoneRect = self.polyHandler.findZone(JSON.parse(coords));
//                                             }catch(e){
//                                             document.querySelector('.search__define').classList.add("search__define--show");
//                                             document.querySelector('.search__define').innerHTML = '<h2>NO RESULT FOUND</h2>';
//                                             document.querySelector('.search__extra__define').classList.remove("search__extra__define--show");

//                                             if(self.searchPoly)
//                                                 self.searchPoly.setMap(null);
//                                                 return ;
//                                             }

//                                             var poly = [ zoneRect.leftBot,
//                                                 zoneRect.rightBot,
//                                                 zoneRect.rightTop,
//                                                 zoneRect.leftTop];
//                                             self.map._zoomToObject(undefined, poly);
        
//                                             if(self.searchPoly)
//                                                 self.searchPoly.setMap(null);
        
//                                             self.searchPoly = self.map.addSearchPoly(poly);
//                                             document.querySelector('.search__define').classList.add("search__define--show");
//                                             document.querySelector('.search__define').innerHTML = '<h2>ZONE #'+zoneRect.id+'</h2>';
//                                             document.querySelector('.search__extra__define').classList.add("search__extra__define--show");

//                                             var can = document.createElement('canvas');
//                                             can.className = "chart";
//                                             var chart = can.getContext('2d');
//                                             document.querySelector('.search__extra__define').innerHTML = "";
//                                             document.querySelector('.search__extra__define').appendChild(can);

//                                             let data = await(await fetch("/zone-stats/"+city._id+"/"+zoneRect.id, {method: 'POST'})).json();
//                                             var fillData = [];
//                                             if('1' in data){
//                                                 for(var x=1;x<=12;x++){
//                                                     fillData.push(data[''+x]);
//                                                 }
//                                             }else{
//                                                 fillData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//                                             }
//                                             var massPop = new Chart(chart, {
//                                                 type: 'bar',
//                                                 data: {
//                                                     labels: ['Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//                                                     datasets: [
//                                                         {
//                                                             label: 'Users',
//                                                             data: fillData,
//                                                             backgroundColor: '#f1c40f'
//                                                         }
//                                                     ],
//                                                 },
//                                                 options: {}
//                                             });
//                                         }else {
//                                             document.querySelector('.search__define').classList.add("search__define--show");
//                                             document.querySelector('.search__define').innerHTML = '<h2>NO RESULT FOUND</h2>';
//                                             document.querySelector('.search__extra__define').classList.remove("search__extra__define--show");
                                            
//                                             if(self.searchPoly)
//                                                 self.searchPoly.setMap(null);
//                                         }
//                                 };
//                             }else {
//                                 for(var x=0;x<self.statGrids.length;x++){
//                                     self.statGrids[x].setMap(null); 
//                                 }
//                                 self.statGrids = [];
//                                 self._emptyGrid();
//                                 document.querySelector('.search__box').value  = "";
//                                 if(self.searchPoly)
//                                     self.searchPoly.setMap(null);
//                                 document.querySelector('.search').style.display = "none";
//                                 document.querySelector('.search__define').classList.remove("search__define--show");
//                                 document.querySelector('.search__extra__define').classList.remove("search__extra__define--show");
//                             }
//                         };
//                         stats.appendChild(sInp);
//                     }else{
//                         document.querySelector('.search__box').value  = "";
//                         if(self.searchPoly)
//                         self.searchPoly.setMap(null);
//                         var btn = document.createElement('button');
//                         btn.classList.add('options__btn');
//                         btn.innerHTML = 'Generate Grid';

//                         btn.onclick = function(){
//                             self.cityIdHolder = city._id;
//                             document.querySelector('.generator__bg').onclick = function(){
//                                 document.querySelector('.generator').classList.remove('generator--show');
//                             }
//                             document.querySelector('.generator').classList.add('generator--show');
//                             document.querySelector('#cityName').innerHTML = city.name;


//                             self.setupGridGen();
//                         };
//                         stats.appendChild(btn);
//                     }
                    

                    
//                     var toggler = document.createElement('div');
//                     toggler.innerHTML = '<label for="'+city.name+'"><svg class="options__svg__conf '+city.name+'P"  id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m482 256c0-4.898-.162-9.85-.483-14.791l27.511-25.177-1.59-8.242c-2.012-10.424-4.692-20.819-7.967-30.896-3.273-10.077-7.216-20.063-11.717-29.683l-3.558-7.602-37.041-4.197c-5.266-8.327-11.092-16.334-17.405-23.92l7.46-36.553-6.129-5.732c-7.751-7.248-16.03-14.083-24.607-20.314-8.574-6.23-17.634-11.993-26.926-17.127l-7.347-4.059-32.402 18.36c-9.176-3.664-18.613-6.728-28.194-9.154l-15.427-33.909-8.33-1.033c-10.538-1.308-21.253-1.971-31.848-1.971l-60 90.5 60 90.5c41.421 0 75 33.579 75 75s-33.579 75-75 75l-50 90.5 50 90.5c10.599 0 21.313-.663 31.849-1.972l8.329-1.034 15.427-33.907c9.581-2.427 19.019-5.49 28.194-9.154l32.402 18.36 7.347-4.059c9.292-5.134 18.352-10.896 26.925-17.126 8.578-6.232 16.857-13.067 24.608-20.315l6.129-5.732-7.46-36.553c6.313-7.586 12.14-15.593 17.405-23.92l37.041-4.197 3.558-7.602c4.501-9.619 8.443-19.605 11.716-29.681 3.275-10.079 5.956-20.475 7.968-30.898l1.59-8.241-27.511-25.178c.321-4.942.483-9.892.483-14.791z" fill="#83a3ab"/><path d="m181 256c0-41.421 33.579-75 75-75v-181c-10.595 0-21.31.663-31.848 1.971l-8.33 1.033-15.427 33.909c-9.581 2.427-19.017 5.49-28.194 9.154l-32.402-18.36-7.347 4.059c-9.292 5.134-18.352 10.896-26.925 17.126-8.578 6.232-16.857 13.067-24.608 20.315l-6.129 5.732 7.46 36.553c-6.315 7.588-12.141 15.593-17.405 23.921l-37.041 4.196-3.558 7.602c-4.5 9.616-8.442 19.603-11.717 29.681-3.276 10.082-5.956 20.478-7.967 30.9l-1.59 8.24 27.511 25.177c-.321 4.941-.483 9.893-.483 14.791 0 4.899.162 9.849.483 14.791l-27.51 25.177 1.59 8.24c2.011 10.423 4.69 20.818 7.967 30.899 3.274 10.079 7.217 20.065 11.717 29.682l3.558 7.602 37.041 4.196c5.265 8.328 11.09 16.333 17.405 23.921l-7.46 36.553 6.129 5.732c7.751 7.248 16.03 14.083 24.607 20.314 8.574 6.23 17.634 11.993 26.926 17.127l7.347 4.059 32.402-18.36c9.178 3.664 18.613 6.728 28.194 9.154l15.427 33.907 8.329 1.034c10.535 1.309 21.249 1.972 31.848 1.972v-181c-41.421 0-75-33.579-75-75z" fill="#93b7c0"/><path d="m256 90-40 60.5 40 60.5c24.853 0 45 20.147 45 45s-20.147 45-45 45l-40 60.5 40 60.5c91.679 0 166-74.321 166-166s-74.321-166-166-166z" fill="#667e97"/><path d="m211 256c0-24.853 20.147-45 45-45v-121c-91.679 0-166 74.321-166 166s74.321 166 166 166v-121c-24.853 0-45-20.147-45-45z" fill="#728e95"/></g></svg></label>';

//                     var inp = document.createElement('input');
//                     inp.type = "checkbox";
//                     inp.id = city.name;
//                     inp.classList.add('options__toggle');
//                     inp.onchange = function(){
//                         window.check(this, city.name+'P');
//                     };

//                     var conf = document.createElement('div');
//                     conf.classList.add('options__conf');
//                     conf.id = city.name+'P';

//                     var opts = document.createElement('select');
//                     opts.id = city.name+"-timezone";

//                     var fullYear = document.createElement('option');
//                     fullYear.value = '0';
//                     fullYear.innerHTML = "ALL YEAR";
//                     opts.appendChild(fullYear);

//                     for(var x=1;x<=12;x++){
//                         var month = document.createElement('option');
//                         month.value = x;
//                         month.innerHTML = x;
//                         opts.appendChild(month);
//                     }
              


//                     var timeContainer = document.createElement('div');
//                     timeContainer.className = "time-container";

//                     var text = document.createElement('h2');
//                     text.innerHTML = 'Choose Month/Period :';
//                     timeContainer.appendChild(text);
//                     timeContainer.appendChild(opts);

//                     var genStats = document.createElement('button');
//                     genStats.classList.add('genstat');
//                     genStats.innerHTML = "GENERATE STATISTICS";

//                     genStats.onclick = async function(){

//                         var data = new URLSearchParams();
//                         data.append('city', city._id);
//                         data.append('month', opts.value);

//                         let obj = await (await fetch('/month-stats', {method: 'POST', body: data})).json();
//                        if(obj.total == 0){ //No Data Found Path
                           
//                        }else { // Data Generated
//                         if(!sInp.checked)
//                             sInp.click();

//                         // var total = obj.total;


//                         for(var x=0;x<self.statGrids.length;x++){
//                             self.statGrids[x].setMap(null); 
//                         }
//                         self.statGrids = [];

//                         var opTotal = 0;
//                         for(var x=0;x<obj.data.length;x++){
//                             var data = obj.data[x];
//                             opTotal = (data.counter > opTotal) ? data.counter : opTotal;
//                         }

            
//                         obj.data.forEach(function(statData){
//                             var rect = [];
//                             var opacity = statData.counter / opTotal;
//                             for(var x=0;x<statData.rect.length;x++){
//                                 rect.push({lat: statData.rect[x][0], lng: statData.rect[x][1]});
//                             }
//                             self._retrievePoly(city.polycords, false);

//                             self.statGrids.push(self.map.addStatPoly(rect, opacity, function(e){
//                                 document.querySelector('.search').style.display = "block";
//                                 document.querySelector('.search__box').value = e.latLng.lat() + ', '+e.latLng.lng();
//                                 document.querySelector('.search__btn').click();
                            
//                         }));
                            
//                         });
//                        }
//                     }


//                     conf.appendChild(timeContainer);
//                     conf.appendChild(genStats);

//                     cont.appendChild(id);
//                     cont.appendChild(name);
//                     cont.appendChild(status);
//                     cont.appendChild(GG);
//                     cont.appendChild(pol);
//                     cont.appendChild(stats);
//                     cont.appendChild(toggler);

//                     var container = document.querySelector('.options__content');
//                     container.appendChild(cont);
//                     container.appendChild(inp);
//                     container.appendChild(conf);
                    
//                 });

//             }


//         };

//         return MainController;
//     })();

//     MainController.create = function(map){
//         return new MainController(map);
//     }

//     window.MainController = MainController;
// })(window, document)