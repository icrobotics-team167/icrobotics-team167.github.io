'use strict';
$(document).ready(function() {
    
    var decodeMedia = function(media, year) {
        var parts = media.split(':', 2);
        if (parts[0] === 'yt') {
            var cont = $('<div>', {class: 'yt-video-container'});
            cont.append($('<iframe>', {src: '//youtube.com/embed/{videoId}?rel=0&showinfo=0'.supplant({videoId: parts[1]})}));
            return cont;
        } else if (parts[0] === 'li') {
            return $('<img>', {src: 'static/img/seasons/{year}/{url}'.supplant({year: year, url: parts[1]})});
        } else if (parts[0] == 'nu') {
            return $('<div>', {class: 'media-empty'});
        }
    };
    
    var fail = function() {
        console.log('fail'); // TDOO Indicate failure to the end user
    };
    
    var q = document.parseQuery();
    
    if (q.y) {
        var year = q.y.trim().toLowerCase();
        $.getJSON('static/json/seasons.json', {}, function(r) {
            if (!r[year])
                return fail();
            var yData = r[year];
            var cardParent = $('#main-content');
            
            // Set page title to the season
            document.title = document.title.replace(/Seasons/, q.y);
            
            // Set the heading title and banner image
            $('#heading-banner').css('background-image', 'url(static/img/seasons/{year}/{url})'.supplant({year: year, url: yData.banner}));
            $('#heading-banner-title').html('{year}<small> {name}</small>'.supplant({name: yData.name.toUpperCase(), year: q.y}));
            
            // Game description card
            $('#game-desc-container').prepend(decodeMedia(yData.game.media, year));
            $('#game-desc').text(yData.game.desc);
            
            // Robot description card
            $('#robot-desc-container').prepend(decodeMedia(yData.robot.media, year));
            $('#robot-desc-title').text('Meet {name}, Our Robot'.supplant({name: yData.robot.name}));
            $('#robot-desc-goal').text(yData.robot.goal);
            var featList = $('#robot-desc-features');
            $.each(yData.robot.features, (i, feat) => {
                var elem = $('<li>');
                elem.text(feat);
                featList.append(elem);
            });
            
            // Regionals
            $.each(yData.regionals, (ind, rg) => {
                var card = $('<div>', {class: 'season-content-card card'});
                var text = $('<div>', {class: 'card-text'});
                
                var header = $('<h2>');
                header.text(rg.name);
                text.append(header);
                
                var placement = $('<p>');
                placement.html('<strong>Placing:</strong> {placing}'.supplant({placing: rg.placing}));
                text.append(placement);
                
                if (rg.notes) {
                    var notes = $('<p>');
                    notes.text(rg.notes);
                    text.append(notes);
                }
                
                card.append(decodeMedia(rg.media, year));
                card.append(text);
                addCard(cardParent, card);
            });
            
            // Gallery
            ((gal, yData) => {
                var card = $('<div>', {class: 'season-content-card card'});
                
                var mediaContainer = $('<div>', {class: 'media-gallery'});
                var media = $('<div>', {class: 'media-gallery-backplate'});
                var back = $('<div>', {class: 'media-gallery-back text-light'});
                var fwd = $('<div>', {class: 'media-gallery-fwd text-light'});
                back.append($('<i>', {class: 'mdi mdi-arrow-left'}));
                fwd.append($('<i>', {class: 'mdi mdi-arrow-right'}));
                mediaContainer.append(media);
                mediaContainer.append(back);
                mediaContainer.append(fwd);
                card.append(mediaContainer);
                
                var text = $('<div>', {class: 'card-text'});
                var header = $('<h2>');
                header.text('Media Gallery');
                var caption = $('<p>');
                text.append(header);
                text.append(caption);
                card.append(text);
                
                yData['galInd'] = 0;
                $.each(gal, (ind, elem) => {
                    var mediaWrap = $('<div>', {class: 'media-gallery-media'});
                    mediaWrap.append(decodeMedia(elem.media, year));
                    media.append(mediaWrap);
                });
                var updateGallery = function() {
                    media.css('right', '{perc}%'.supplant({perc: 100 * yData.galInd}));
                    caption.text(gal[yData.galInd].caption);
                };
                back.click(() => {
                   if (--yData.galInd < 0)
                       yData.galInd = gal.length - 1;
                    updateGallery();
                });
                fwd.click(() => {
                    yData.galInd = (yData.galInd + 1) % gal.length;
                    updateGallery();
                });
                updateGallery();
                
                addCard(cardParent, card);
            })(yData.gallery, yData);
            
            // Auxillary cards
            if (!!yData.other) {
                $.each(yData.other, (ind, cData) => {
                    var card = $('<div>', {class: 'season-content-card card'});
                    var text = $('<div>', {class: 'card-text'});

                    if (!!cData.title) {
                        var header = $('<h2>');
                        header.text(cData.title);
                        text.append(header);
                    }
                    
                    if (!!cData.content) {
                        var content = $('<p>');
                        content.text(cData.content);
                        text.append(content);
                    }

                    if (!!cData.media)
                        card.append(decodeMedia(cData.media, year));
                    
                    card.append(text);
                    addCard(cardParent, card);
                });
            }
        });
    }
    else
        fail();
    
});