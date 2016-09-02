'use strict';
$(document).ready(function() {
    
    document.title = 'Iowa City Robotics ≫ ' + pageData.name;
    
    var mainDiv = $('main');
    
    $.get('static/html/header.html', {}, function(r) {
        var hDiv = $(r);
        hDiv.find('.navbar-links ul li a[href=\'{target}\']'.supplant({target: pageData.nav})).parent().addClass('navbar-active');
        mainDiv.before(hDiv);
        $('a.navbar-expand').click(function(e) {
            $('.navbar-links').toggleClass('navbar-expanded');
        });
    });
    
    $.get('static/html/footer.html', {}, function(r) {
        mainDiv.after($(r));
        $('a.a-newtab').attr('target', '_BLANK');
    });
    
    var mainHdr = $('#main-header');
    if (!!mainHdr && mainHdr.size() > 0) {
        var p = document.location.pathname;
        mainHdr.css('background-image', 'url("static/img/header/{pageName}.jpg")'.supplant({pageName: p.substring(p.lastIndexOf('/') + 1, p.lastIndexOf('.'))}));
    }
    
});