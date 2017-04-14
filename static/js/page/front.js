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
    
    var years = new Date().getFullYear() - 1998;
    $('#year-count').text('{years} Years of Excellence'.supplant({years: years}));
    
    var video = $('#banner-vid');
    var updateVideo = function(w) {
        if (w > 768)
            video.get(0).play();
        else
            video.get(0).pause();
    };
    
    var jWin = $(window);
    updateVideo(jWin.width());
    jWin.resize(function(e) {
        updateVideo($(e.target).width());
    });

    if (document.cookie.indexOf("seen-top-extra-bar-lacrosse-2017") === -1) {
        var teb = $("#top-extra-bar");
        teb.addClass("visible");
        $("#top-extra-bar-close").click(function () {
            teb.removeClass("visible");
            document.cookie = "seen-top-extra-bar-lacrosse-2017=1";
        });
    }
    
});