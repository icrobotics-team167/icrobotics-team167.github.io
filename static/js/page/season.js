'use strict';
$(document).ready(function() {
    
    var fail = function() {
        console.log('fail'); // TODO Indicate failure to the end user
    };
    
    var q = document.parseQuery();
    
    if (q.y) {
        $.getJSON('static/json/seasons.json', {}, function(r) {
            if (!r[q.y])
                return fail();
            var yData = r[q.y];
            document.title = document.title.replace(/Seasons/, q.y);
            $('#heading-banner').css('background-image', 'url({url})'.supplant({url: yData.img}));
            $('#heading-title').html('{year}<small> {name}</small>'.supplant({name: yData.name, year: q.y}));
        });
    }
    else
        fail();
    
});