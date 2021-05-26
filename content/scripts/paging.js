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
        // ���� ��ũ��
        $(window).scroll(function () {
            // �� ������ ��ũ���� ������� if���� ž�ϴ�.

            //���� ������� �̸� �Լ�����
            var ftHt = $('footer').innerHeight();
            var max_height = $(document).height();
            var now_height = $(window).scrollTop() + $(window).height();
            if ((max_height <= now_height + ftHt) && !NoMoreData && !inProgress) {

                pagingstart.param.pageidx++; // ���� ���������� +1 ó��.

                pagingstart.param.listtype=$(".listtype-tab.on").attr("data-list");
                console.log(pagingstart.param.pageidx);
                inProgress = true;
                pagingstart.testAjax(); //ajax ȣ��
            }

          
            //if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            //    console.log("��ũ�� �ν�");
            //    console.log($(window).scrollTop()) ;

            //    start.param.pageidx++; // ���� ���������� +1 ó��.
            //    console.log(start.param.pageidx);
            //    start.testAjax(); //ajax ȣ��
            //}
        });
    },
    // ���� ��ũ�� ajax ��û
    testAjax: function () {
        $.ajax({
            type: 'POST',
            url: pagingstart.url,
            data: JSON.stringify(pagingstart.param), // ���� ������ ��ȣ�� ������ ����� ������ ���ϴ�.
            dataType: 'json',
            async: false,
            contentType: "application/json",
            success: successCallback,
            error: errorCallback
        });
        // ����
        function successCallback(data) {
            NoMoreData = data.NoMoreData;
            //testLoading.show(); //�ε� on(�ε��ٰ� ������츸 �ֽ��ϴ�. ������� ���ŵ� ��� �����ϴ�.)
            $('#contentArea').append(data.HTMLString);
            // testLoading.hide(); //�ε� off(�ε��ٰ� ������츸 �ֽ��ϴ�. ������� ���ŵ� ��� �����ϴ�.)
            inProgress = false;
        }

        // ����
        function errorCallback() {
            alert("����");
        }
    },

    // �׽�Ʈ ������ setting

}