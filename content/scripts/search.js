$(document).ready(function () {
    $(".btnSearch").on("click", function (e) {
        e.preventDefault();

        var searchText = $("#txtSearchPC").val();
        if (searchText == "") {
            searchText = $("#txtSearchMO").val();
        }

        if (searchText == "") { alert("검색어를 입력해 주세요."); return false; }
        else {
            if (DoubleSubmitCheck()) { alert("처리 중입니다. 잠시만 기다려 주세요."); return; }

            var formJson = {
                "searchText": searchText
            };

            $.post("/Search/SearchSave", {
                p: GetJsonToEncParam(formJson)
            }, function (result) {
                if (result.success) {
                    location = "/Search?searchText=" + searchText;
                }
                else {
                    doubleSubmitFlag = false;
                    return;
                }
            }).error(function (e) {
                alert(e.responseJSON.errorMessage);
                doubleSubmitFlag = false;
            });
        }
    });

    $('#txtSearchPC,#txtSearchMO').keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(".btnSearch").click();
        }
    });

    $("#familysite").change(function (e) {
        e.preventDefault();
        var selValue = $("#familysite").val();
        if (selValue != "") {
            var win = window.open(selValue);
        }
    });
});

function searchTextEvent(obj) {
    var searchText = $(obj).data("id");
    if (searchText != "") {
        location = "/Search?searchText=" + searchText;
    }
} 