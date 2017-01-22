'use strict';
$(document).ready(function() {
    
    var generateBlock = function(y, data) {
        let elem = $('<div>', {class: 'season-elem elem-4'}).css('background-image', 'url(static/img/seasons/{year}/{url})'.supplant({year: y, url: data.banner}));
        let sDesc = $('<div>', {class: 'row no-stack season-desc mar-out text-light'});
        let dName = $('<div>', {class: 'season-name elem-6'});
        let dYear = $('<div>', {class: 'season-year elem-6 text-right'});
        
        dName.html('<h4><small>{name}</small></h4>'.supplant({name: data.name}));
        dYear.html('<h4><small>{year}</small></h4>'.supplant({year: y}));
        
        elem.click(function() {
            window.location = 'season.html?y={year}'.supplant({year: y});
        });
        
        return elem.append(sDesc.append(dName).append(dYear));
    };
    
    var sGrid = $('#season-grid');
    
    $.getJSON('static/json/seasons.json', {}, function(r) {
        let seasonBlocks = [];
        $.each(r, function(k, v) {
            seasonBlocks.push(generateBlock(k, v));
        });
        for (let i = seasonBlocks.length - 1; i >= 0; i--)
            sGrid.append(seasonBlocks[i]);
    });
    
});