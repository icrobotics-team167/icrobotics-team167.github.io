/**
 * Whether the cards have been interpolated yet.
 */
var cardsInterpolated = false;

/**
 * Adds a card to a card grid.
 */
var addCard = (parent, card) => {
    if (parent.hasClass('card-parent') && card.hasClass('card')) {
        if (cardsInterpolated)
            $(parent).children('.card-col:eq(0)').append(card);
        else {
            var cols = $(parent).children('.card-col'), size = 0, col;
            for (var i = 0;; i++) {
                if (i >= cols.size()) {
                    col = cols.filter('.card-col:eq(0)');
                    break;
                }
                col = $(cols[i]);
                var children = col.children().size();
                if (children < size)
                    break;
                size = children;
            }
            col.append(card);
        }
    }
    else
        throw 'Invalid call to addCard!';
};

$(document).ready(function() {

    /**
     * Replaces tokens in a string with values in a supplied key-value map.
     */
    if (!String.prototype.supplant) {
        String.prototype.supplant = function(o) {
            return this.replace(/\{([^{}]*)\}/g, function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
        };
    }
    
    /**
     * Parses the GET query and returns a key-value map of the data.
     */
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
    
    // Convenience constants
    var WIN = $(window);
    
    // Cause <a> elems with the a-newtab class to open in a new tab.
    $('a.a-newtab').attr('target', '_BLANK');
    
    // Cause the navbar to expand when clicking the navbar-expand button.
    $('a.navbar-expand').click(function(e) {
        $('.navbar-links').toggleClass('navbar-expanded');
    });
    
    // Card grid interaction functions
    var cardInterpolate = () => {
        cardsInterpolated = true;
        $('.card-parent').each((ind, elem) => {
            var cols = $(elem).children('.card-col'), cards = [], i = 0, card;
            while (card = $(cols[i]).children('.card:eq(0)'), card.size() > 0) {
                cards.push(card.detach());
                if (++i >= cols.size())
                    i = 0;
            }
            cols.each((i, elem) => $(elem).children().detach());
            var col0 = cols.filter('.card-col:eq(0)');
            $.each(cards, (ind, card) => col0.append(card));
        });
    };
    
    var cardDeinterpolate = () => {
        cardsInterpolated = false;
        $('.card-parent').each((ind, elem) => {
            var cols = $(elem).children('.card-col'), col0 = cols.filter('.card-col:eq(0)'), cards = [];
            col0.children().each((ind, card) => cards.push($(card).detach()));
            $.each(cards, (ind, card) => $(cols[ind % cols.size()]).append(card));
        });
    };
    
    // Listens for when the browser window is resized.
    var onWindowResize = e => {
        if (WIN.width() > 768) {
            if (cardsInterpolated)
                cardDeinterpolate();
        } else {
            if (!cardsInterpolated)
                cardInterpolate();
        }
    };
    WIN.resize(onWindowResize);
    onWindowResize();

});