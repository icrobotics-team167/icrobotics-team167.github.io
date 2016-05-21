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
            console.log(r[q.y]); // TODO Do something with season data
        });
    }
    else
        fail();
    
});