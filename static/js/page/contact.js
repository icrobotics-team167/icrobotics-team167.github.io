$(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (urlSearchParams.has('thanks')) {
        $('#contact-thanks').css('display', 'inline-block');
    }
});
