(function(win, doc){

    doc.querySelector('#login-btn').onclick = function(){
        doc.querySelector('.landing__right').classList.add('landing__right--push');
        doc.querySelector('.landing__login').classList.add('landing__login--show');
        doc.querySelector('.landing__register').classList.remove('landing__register--show');
  
    };
    
    doc.querySelector('#register-btn').onclick = function(){
        doc.querySelector('.landing__right').classList.add('landing__right--push');
        doc.querySelector('.landing__register').classList.add('landing__register--show');
        doc.querySelector('.landing__login').classList.remove('landing__login--show');
    };
    
    win.exit = function(){
        doc.querySelector('.landing__login').classList.remove('landing__login--show');
        doc.querySelector('.landing__register').classList.remove('landing__register--show');
        doc.querySelector('.landing__right').classList.remove('landing__right--push');

    };

})(window, document);