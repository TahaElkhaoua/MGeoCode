!function(e,t,o){var n={center:{lat:33.5803154,lng:-7.6036127},zoom:12,disableDefaultUI:!0,styles:e.mapStyle1},s=document.querySelector(".map"),c=o.create(s,n);MainController.create(c).retrieveCities();e.showPosition=function(e){},navigator.geolocation&&navigator.geolocation.getCurrentPosition(showPosition),check=function(e,t){var o=document.querySelector("#"+t),n=document.querySelector("."+t);o.classList.contains("options__conf--show")?(o.classList.remove("options__conf--show"),n.classList.remove("options__svg__conf--show")):(o.classList.add("options__conf--show"),n.classList.add("options__svg__conf--show"))},c.gMap.setZoom(13),setupOptionsUI=function(){var e=document.querySelector(".user-selector"),t=document.querySelector(".key-selector"),o=document.querySelector(".user__opts"),n=document.querySelector(".key__opts");e.onho,e.onclick=function(){o.classList.contains("container__options__content--selected")?(o.classList.remove("container__options__content--selected"),e.classList.remove("container__options-item--selected")):(o.classList.add("container__options__content--selected"),e.classList.add("container__options-item--selected"),n.classList.remove("container__options__content--selected"),t.classList.remove("container__options-item--selected"))},t.onclick=function(){n.classList.contains("container__options__content--selected")?(n.classList.remove("container__options__content--selected"),t.classList.remove("container__options-item--selected")):(n.classList.add("container__options__content--selected"),t.classList.add("container__options-item--selected"),o.classList.remove("container__options__content--selected"),e.classList.remove("container__options-item--selected"))},document.querySelector(".key__opts form").onsubmit=async function(e){e.preventDefault();var t=await(await fetch("/gen-key",{method:"POST"})).text(),o=document.createElement("div");o.className="key","Only Three keys allowed per user"!=t?(o.innerHTML=t,document.querySelector(".key__opts-key").append(o)):document.querySelector(".error-key").innerHTML=t}},document.querySelector(".user__opts form").onsubmit=async function(e){e.preventDefault();var t=new URLSearchParams;t.append("email",document.querySelector("#lEmail").value),t.append("password",document.querySelector("#lPassword").value),t.append("phone",document.querySelector("#phone").value);var o=await(await fetch("/update",{method:"POST",body:t})).text();document.querySelector(".sucerr").innerHTML=o},setupOptionsUI()}(window,document,window.Mapster||(window.Mapster={}));

// (function(win, doc, mapster){
//     var options =  {
//         center: {lat : 33.5803154,lng: -7.6036127}, //Casa Center
//         zoom: 12,
//         disableDefaultUI: true,
//         styles: win.mapStyle1
//         };
//     var element = document.querySelector('.map');
//     var map = mapster.create(element,options);

//     var mapC = MainController.create(map);
//     mapC.retrieveCities();



//     function getLocation() {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(showPosition);
//         } 
//       }
//       var self = this;
//     win.showPosition = function(position){
//         // map._zoomToObject(undefined, [{lat: position.coords.latitude,lng:  position.coords.longitude}]);
//     }
//     getLocation();
  


//     check = function(element, changer){
//         var ele = document.querySelector("#"+changer);
//         var ele2 = document.querySelector('.'+changer);
//         if(ele.classList.contains('options__conf--show')){
//              ele.classList.remove('options__conf--show');
//              ele2.classList.remove('options__svg__conf--show');
//         }else{
//         ele.classList.add('options__conf--show');
//         ele2.classList.add('options__svg__conf--show');
//         }
//     }
//     map.gMap.setZoom(13);


//     setupOptionsUI = function(){
//         var userBtn = document.querySelector('.user-selector');
//         var keyBtn = document.querySelector('.key-selector');

//         var userDialogue = document.querySelector('.user__opts');
//         var keyDaialoque = document.querySelector('.key__opts');

//         userBtn.onho
//         userBtn.onclick = function(){
//             if(!userDialogue.classList.contains('container__options__content--selected')){
//                 userDialogue.classList.add('container__options__content--selected');
//                 userBtn.classList.add('container__options-item--selected');

//                 keyDaialoque.classList.remove('container__options__content--selected');
//                 keyBtn.classList.remove('container__options-item--selected');
//             }else{
//                 userDialogue.classList.remove('container__options__content--selected');
//                 userBtn.classList.remove('container__options-item--selected');
//             }
//         };
//         keyBtn.onclick = function(){
//             if(!keyDaialoque.classList.contains('container__options__content--selected')){
//                 keyDaialoque.classList.add('container__options__content--selected');
//                 keyBtn.classList.add('container__options-item--selected');

//                 userDialogue.classList.remove('container__options__content--selected');
//                 userBtn.classList.remove('container__options-item--selected');
//             }else{
//                 keyDaialoque.classList.remove('container__options__content--selected');
//                 keyBtn.classList.remove('container__options-item--selected');
//             }
//         };


//         document.querySelector('.key__opts form').onsubmit = async function(e){
//             e.preventDefault();
//             // keyBtn.click();
//             var data = await (await fetch('/gen-key', {method: 'POST'})).text();
//             var element = document.createElement('div');
//             element.className = "key";
//             if(data == 'Only Three keys allowed per user'){

//                 document.querySelector('.error-key').innerHTML = data;
//                 return;
//             }
//             element.innerHTML = data;
//             document.querySelector('.key__opts-key').append(element);
//         };
//     }

//     document.querySelector('.user__opts form').onsubmit = async function(e){
//         e.preventDefault();
//         // keyBtn.click();

//         var dd = new URLSearchParams();

//         dd.append('email', document.querySelector('#lEmail').value);
//         dd.append('password', document.querySelector('#lPassword').value);
//         dd.append('phone', document.querySelector('#phone').value);

//         var data = await (await fetch('/update', {method: 'POST', body: dd})).text();
//        document.querySelector('.sucerr').innerHTML = data;
//     };


//     setupOptionsUI();
// })(window, document, window.Mapster || (window.Mapster = {}));