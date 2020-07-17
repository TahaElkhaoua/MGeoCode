(function(window, documents){

    var MainController = (function(){

        function MainController(map){
            this.data = [];
            this.cities = [];
            this.map = map;
            this.pol;
            this.grid = [];
            this.polyHandler;
            this.cityIdHolder;
            this.searchPoly;
        }
        MainController.prototype = {
            retrieveCities: async function(){
                this.cities = await (await fetch('/get-all-cities', {method: 'post'})).json();
                this._fillCities(this,function(){
                    this._setUI();
                });
            },
            _fillCities: async function(context, callback){
                this.data = await (await fetch('/has-city-grid/', {method: 'POST'})).json();
                callback.call(context);
            },
            _hasCityGrid:  function(cid){
                for(var i=0;i<this.data.length;i++){
                    if(cid == this.data[i].city)
                        return true;
                }
                return false;
            },
            _getGrids: function(cid){
                for(var i=0;i<this.data.length;i++){
                    if(cid == this.data[i].city)
                        return this.data[i].size;
                }
                return 'N/A';
            },
            _retrievePoly: async function(id, draw=true){
                var polies = await (await fetch('/get-polies/'+id, {method: 'POST'})).json();
                
              if(draw){
                if(this.pol) this.pol.setMap(null);
                this.pol = this.map.addPoly(polies);
              }
              this.map._zoomToObject(undefined,polies);
            },
            _getGridId: function(cid){
                for(var i=0;i<this.data.length;i++){
                    if(cid == this.data[i].city)
                        return this.data[i].grid;
                }
                return null;
            },
            _retrieveGrid: async function(id){
                var self = this;
                var rects = await (await fetch('/get-grids/'+id, {method: 'POST'})).json();
                var i = 0;
                this._emptyGrid();
                var arr = new List();
                for(var n=0;n<rects.length;n++){
                    var arrLat = new List();
                    for(var l=0;l<rects[n].length;l++){

                        var r = new Rect(rects[n][l].center, [
                            rects[n][l].leftBot,
                            rects[n][l].rightBot,
                            rects[n][l].rightTop,
                            rects[n][l].leftTop
                        ],
                        ++i);
                        self.grid.push(self.map.addGrid(r.getPath(), function(e){
                            document.querySelector('.search__box').value = e.latLng.lat() + ', '+e.latLng.lng();
                            document.querySelector('.search__btn').click();
                        }));
                        arrLat.add(r);
                    };
                    arr.add(arrLat);
                };

                self.polyHandler = new PolyHandler(undefined, undefined, undefined, self.pol, undefined, arr);
            },
            _emptyGrid: function(){
                this.grid.forEach(function(grid){
                    grid.setMap(null);
                });
            },
            setupGridGen: function(){
                var self = this;
                document.querySelector('.generator__form').onsubmit = async function(e){
                    e.preventDefault();
                    var value = document.querySelector('#selector').value;
                    
                    var sendVal = await (await fetch('/insert-city/'+self.cityIdHolder+'/'+value, {method: 'POST'})).json();
                    console.log(sendVal);
                    document.querySelector('.generator').classList.remove('generator--show');
                    self.retrieveCities();
                };
            }
            ,_setUI: function(city){
                var self = this;
                document.querySelector('.options__content').innerHTML = "";
                this.cities.forEach(function(city){

                    var cont = document.createElement('div');
                    cont.classList.add('options__item');
                    cont.classList.add('u-text-center');

                   
                    var id = document.createElement('div');
                    id.innerHTML = "5555";

                    var name = document.createElement('div');
                    name.innerHTML = city.name;
                    
                    var status = document.createElement('div');

                    var activeText = "<svg class='options__svg'><use xlink:href='#idea' /></svg>";
                    var unactiveText = "<svg class='options__svg'><use xlink:href='#street-lamp' /></svg>";

                    status.innerHTML = (self._hasCityGrid(city._id)) ? activeText+'<p>ACTIVE</p>' : unactiveText+'INACTIVE';

                    var GG = document.createElement('div');
                    GG.innerHTML = self._getGrids(city._id); 

                    var pol = document.createElement('div');
                    // <input type="checkbox" id="casaCheck"></input>
                    var check = document.createElement('input');
                    check.type="checkbox";
                    check.onchange = function(e){
                        if(this.checked){
                            self._retrievePoly(city.polycords);
                        }else {
                            self.pol.setMap(null);
                        }
                    }
                    pol.appendChild(check);
                    // pol.innerHTML +='<label for="casaCheck">Display Delimeters</label>'; 
                    

                    var stats = document.createElement('div');
                    var sInp = document.createElement('input');
                    sInp.type = 'checkbox';

                    if(self._hasCityGrid(city._id)){
                        sInp.onclick = function(){
                            if(this.checked){
                                self._retrievePoly(city.polycords, false);
                                self._retrieveGrid(self._getGridId(city._id));
                                document.querySelector('.search').style.display = "block";
                                document.querySelector('.search form').onsubmit = function(e){
                                    e.preventDefault();
                                    var val = document.querySelector('.search__box').value.split(',');
                                    var coords = '{"lat":'+val[0]+',"lng":'+val[1]+'}';
                                        if(coords){
                                            var zoneRect;
                                            try {
                                                zoneRect = self.polyHandler.findZone(JSON.parse(coords));
                                            }catch(e){
                                            document.querySelector('.search__define').classList.add("search__define--show");
                                            document.querySelector('.search__define').innerHTML = '<h2>NO RESULT FOUND</h2>';
                                            document.querySelector('.search__extra__define').classList.remove("search__extra__define--show");
                                                return ;
                                            }

                                            var poly = [ zoneRect.leftBot,
                                                zoneRect.rightBot,
                                                zoneRect.rightTop,
                                                zoneRect.leftTop];
                                            self.map._zoomToObject(undefined, poly);
        
                                            if(self.searchPoly)
                                                self.searchPoly.setMap(null);
        
                                            self.searchPoly = self.map.addSearchPoly(poly);
                                            document.querySelector('.search__define').classList.add("search__define--show");
                                            document.querySelector('.search__define').innerHTML = '<h2>ZONE #'+zoneRect.id+'</h2>';
                                            document.querySelector('.search__extra__define').classList.add("search__extra__define--show");
                                        }else {
                                            document.querySelector('.search__define').classList.add("search__define--show");
                                            document.querySelector('.search__define').innerHTML = '<h2>NO RESULT FOUND</h2>';
                                            document.querySelector('.search__extra__define').classList.remove("search__extra__define--show");
                                        }
                                };
                            }else {
                                self._emptyGrid();
                                document.querySelector('.search__box').value  = "";
                                if(self.searchPoly)
                                    self.searchPoly.setMap(null);
                                document.querySelector('.search').style.display = "none";
                                document.querySelector('.search__define').classList.remove("search__define--show");
                                document.querySelector('.search__extra__define').classList.remove("search__extra__define--show");
                            }
                        };
                        stats.appendChild(sInp);
                    }else{
                        document.querySelector('.search__box').value  = "";

                        var btn = document.createElement('button');
                        btn.classList.add('options__btn');
                        btn.innerHTML = 'Generate Grid';

                        btn.onclick = function(){
                            self.cityIdHolder = city._id;
                            document.querySelector('.generator__bg').onclick = function(){
                                document.querySelector('.generator').classList.remove('generator--show');
                            }
                            document.querySelector('.generator').classList.add('generator--show');
                            document.querySelector('#cityName').innerHTML = city.name;


                            self.setupGridGen();
                        };
                        stats.appendChild(btn);
                    }
                    

                    
                    var toggler = document.createElement('div');
                    toggler.innerHTML = '<label for="'+city.name+'"><svg class="options__svg__conf '+city.name+'P"  id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m482 256c0-4.898-.162-9.85-.483-14.791l27.511-25.177-1.59-8.242c-2.012-10.424-4.692-20.819-7.967-30.896-3.273-10.077-7.216-20.063-11.717-29.683l-3.558-7.602-37.041-4.197c-5.266-8.327-11.092-16.334-17.405-23.92l7.46-36.553-6.129-5.732c-7.751-7.248-16.03-14.083-24.607-20.314-8.574-6.23-17.634-11.993-26.926-17.127l-7.347-4.059-32.402 18.36c-9.176-3.664-18.613-6.728-28.194-9.154l-15.427-33.909-8.33-1.033c-10.538-1.308-21.253-1.971-31.848-1.971l-60 90.5 60 90.5c41.421 0 75 33.579 75 75s-33.579 75-75 75l-50 90.5 50 90.5c10.599 0 21.313-.663 31.849-1.972l8.329-1.034 15.427-33.907c9.581-2.427 19.019-5.49 28.194-9.154l32.402 18.36 7.347-4.059c9.292-5.134 18.352-10.896 26.925-17.126 8.578-6.232 16.857-13.067 24.608-20.315l6.129-5.732-7.46-36.553c6.313-7.586 12.14-15.593 17.405-23.92l37.041-4.197 3.558-7.602c4.501-9.619 8.443-19.605 11.716-29.681 3.275-10.079 5.956-20.475 7.968-30.898l1.59-8.241-27.511-25.178c.321-4.942.483-9.892.483-14.791z" fill="#83a3ab"/><path d="m181 256c0-41.421 33.579-75 75-75v-181c-10.595 0-21.31.663-31.848 1.971l-8.33 1.033-15.427 33.909c-9.581 2.427-19.017 5.49-28.194 9.154l-32.402-18.36-7.347 4.059c-9.292 5.134-18.352 10.896-26.925 17.126-8.578 6.232-16.857 13.067-24.608 20.315l-6.129 5.732 7.46 36.553c-6.315 7.588-12.141 15.593-17.405 23.921l-37.041 4.196-3.558 7.602c-4.5 9.616-8.442 19.603-11.717 29.681-3.276 10.082-5.956 20.478-7.967 30.9l-1.59 8.24 27.511 25.177c-.321 4.941-.483 9.893-.483 14.791 0 4.899.162 9.849.483 14.791l-27.51 25.177 1.59 8.24c2.011 10.423 4.69 20.818 7.967 30.899 3.274 10.079 7.217 20.065 11.717 29.682l3.558 7.602 37.041 4.196c5.265 8.328 11.09 16.333 17.405 23.921l-7.46 36.553 6.129 5.732c7.751 7.248 16.03 14.083 24.607 20.314 8.574 6.23 17.634 11.993 26.926 17.127l7.347 4.059 32.402-18.36c9.178 3.664 18.613 6.728 28.194 9.154l15.427 33.907 8.329 1.034c10.535 1.309 21.249 1.972 31.848 1.972v-181c-41.421 0-75-33.579-75-75z" fill="#93b7c0"/><path d="m256 90-40 60.5 40 60.5c24.853 0 45 20.147 45 45s-20.147 45-45 45l-40 60.5 40 60.5c91.679 0 166-74.321 166-166s-74.321-166-166-166z" fill="#667e97"/><path d="m211 256c0-24.853 20.147-45 45-45v-121c-91.679 0-166 74.321-166 166s74.321 166 166 166v-121c-24.853 0-45-20.147-45-45z" fill="#728e95"/></g></svg></label>';

                    var inp = document.createElement('input');
                    inp.type = "checkbox";
                    inp.id = city.name;
                    inp.classList.add('options__toggle');
                    inp.onchange = function(){
                        window.check(this, city.name+'P');
                    };

                    var conf = document.createElement('div');
                    conf.classList.add('options__conf');
                    conf.id = city.name+'P';

                    var genStats = document.createElement('button');
                    genStats.classList.add('genstat');
                    genStats.innerHTML = "GENERATE STATISTICS"
                    conf.appendChild(genStats);

                    cont.appendChild(id);
                    cont.appendChild(name);
                    cont.appendChild(status);
                    cont.appendChild(GG);
                    cont.appendChild(pol);
                    cont.appendChild(stats);
                    cont.appendChild(toggler);

                    var container = document.querySelector('.options__content');
                    container.appendChild(cont);
                    container.appendChild(inp);
                    container.appendChild(conf);
                    
                });

            }


        };

        return MainController;
    })();

    MainController.create = function(map){
        return new MainController(map);
    }

    window.MainController = MainController;
})(window, document)