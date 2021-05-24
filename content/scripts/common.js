//control window resize trigger
$(window).resize(function() {
    if(this.resizeTO) {
        clearTimeout(this.resizeTO);
    }
    this.resizeTO = setTimeout(function() {
        $(this).trigger("resizeEnd");
    }, 0);
});

$(document).ready(function(){
    pcNav();
    scrollHd();
    modal();
    formEv();
});

//media query matches value
var mqWeb = window.matchMedia("screen and (min-width: 1200px)");
var mqPad = window.matchMedia("screen and (max-width: 991.98px)");
var mqMobile = window.matchMedia("screen and (max-width: 576.98px)");

//detect iphone
if( /iPhone/i.test(navigator.userAgent) ) {
    $("html").addClass("iphone");
}

//scroll header
function scrollHd() {
    var windowST = $(window).scrollTop();
    var hd = $("header");
    var scrolledHd = $("#scrollHd");

    if(windowST > 0) {
        hd.not(scrolledHd).addClass("scroll");
    } else {
        hd.not(scrolledHd).removeClass("scroll");
    }
    
    $(window).scroll(function(){
        var windowSclST = $(window).scrollTop();
        if(windowSclST > 0) {
            hd.not(scrolledHd).addClass("scroll");
        } else {
            hd.not(scrolledHd).removeClass("scroll");
        }
    });
}

//pc navigation
function pcNav() {
    if (mqWeb.matches) {
        $("header").on("click",".hd-search-btn__open", function(e){
            e.preventDefault();

            $(e.target).hide();
            $(".hd-search-btn__enter").show();
            $(".hd-search-input").addClass("active");
            // $(".hd-search-input").find("input[type='text']").focus(); 0312 zoe 3차 주석 처리
        });
        $("header").on("click", ".hd-search-btn__close", "clicked", function(e) {
            e.preventDefault();

            $(".hd-search-btn__open").show();
            $(".hd-search-btn__enter").hide();
            $(".hd-search-input").removeClass("active"); 
        });
        $("header").on("click",".hd-nav-menu__user", function(e){
            e.preventDefault();

            $(".hd-mymenu-box").show();
        });
        $("header").on("click",".hd-mymenu-btn__close", function(e){
            e.preventDefault();

            $(".hd-mymenu-box").hide();
        });
        $(".hd-nav-menu__user").keydown(function (e) {
            var code = e.keyCode || e.which;
    
            if (code === 13) {
                $(".hd-mymenu-btn__close").focus();
            }
        });
        $("header").on("keydown", ".hd-search-input input", function(){
            $(".hd-search-recommend-list").show();

            if( !$(this).val() ) {
                $(".hd-search-recommend-list").hide();
            }
        });
    }
}

//mobille navigation
if (window.matchMedia("screen and (max-width: 1199.98px)").matches) {
    var openMoNavBtn = $(".mo-nav-btn__open");
    var closeMoNavBtn = $(".mo-nav-btn__close");
    var scrolledHd = $("#scrollHd");

    $("header").on("click", ".mo-nav-btn__open", "clicked", function(e) {
        e.preventDefault();
        $("html").addClass("full");
        $(".mo-nav").addClass("scroll").slideDown(350);
    });
    $("header").on("click", ".mo-nav-btn__close", "clicked", function(e) {
        e.preventDefault();
        $("html").removeClass("full");
        $(".mo-nav").removeClass("scroll").slideUp(350);
    });
    $("header").on("click", ".mo-search-btn__open", "clicked", function(e) {
        e.preventDefault();
        if( $(window).scrollTop() == 0) {
            $("header").not(scrolledHd).toggleClass("scroll");
        }
        $(this).toggleClass("active");
        openMoNavBtn.toggle();
        $(".mo-search").toggle();
    });
    $("header").on("click", ".mo-nav-menu__user", "clicked", function(e) {
        e.preventDefault();
        $(e.target).find(".more-ico").toggleClass("active");
        $(".mo-mymenu-box").slideToggle(350);
    });
    $("header").on("keydown", ".mo-search-input input", function(){
        $(".mo-search-recommend-list").show();

        if( !$(this).val() ) {
            $(".mo-search-recommend-list").hide();
        }
    });
}

//common modal
function modal() {
    var modalArea = $(".modal-area");
    var modalWrap = $("[class^=modal-wrap__]");
    var showModal = $(".show-modal-btn");
    var closeModal = $(".close-modal-btn");

    if(modalArea.is(":visible")) {
        $("body").addClass("full");
    } else {
        $("body").removeClass("full");
    }

    showModal.on("click", function (e) {
        e.preventDefault();
        $("body").addClass("full");
        modalArea.fadeIn(250);
    });

    closeModal.on("click", function (e) {
        e.preventDefault();
        $("body").removeClass("full");
        modalArea.fadeOut(250);
    });
    modalArea.on("click", function(e){
        if (!$(e.target).closest(modalWrap).length) {
            $("body").removeClass("full");
            $(this).fadeOut(150);
        }
    });
}

//onclick modal
function clickModal(odj) {
    var thisModalData = $(odj).data("modal");
    var thisModal = $("#" + thisModalData)

    $("body").addClass("full");
    thisModal.fadeIn(250);
}

//notice modal (0521 zoe 추가)
function ntcModal() {
    var mainNtcModal = $("#mainNtcModal");
    if (mainNtcModal.length > 0) {
        $("body").addClass("full");
        mainNtcModal.show();
    }
}

//form
function formEv() {
    //form check
    $("input[type='checkbox']").on("keypress", function (e) {
        e.preventDefault(); //prevent scroll to top

        if (e.which === 13) {
            $(this).prop("checked", !$(this).prop("checked"));
        }
    });
    $("input[type='radio']").on("keypress", function (event) {
        if (event.which === 13) {
            $(this).prop("checked", !$(this).prop("checked"));
        }
    });

    //form textarea counter
    $(".keyup1000").on("keyup", function(e) {
        var content = $(this).val();
        var counter = $(this).next(".cmn-txtarea-counter");

        counter.html('<b class="fc-black count">' + content.length + '</b>/1000');

        if (content.length > 1000){
            $(this).val(content.substring(0, 1000));
            counter.html('<b class="fc-black count">1000</b>/1000');
        }
    });

    //file upload
    $(".cmn-input-file").find("input[type='file']").change(function(e){
        var fileName = e.target.files[0].name;
        $(this).parents().siblings(".cmn-input-txt").val(fileName);
    });
}

//post swiper
if($("#postSwiper").length > 0) {
    var postSwiper = new Swiper("#postSwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 750,
        loop: false,
        navigation: {
            nextEl: "#postSwiperNext",
            prevEl: "#postSwiperPrev",
        },
        breakpoints: {
            575.98: {
                slidesPerView: "auto",
                spaceBetween: 0,
                loop: true
            }
        }
    });
}

//view swiper
if($("#viewSwiper").length > 0) {
    var postSwiper = new Swiper("#viewSwiper", {
        slidesPerView: 1,
        speed: 750,
        loop: false,
        navigation: {
            nextEl: "#postSwiperNext",
            prevEl: "#postSwiperPrev",
        },
        breakpoints: {
            575.98: {
                slidesPerView: "auto",
                spaceBetween: 0,
                loop: true
            }
        }
    });
}