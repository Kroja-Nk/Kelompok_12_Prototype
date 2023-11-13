// Check if the user is logged in (retrieve from local storage)
var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Update the navbar based on login status
function updateNavbar() {
    if (isLoggedIn) {
        $('#login-container').hide();
        $('#profile-container').show();
        $('#logout-container').show();
    } else {
        $('#login-container').show();
        $('#profile-container').hide();
        $('#logout-container').hide();
    }
}

// Load profile picture if logged in
$(document).ready(function () {
    if (isLoggedIn) {
        var profilePicture = localStorage.getItem('profilePicture');
        $('.profile-picture').attr('src', profilePicture);
    }
    updateNavbar();
});

// Function to simulate logout
function logout() {
    // Reset login status and profile picture URL in local storage
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('profilePicture', '');

    // Redirect to home page
    window.location.href;
}

// Simulate successful login
function login() {
    // Save login status and profile picture URL to local storage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('profilePicture', 'assets/img/akun.svg');

    // Get the source page from the URL
    var sourcePage = new URLSearchParams(window.location.search).get('source') || 'Landing_page.html';

    // Redirect to the source page
    window.location.href = sourcePage;
}

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