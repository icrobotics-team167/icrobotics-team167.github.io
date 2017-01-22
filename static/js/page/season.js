'use strict';
$(document).ready(function() {
    
    var decodeMedia = function(media, year) {
        let parts = media.split(':', 2);
        if (parts[0] === 'yt') {
            let cont = $('<div>', {class: 'yt-video-container'});
            cont.append($('<iframe>', {src: '//youtube.com/embed/{videoId}?rel=0&showinfo=0'.supplant({videoId: parts[1]})}));
            return cont;
        } else if (parts[0] === 'li') {
            return $('<img>', {src: 'static/img/seasons/{year}/{url}'.supplant({year: year, url: parts[1]})});
        } else if (parts[0] == 'nu') {
            return $('<img>', {src: 'static/img/no-image.png'});
        }
    };
    
    var fail = function() {
        console.log('fail'); // TDOO Indicate failure to the end user
    };
    
    var q = document.parseQuery();
    
    if (q.y) {
        let year = q.y.trim().toLowerCase();
        $.getJSON('static/json/seasons.json', {}, function(r) {
            if (!r[year])
                return fail();
            let yData = r[year];
            let cardParent = $('#main-content');
            
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
            let featList = $('#robot-desc-features');
            $.each(yData.robot.features, (i, feat) => {
                let elem = $('<li>');
                elem.text(feat);
                featList.append(elem);
            });
            
            // Regionals
            $.each(yData.regionals, (ind, rg) => {
                let card = $('<div>', {class: 'season-content-card card'});
                let contentWrapper = $('<div>');
                let text = $('<div>', {class: 'card-text'});
                
                let header = $('<h2>');
                header.text(rg.name);
                text.append(header);
                
                let placement = $('<p>');
                placement.html('<strong>Placing:</strong> {placing}'.supplant({placing: rg.placing}));
                text.append(placement);
                
                if (rg.notes) {
                    let notes = $('<p>');
                    notes.text(rg.notes);
                    text.append(notes);
                }
                
                contentWrapper.append(decodeMedia(rg.media, year));
                contentWrapper.append(text);
                card.append(contentWrapper);
                addCard(cardParent, card);
            });
            
            // Gallery
            ((gal, yData) => {
                let card = $('<div>', {class: 'season-content-card card'});
                let contentWrapper = $('<div>');
                
                let mediaContainer = $('<div>', {class: 'media-gallery'});
                let media = $('<div>', {class: 'media-gallery-backplate'});
                let back = $('<div>', {class: 'media-gallery-back text-light'});
                let fwd = $('<div>', {class: 'media-gallery-fwd text-light'});
                back.append($('<i>', {class: 'mdi mdi-arrow-left'}));
                fwd.append($('<i>', {class: 'mdi mdi-arrow-right'}));
                mediaContainer.append(media);
                mediaContainer.append(back);
                mediaContainer.append(fwd);
                contentWrapper.append(mediaContainer);
                
                let text = $('<div>', {class: 'card-text'});
                let header = $('<h2>');
                header.text('Media Gallery');
                let caption = $('<p>');
                text.append(header);
                text.append(caption);
                contentWrapper.append(text);
                
                yData['galInd'] = 0;
                $.each(gal, (ind, elem) => {
                    let mediaWrap = $('<div>', {class: 'media-gallery-media'});
                    mediaWrap.append(decodeMedia(elem.media, year));
                    media.append(mediaWrap);
                });
                let updateGallery = function() {
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
                
                card.append(contentWrapper);
                addCard(cardParent, card);
            })(yData.gallery, yData);
            
            // Auxillary cards
            if (!!yData.other) {
                $.each(yData.other, (ind, cData) => {
                    let card = $('<div>', {class: 'season-content-card card'});
                    let contentWrapper = $('<div>');
                    let text = $('<div>', {class: 'card-text'});

                    if (!!cData.title) {
                        let header = $('<h2>');
                        header.text(cData.title);
                        text.append(header);
                    }
                    
                    if (!!cData.content) {
                        let content = $('<p>');
                        content.text(cData.content);
                        text.append(content);
                    }

                    if (!!cData.media)
                        contentWrapper.append(decodeMedia(cData.media, year));
                    
                    contentWrapper.append(text);
                    card.append(contentWrapper);
                    addCard(cardParent, card);
                });
            }
        });
    }
    else
        fail();
    
});