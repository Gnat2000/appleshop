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
    $('.bxslider').bxSlider({
        // startSlide: 0
    });
});