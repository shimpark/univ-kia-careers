
$(document).ready(function () {

    //로그인 버튼 클릭 > SNS 아이콘 선택
    $('body').on("click", '.btnOpenPopupChoiceSNS', function () {

        JsOpenPopupChoiceSNS();

    });//

    //SNS 아이콘 클릭
    $('body').on("click", '.btnLoginSNS', function () {

        var snstype = $(this).attr("data-id");
        var returnUrl = $("#ReturnUrl").val();

        JsAuthSNS(snstype, returnUrl);

    });//

    //SNS 아이콘 클릭
    $('body').on("click", '.btnLogOutSNS', function () {

        var returnUrl = $("#ReturnUrl").val();
        var url = "/User/Logout?returnUrl=" + returnUrl;
        location.href = url;
    });//

});

/* SNS  **************************
*****************************************/

JsOpenPopupChoiceSNS = function () {
    wrapWindowByMask();
    $('.popupChoiceSNS').css('display', 'block');
}

//JsAuthSNS = function (snstype, returnUrl) {
//    var url = "/Auth/SNSAuth?p=" + GetJsonToEncParam({
//        Type: snstype,
//        AuthGB: "A"
//    });
//    if (IsMobieDevice()) { //20171204이은주 모바일분기: 모바일은 팝업띄우지않는다.
//        url = url + "&returnUrl=" + returnUrl;
//        location.href = url;
//    }
//    else {
//        returnUrl = "/Auth/SNSAuthDone?p=" + GetJsonToEncParam({
//            returnUrl: returnUrl
//        });     //해당페이지에 JsSNSAuthDoneCallback() 함수를 정의 해야 한다.
//        url = url + "&returnUrl=" + returnUrl;
//        window.open(url, "", "");
//    }
//}

JsAuthSNS = function (snstype, authGB, returnUrl) {
    var url = "/Auth/SNSAuth?p=" + GetJsonToEncParam({
        Type: snstype,
        AuthGB: authGB
    });

    url = url + "&returnUrl=" + returnUrl;
    location.href = url;
}



duplicateChk = function (email) {
    var rtn = false;
    var regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!regExp.test(email)) {
        alert("잘못된 이메일 형식입니다.");
        return rtn;
    }
    var requJson = {
        "Email": $.trim(email)
    };

    $.ajax({
        url: '/User/ChkDuplication',
        type: 'post',
        data: {
            p: GetJsonToEncParam(requJson)
        },
        dataType: 'json',
        async: false,
        beforeSend: function () {

        },
        success: function (result) {
            if (result.success) {
                rtn = true;
            }
            else {
                alert('이미 사용중인 이메일 아이디 입니다.');
                rtn = false;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            rtn = false;

        },
        complete: function () {

        }
    });

    return rtn;
}