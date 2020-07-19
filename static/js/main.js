'use strict';
$(() => {
    
    document.title = `${pageData.name} « Iowa City Robotics`;
    
    const mainDiv = $('main');
    
    $.get('static/html/header.html', {}, r => {
        let hDiv = $(r);
        hDiv.find(`.navbar-links ul li a[href=\'${pageData.nav}\']`).parent().addClass('navbar-active');
        mainDiv.before(hDiv);
        $('a.navbar-expand').on('click', () => {
            $('.navbar-links').toggleClass('navbar-expanded');
        });
        $('.navbar-links > ul > li > a').on('click', event => {
            $(event.target).parent().toggleClass('navbar-expanded');
        });
    });
    
    $.get('static/html/footer.html', {}, r => {
        mainDiv.after($(r));
        $('a.a-newtab').attr('target', '_BLANK');
    });
    
    const mainHdr = $('#main-header');
    if (!!mainHdr && mainHdr.size() > 0) {
        const fileName = document.location.pathname.split('/').pop();
        const pageName = fileName.endsWith('.html') ? fileName.substring(0, fileName.length - 5) : fileName;
        mainHdr.css('background-image', `url("static/img/header/${pageName}.jpg")`);
    }
    
});
