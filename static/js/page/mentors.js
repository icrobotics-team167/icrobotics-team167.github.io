'use strict';

$(() => {

    const mentorContainer = $('#mentor-container');

    const getImageUrl = imgName => {
        return imgName ? `static/img/mentors/${imgName}` : 'static/img/no-image-square.png';
    }

    const generateMentorCard = mentor => {
        return `
            <div class="mentor-card">
                <img class="mentor-img" src="${getImageUrl(mentor.img)}" alt="Picture of ${mentor.name}">
                <h2 class="mentor-name">${mentor.name}</h2>
                <h3 class="mentor-tag">${mentor.tag ? mentor.tag : ''}</h3>
                <p class="mentor-bio">${mentor.bio}</p>
            </div>
        `;
    }

    $.getJSON('static/json/mentors.json', json => {
        console.log('test');
        $.each(json, (index, mentor) => {
            console.log(mentor);
            mentorContainer.append(generateMentorCard(mentor));
        });
    });
});
