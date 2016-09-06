"use strict";

var dropDown = (function () {

    var nav = $(".header__nav");
    var init = function () {
        _active();
    };
    var _active = function () {
        $(".nav__link_popup, .nav__popup").on("mouseenter", function () {

            nav.addClass("active");

        }).on("mouseleave", function () {

            nav.removeClass("active");
        });
    };
    return {
        init: init
    };
}());

var bigSlider = (function () {

    var init = function () {
        _bxSlider();
    };
    var _bxSlider = function () {
        $(".bxslider").bxSlider();
    };
    return {
        init: init
    };
}());

var smallSlider = (function () {

    var init = function () {
        _smallSlider();
    };
    var _smallSlider = function () {
        $(".clients__slider").bxSlider({
            minSlides: 3,
            maxSlides: 6,
            slideWidth: 170,
            slideMargin: 30,
            pager: false
        });
    };
    return {
        init: init
    };
}());

$(document).ready(function () {

    if ($(".clients__slider").length) {
        smallSlider.init();
    }

    if ($(".bxslider").length) {
        bigSlider.init();
    }

    if ($(".header__nav").length) {
        dropDown.init();
    }
});





