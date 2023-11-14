$(document).ready(function () {
    checkLoginStatus();
});

// Login button click event
$(document).on('click', '#loginButton', function () {
    // Store the current page URL
    localStorage.setItem('redirectPage', window.location.href);

    window.location.href = 'login.html';
});
$(document).on('click', '#signupButton', function () {
    // Store the current page URL
    localStorage.removeItem('redirectPage');

    window.location.href = 'signup.html';
});

// Login form submission
$(document).on('submit', '#loginForm', function (event) {
    event.preventDefault();

    // Simulate a login (replace with your actual authentication logic)
    var username = $('#username').val();
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);

    // Update login status in the navigation bar

    // Hide the login button
    $('#loginButton').hide();

    // Redirect to the original page
    var redirectPage = localStorage.getItem('redirectPage');
    window.location.href = redirectPage;

    // Clear the redirectPage from localStorage
    console.log('apus bang');
    localStorage.removeItem('redirectPage');
});

// Function to check login status
function checkLoginStatus() {
    // Check if the user is logged in (you might use a more secure method in production)
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        // User is logged in
        var username = localStorage.getItem('username');

        // Update login status in the navigation bar
        $('#loginStatus').append(
            '<img src="user_profile.jpg" alt="User Profile" width="40" height="40">' +
            '<button id="logoutButton">Logout</button>'
        );

        // Hide the login button
        $('#loginButton').hide();
        $('#signupButton').hide();
        $('#logoutButton').show();
    } else {
        $('#logoutButton').hide();
    }
}

// Logout button click event
$(document).on('click', '#logoutButton', function (event) {

    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('username');

    // Clear login status in the navigation bar
    $('#loginStatus').empty();

    // Redirect to the home page
    window.location.href = 'Landing_page.html';
});

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