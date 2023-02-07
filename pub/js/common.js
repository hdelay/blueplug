window.onload = function(){
    
    // 메뉴 슬라이드 버튼
    const menu_slide_btn = document.querySelector('.menu_slide_btn');
    if(menu_slide_btn){
        menu_slide_btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentNode.parentNode.parentNode.classList.toggle('on');
        });
    }

    // nav
    const buttons = document.querySelectorAll('.acc_btn');
    buttons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            this.parentNode.classList.toggle('on');
            buttons.forEach(function(button2, index2) {
                if ( index !== index2 ) {
                    button2.parentNode.classList.remove('on');
                }
            });
        });
    });

    // 팝업
    let target = document.querySelectorAll('.pop_open');
    let btnPopClose = document.querySelectorAll('.pop_close');
    let targetID;

    // 팝업 열기
    for(let i = 0; i < target.length; i++){
        target[i].addEventListener('click', function(){
            targetID = this.getAttribute('data-target');
            document.querySelector(targetID).style.display = 'flex';
        });
    }
    
    // 팝업 닫기
    for(let j = 0; j < btnPopClose.length; j++){
        btnPopClose[j].addEventListener('click', function(){
            this.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        });
    }

    // 커스텀 select
    const label = document.querySelectorAll('.label');
    let sel;
    label.forEach(function(lb){
        lb.addEventListener('click', e => {
            let optionList = lb.nextElementSibling;
            let optionItems = optionList.querySelectorAll('.opt_item');
            clickLabel(lb, optionItems);
        })
    });
    const clickLabel = (lb, optionItems) => {
        if(lb.parentNode.classList.contains('on')) {
            lb.parentNode.classList.remove('on');
            optionItems.forEach((opt) => {
                opt.removeEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
        } else {
            lb.parentNode.classList.add('on');
            optionItems.forEach((opt) => {
                opt.addEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
            return sel = true;
        }
    }
    const handleSelect = (label, item) => {
        label.firstChild.innerHTML = item.textContent;
        label.parentNode.classList.remove('on');
    }

    // 로그인 패스워드 보기
    const login_pw_eyebtn = document.querySelector('.ico_eye');
    if(login_pw_eyebtn){
        login_pw_eyebtn.addEventListener('click', function() {
            const previnp = this.previousSibling.previousSibling;
            if(previnp.getAttribute('type') === 'password'){
                previnp.setAttribute('type', 'text');
                this.classList.add('on')
            } else {
                previnp.setAttribute('type', 'password');
                this.classList.remove('on')
            }
        });
    }
}

// 로딩 open
function loading_open(){
    const loading_g = document.querySelector('body').insertAdjacentHTML('afterend',
        `<div class="loading_box">
            <div class="loading"></div>
            <div class="loading-text">loading</div>
        </div>`
    );
}
// 로딩 close
function loading_close(){
    const close_true = document.querySelector('.loading_box');
    if(close_true){
        close_true.remove();
    }
}