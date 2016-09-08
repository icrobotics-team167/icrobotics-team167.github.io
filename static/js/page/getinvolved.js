$(document).ready(function() {
    
    $('.other-img').each((i, elem) => {
        var q = $(elem);
        q.css('background-image', 'url({url})'.supplant({url: q.attr('data-img')}));
    });
    
});