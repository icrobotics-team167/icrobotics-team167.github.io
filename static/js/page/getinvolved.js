$(document).ready(function() {
    
    $('.other-opt-image').each((i, elem) => {
        let q = $(elem);
        q.css('background-image', 'url({url})'.supplant({url: q.attr('data-img')}));
    });
    
});