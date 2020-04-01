'use strict';
$(document).ready(function() {

    $('div.lp-left-text').each(function(i, o) {
        let e = $(o);
        let col = e.attr('data-colour');
        e.css('background-color', col);
        e.css('border-top-color', col);
    });

    $('div.lp-right-text').each(function(i, o) {
        let e = $(o);
        let col = e.attr('data-colour');
        e.css('background-color', col);
        e.css('border-bottom-color', col);
    });

    $('div.lp-left-img > div, div.lp-right-img > div').each(function(i, o) {
        let e = $(o);
        let bg = e.attr('data-bg');
        e.css('background-image', 'url({bg})'.supplant({bg: bg}));
    });

    let years = new Date().getFullYear() - 1998 + 1;
    $('#year-count').text('{years} Years of Excellence'.supplant({years: years}));

    let video = $('#banner-vid');
    let updateVideo = function(w) {
        if (w > 768)
            video.get(0).play();
        else
            video.get(0).pause();
    };

    let jWin = $(window);
    updateVideo(jWin.width());
    jWin.resize(function(e) {
        updateVideo($(e.target).width());
    });

    /*
     * Borrowed from https://github.com/phantamanta44/phantamanta44.github.io
     * Licensed under the MIT license
     */
    let boxScreen = $("#match-schedule-box-shade");
    let msgBox = $("#match-schedule");
    let bsTaskId = null;

    let showBoxScreen = function() {
        if (bsTaskId !== null)
            window.clearTimeout(bsTaskId);
        boxScreen.css("display", "block");
        bsTaskId = window.setTimeout(function() {
            boxScreen.addClass("visible")
        }, 1);
    };

    let hideBoxScreen = function() {
        if (bsTaskId !== null)
            window.clearTimeout(bsTaskId);
        boxScreen.removeClass("visible");
        bsTaskId = window.setTimeout(function() {
            boxScreen.css("display", "none");
        }, 400);
    };

    let hideBox = function() {
        hideBoxScreen();
        msgBox.removeClass("visible");
    };

    boxScreen.click(hideBox);
    /*
    if (document.cookie.indexOf("seen-top-extra-bar-lacrosse-2017") === -1) {
        let teb = $("#top-extra-bar");
        teb.addClass("visible");
        $("#top-extra-bar-link").click(function() {
            showBoxScreen();
            msgBox.addClass("visible");
        });
        $("#top-extra-bar-close").click(function () {
            teb.removeClass("visible");
            document.cookie = "seen-top-extra-bar-lacrosse-2017=1";
        });
    }

    if (document.location.hash === "#match-schedule") {
        showBoxScreen();
        msgBox.addClass("visible");
    }
    */
});
