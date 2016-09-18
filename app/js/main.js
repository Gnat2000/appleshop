"use strict";

$(document).ready(function () {

    if ($(".clients__slider").length) {
        $(".clients__slider").bxSlider({
            minSlides: 3,
            maxSlides: 6,
            slideWidth: 170,
            slideMargin: 30,
            pager: false
        });
    }

    if ($(".slider__list").length) {
        $(".slider__list").bxSlider();
    }

    if ($(".nav").length) {
        var nav = $(".nav");
        $(".nav__link_popup, .nav__popup").on("mouseenter", function () {

            nav.addClass("active");

        }).on("mouseleave", function () {

            nav.removeClass("active");
        });
    }
});





