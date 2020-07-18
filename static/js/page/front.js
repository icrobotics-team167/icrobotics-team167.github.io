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
});
