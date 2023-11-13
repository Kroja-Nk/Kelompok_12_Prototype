$(document).ready(function () {
    $('#myInput').on('keypress', function (e) {
        if (e.which === 13) {
            $('#additionalText').fadeOut(500);
            $('#textboxContainer').animate({ bottom: '33%' }, 1200);
            $('.position-relative').css({ 'height': '58px', 'transition': 'height 1s' });
            $('#newText').first().fadeIn(2250);
        }
    });
});