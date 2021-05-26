var pagingstart = {
    NoMoreData: false,
    inProgress: false,
    url: "/Content/_List",
    param: {
        pageidx: 1
    },
    init: function (url) {
        pagingstart.url = url;
        this.testAjax();
        this.testEvent();
    },
    testEvent: function () {
        // 무한 스크롤
        $(window).scroll(function () {
            // 맨 밑으로 스크롤이 갔을경우 if문을 탑니다.

            //끝에 닿기전에 미리 함수실행
            var ftHt = $('footer').innerHeight();
            var max_height = $(document).height();
            var now_height = $(window).scrollTop() + $(window).height();
            if ((max_height <= now_height + ftHt) && !NoMoreData && !inProgress) {

                pagingstart.param.pageidx++; // 현재 페이지에서 +1 처리.

                pagingstart.param.listtype=$(".listtype-tab.on").attr("data-list");
                console.log(pagingstart.param.pageidx);
                inProgress = true;
                pagingstart.testAjax(); //ajax 호출
            }

          
            //if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            //    console.log("스크롤 인식");
            //    console.log($(window).scrollTop()) ;

            //    start.param.pageidx++; // 현재 페이지에서 +1 처리.
            //    console.log(start.param.pageidx);
            //    start.testAjax(); //ajax 호출
            //}
        });
    },
    // 무한 스크롤 ajax 요청
    testAjax: function () {
        $.ajax({
            type: 'POST',
            url: pagingstart.url,
            data: JSON.stringify(pagingstart.param), // 다음 페이지 번호와 페이지 사이즈를 가지고 갑니다.
            dataType: 'json',
            async: false,
            contentType: "application/json",
            success: successCallback,
            error: errorCallback
        });
        // 성공
        function successCallback(data) {
            NoMoreData = data.NoMoreData;
            //testLoading.show(); //로딩 on(로딩바가 있을경우만 넣습니다. 없을경우 빼셔도 상관 없습니다.)
            $('#contentArea').append(data.HTMLString);
            // testLoading.hide(); //로딩 off(로딩바가 있을경우만 넣습니다. 없을경우 빼셔도 상관 없습니다.)
            inProgress = false;
        }

        // 실패
        function errorCallback() {
            alert("실패");
        }
    },

    // 테스트 데이터 setting

}