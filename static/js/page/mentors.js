'use strict';
$(document).ready(function() {

    let menList = $('#mentor-list');

    let imageFor = function(img) {
        return !img ? 'static/img/no-image-square.png' : 'static/img/mentors/' + img;
    };

    let generateMentorBlock = function(mentor) {
        return $('<div>', {'class': 'elem-3 mentor-elem'}).append(
            $('<div>', {'class': 'mentor-content'}).append(
                $('<img>', {'class': 'mentor-img'}).attr('src', imageFor(mentor.img))
            ).append(
                $('<h2>', {'class': 'mentor-name'}).text(mentor.name)
            ).append(
                $('<p>', {'class': 'mentor-affil'}).text(mentor.affil)
            )
        );
    };
    
    $.getJSON('static/json/mentors.json', function(r) {
        $.each(r, function(i, men) {
            menList.append(generateMentorBlock(men));
        });
    });

});