
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

$(function(){

    // 메뉴 슬라이드 버튼
    $('.menu_slide_btn').on('click', function(e){
        e.preventDefault();
        $('.wrap').toggleClass('on');
    });

    // nav
    $('nav > ul > li').on('click', function(){
        if($(this).hasClass('on')) {
            $('nav > ul > li').removeClass('on');
            if($('aside').width() > 259){
                $('nav ul ul').slideUp(100);
            } else {
                $('nav ul ul').fadeOut(100);
            }
        } else {
            $('nav > ul > li').removeClass('on');
            $(this).addClass('on');
            if($('aside').width() > 259){
                $(this).siblings().find('ul').slideUp(100);
                $(this).find('ul').slideDown(100);
            } else {
                $(this).siblings().find('ul').fadeOut(100);
                $(this).find('ul').fadeIn(100);
            }
        }
    });

    // 팝업버튼
    let popBtn = $(".dialog-link");
    let popBody = $(".dialog");
    let noteBtn = $(".note_link");
    let noteBody = $(".note_dialog");
    let quick_popBtn = $(".quick_link");
    let quick_popBody = $(".quick_dialog");
    
    popBtn.click(function(e) {
        let poptarget = $(this).attr('data-target');
        $(poptarget).dialog("open");
        popupOpenType = true; // html스크롤 조절불가능
        e.preventDefault();
    });
    quick_popBtn.click(function(){
        let poptarget = $(this).attr('data-target');
        $(poptarget).dialog("open");
        popupOpenType = true; // html스크롤 조절불가능
        e.preventDefault();
    });

    // 팝업 모달
    popBody.dialog({
        width: 'auto',
        autoOpen: false,
        show: {
            effect: "fade",
            duration: 100
        },
        modal: true,
        buttons: [
            {
                text: "닫기",
                click: function() {
                    $(this).dialog("close");
                    popupOpenType = false; // html스크롤 조절가능
                }
            },
        ],
        open: function(){
            $(this).parent().find('.ui-dialog-titlebar').remove();
            $('.pop_close').on('click', function(){
                $(this).parent().parent().parent().dialog("close");
                popupOpenType = false; // html스크롤 조절가능
            });
        }
    });

    // 퀵팝업 body
    quick_popBody.dialog({
        width: 'auto',
        maxWidth: 420,
        title: false, // 다이얼로그 제목
        autoOpen: false,
        show: {
            effect: "fade",
            duration: 100
        },
        modal: true,
        buttons: [{
                text: "닫기",
                click: function() {
                    $(this).dialog("close");
                    popupOpenType = false; // html스크롤 조절가능
                }
            }],
        open: function(){
            $(this).parent().find('.ui-dialog-titlebar').remove();
        }
    });

    // 탭
    $('.tab_group .tab_btn > ul > li > a').on('click', function(e){
        e.preventDefault();
        var on_tab = $(this).attr("rel")

        // 탭 컨텐츠 숨기기
        $(this).parent().siblings().removeClass('on');
        $(this).parent().parent().parent().siblings().children("div").removeClass('on');

        // 체크박스 해제
        $(".chk_all, .all_group input").prop("checked", false);

        // 클릭이벤트
        $(this).parent().addClass('on');
        $("." + on_tab).addClass('on');

        // 더보기이벤트
        $('.tbl_card_list.type_01 .content').each(function(){
            if($(this).find('span').height() > 88){
                $(this).addClass('open');
            }
        });
    });

    // 전체선택
    var checkAll = document.querySelectorAll('.chk_all');
    var chkbox = document.querySelectorAll('.all_group input');
    
    /* 전체선택 클릭시 */
    for(var x = 0; x < checkAll.length; x++){
        checkAll[x].onclick = function(){
            var thisParent = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement; //#wrapper
            var childChkbox = thisParent.querySelectorAll('.all_group input'); //해당 귀속 체크박스만
            
            if(this.checked == false) {
                for(var i=0; i<childChkbox.length; i++){ 
                    childChkbox[i].checked = false; 
                }//for
            } else {
                for(var i=0; i<childChkbox.length; i++){ 
                    childChkbox[i].checked = true; 
                }//for
            }//if,else
        };//onclick
    };//for
    
    /* 하나라도 언체크시 전체선택 해제 */
    for(var x = 0; x < chkbox.length; x++){
        chkbox[x].onclick = function(){
            var thisParent = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement; //#wrapper
            var thisChkAll = thisParent.querySelector('.chk_all');
            var thisChkbox = thisParent.querySelectorAll('.all_group input');

            var total = thisChkbox.length;
            var checked = $(".all_group input:checked").length;

            if(this.checked == false){
                thisChkAll.checked = false;
            }
            // 모두체크시 all체크
            if(total == checked){
                thisChkAll.checked = true;
            } else {
                thisChkAll.checked = false;
            }
        }; //onclick (전체 chkbox)
    };//for(전체 chkbox)

});

//Toast 팝업
function onShowToast(show_txt){
    let obj_toast = $('.toast_box');
    let obj_time = 2000;
    obj_toast.addClass('on');
    obj_toast.find('.txt').text(show_txt);
    setTimeout(function(){
        obj_toast.removeClass('on');
    }, obj_time);
    $(".dialog").dialog("close");
    popupOpenType = false;
    return false;
}