
let beforeScrollPosition = 0; 
let popupOpenType = false;

// 팝업 뒤 html 스크롤 조정가능여부
window.addEventListener('scroll', function() {
    const htmlEl = document.getElementsByTagName('html')[0];
    
    if(popupOpenType) {
        htmlEl.scrollTop = beforeScrollPosition;
    } else {
        beforeScrollPosition = htmlEl.scrollTop;
    }
});

window.onload = function(){
    // 메뉴 슬라이드 버튼
    const menu_slide_btn = document.querySelector('.menu_slide_btn');
    menu_slide_btn.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.parentNode.parentNode.classList.toggle('on');
    });

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
        popupOpenType = true; // html스크롤 조절불가능
    }

    // 팝업 닫기
    for(let j = 0; j < target.length; j++){
        btnPopClose.addEventListener('click', function(){
            this.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        });
        popupOpenType = false; // html스크롤 조절가능
    }
}

