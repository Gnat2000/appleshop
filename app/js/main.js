$(document).ready(function () {
    (function () {

        var
            nav = $('.header__nav');

        $('.nav__link_popup, .nav__popup').on('mouseenter', function () {

            nav.addClass('active');

        }).on('mouseleave', function () {

            nav.removeClass('active');
        });
    }());
});

$(document).ready(function(){
    $('.bxslider').bxSlider();
});

$(document).ready(function(){
    $('.clients__slider').bxSlider({
        minSlides: 3,
        maxSlides: 6,
        slideWidth: 170,
        slideMargin: 30,
        pager: false
    });
});