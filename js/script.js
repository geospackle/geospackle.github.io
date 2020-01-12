$(document).ready(function () {
    // Handler for .ready() called.
    $('html, body').animate({
        scrollTop: $('#scrollhere').offset().top
    }, 1000)
}.then(function () {
    $('html, body').animate({
        scrollTop: $('#scrollhere2').offset().top
    }, 3000)
})
)
