$(document).ready(function() {

    if (!String.prototype.supplant) {
        String.prototype.supplant = function (o) {
            return this.replace(
                /\{([^{}]*)\}/g,
                function (a, b) {
                    var r = o[b];
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            );
        };
    }
    
    $('a.a-newtab').attr('target', '_BLANK');
    
    $('a.navbar-expand').click(function(e) {
        $('.navbar-links').toggleClass('navbar-expanded');
    });

});
