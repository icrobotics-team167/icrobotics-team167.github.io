'use strict';
$(document).ready(function() {

    let memList = $('#member-list');

    let imageFor = function(img) {
        return !img ? 'static/img/no-image-square.png' : 'static/img/members/' + img;
    };

    let generateMemberBlock = function(member) {
        return $('<div>', {'class': 'elem-3 member-elem'}).append(
            $('<div>', {'class': 'member-content'}).append(
                $('<img>', {'class': 'member-img'}).attr('src', imageFor(member.img))
            ).append(
                $('<h2>', {'class': 'member-name'}).text(member.name)
            ).append(
                $('<p>', {'class': 'member-role'}).text(member.role)
            )
        );
    };
    
    $.getJSON('static/json/members.json', function(r) {
        $.each(r, function(i, mem) {
            memList.append(generateMemberBlock(mem));
        });
    });

});