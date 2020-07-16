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
            _retrievePoly: async function(id){
                var polies = await (await fetch('/get-polies/'+id, {method: 'POST'})).json();
                
                if(this.pol) this.pol.setMap(null);
                this.pol = this.map.addPoly(polies);
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
                rects.forEach(function(anotherArr){
                    anotherArr.forEach(function(rect){

                        self.grid.push(self.map.addGrid(new Rect(rect.center, [
                            rect.leftBot,
                            rect.rightBot,
                            rect.rightTop,
                            rect.leftTop
                        ],
                        ++i).getPath()));
                    });
                });

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
                                self._retrieveGrid(self._getGridId(city._id));
                            }else {
                                self._emptyGrid();
                            }
                        };
                        stats.appendChild(sInp);
                    }else{
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
                    toggler.innerHTML = '<label for="'+city.name+'">&#8595;</label>';

                    var inp = document.createElement('input');
                    inp.type = "checkbox";
                    inp.id = city.name;
                    inp.classList.add('options__toggle');
                    inp.onchange = function(){window.check(this, '#'+city.name+'P')};

                    var conf = document.createElement('div');
                    conf.classList.add('options__conf');
                    conf.id = city.name+'P';

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