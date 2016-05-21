$(document).ready(function() {

    if (!String.prototype.supplant) {
        String.prototype.supplant = function(o) {
            return this.replace(/\{([^{}]*)\}/g, function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
        };
    }
    
    if (!HTMLDocument.prototype.parseQuery) {
        HTMLDocument.prototype.parseQuery = function() {
            if (!document.location.search)
                return {};
            var params = {};
            $.each(document.location.search.substring(1).split(/&/g), function(i, token) {
                var parts = token.split(/=/, 2);
                params[parts[0]] = parts[1];
            });
            return params;
        }
    }
    
    $('a.a-newtab').attr('target', '_BLANK');
    
    $('a.navbar-expand').click(function(e) {
        $('.navbar-links').toggleClass('navbar-expanded');
    });

});
