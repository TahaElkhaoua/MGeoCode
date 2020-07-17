

(function(win, doc, mapster){
    var options =  {
        center: {lat : 33.5803154,lng: -7.6036127}, //Casa Center
        zoom: 12,
        disableDefaultUI: true,
        styles: win.mapStyle1
        };
    var element = document.querySelector('.map');
    var map = mapster.create(element,options);

    var mapC = MainController.create(map);
    mapC.retrieveCities();



    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } 
      }
      var self = this;
    win.showPosition = function(position){
        // map._zoomToObject(undefined, [{lat: position.coords.latitude,lng:  position.coords.longitude}]);
    }
    getLocation();
  


    check = function(element, changer){
        var ele = document.querySelector("#"+changer);
        var ele2 = document.querySelector('.'+changer);
        if(ele.classList.contains('options__conf--show')){
             ele.classList.remove('options__conf--show');
             ele2.classList.remove('options__svg__conf--show');
        }else{
        ele.classList.add('options__conf--show');
        ele2.classList.add('options__svg__conf--show');
        }
    }
    map.gMap.setZoom(13);


    setupOptionsUI = function(){
        var userBtn = document.querySelector('.user-selector');
        var keyBtn = document.querySelector('.key-selector');

        var userDialogue = document.querySelector('.user__opts');
        var keyDaialoque = document.querySelector('.key__opts');

        userBtn.onho
        userBtn.onclick = function(){
            if(!userDialogue.classList.contains('container__options__content--selected')){
                userDialogue.classList.add('container__options__content--selected');
                userBtn.classList.add('container__options-item--selected');

                keyDaialoque.classList.remove('container__options__content--selected');
                keyBtn.classList.remove('container__options-item--selected');
            }else{
                userDialogue.classList.remove('container__options__content--selected');
                userBtn.classList.remove('container__options-item--selected');
            }
        };
        keyBtn.onclick = function(){
            if(!keyDaialoque.classList.contains('container__options__content--selected')){
                keyDaialoque.classList.add('container__options__content--selected');
                keyBtn.classList.add('container__options-item--selected');

                userDialogue.classList.remove('container__options__content--selected');
                userBtn.classList.remove('container__options-item--selected');
            }else{
                keyDaialoque.classList.remove('container__options__content--selected');
                keyBtn.classList.remove('container__options-item--selected');
            }
        };


        document.querySelector('.key__opts form').onsubmit = async function(e){
            e.preventDefault();
            // keyBtn.click();
            var data = await (await fetch('/gen-key', {method: 'POST'})).text();
            var element = document.createElement('div');
            element.className = "key";
            if(data == 'Only Three keys allowed per user'){

                document.querySelector('.error-key').innerHTML = data;
                return;
            }
            element.innerHTML = data;
            document.querySelector('.key__opts-key').append(element);
        };
    }

    setupOptionsUI();
})(window, document, window.Mapster || (window.Mapster = {}));