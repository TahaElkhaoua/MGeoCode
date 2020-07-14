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


    document.querySelector('.register').onsubmit =function(e){
        e.preventDefault();

        var data = new URLSearchParams();
        data.append('fName', document.getElementById('fName').value);
        data.append('lName', document.getElementById('lName').value);
        data.append('address', document.getElementById('address').value);
        data.append('phone', document.getElementById('phone').value);
        data.append('email', document.getElementById('email').value);
        data.append('password', document.getElementById('password').value);
    
        fetch('/create-user', {
            method: 'POST',
            body: data
        }).then(function(res){
            if(res.ok){
                doc.querySelector('#login-btn').click();
            }else {

            }
        }).catch(function(error){
            console.log(error.message);
        });
    }
    document.querySelector('.login').onsubmit = function(e){
        e.preventDefault();

        var data = new URLSearchParams();
        data.append('email', document.getElementById('lEmail').value);
        data.append('password', document.getElementById('lPassword').value);

        fetch('/login', { method: 'POST', body: data }).then(function(res){
            if(res.ok){
                res.text().then(function(data){
                    if(data === 'SUCCESS')
                        return window.location.href = "/";
                    
                  document.querySelector('.failed-login-text').innerHTML = data
                });
            }else {
                document.querySelector('.failed-login-text').innerHTML = "ERROR : please try again.";
            }
        });
    };

})(window, document);