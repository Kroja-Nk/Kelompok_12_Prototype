document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /*--------------------------------------------------------------
    # General
    --------------------------------------------------------------*/
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    //Navbar links active state on scroll
    let navbarlinks = document.querySelectorAll('#navbar .scrollto');

    function navbarlinksActive() {
        navbarlinks.forEach(navbarlink => {

            if (!navbarlink.hash) return;

            let section = document.querySelector(navbarlink.hash);
            if (!section) return;

            let position = window.scrollY;
            if (navbarlink.hash != '#header') position += 200;

            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active');
            } else {
                navbarlink.classList.remove('active');
            }
        })
    }
    window.addEventListener('load', navbarlinksActive);
    document.addEventListener('scroll', navbarlinksActive);

    //Mobile nav toggle
    const mobileNavToogle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToogle) {
        mobileNavToogle.addEventListener('click', function (event) {
            event.preventDefault();

            document.querySelector('body').classList.toggle('mobile-nav-active');

            this.classList.toggle('bi-list');
            this.classList.toggle('bi-x');
        });
    }

    //Toggle mobile nav dropdowns
    const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

    navDropdowns.forEach(el => {
        el.addEventListener('click', function (event) {
            if (document.querySelector('.mobile-nav-active')) {
                event.preventDefault();
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('dropdown-active');

                let dropDownIndicator = this.querySelector('.dropdown-indicator');
                dropDownIndicator.classList.toggle('bi-chevron-up');
                dropDownIndicator.classList.toggle('bi-chevron-down');
            }
        })
    });

    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        const togglescrollTop = function () {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
        window.addEventListener('load', togglescrollTop);
        document.addEventListener('scroll', togglescrollTop);
        scrollTop.addEventListener('click', window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }));
    }

    $(document).ready(function () {
        checkLoginStatus();
    });

    // Login sistem
    $(document).on('click', '.loginButton', function () {
        localStorage.setItem('redirectPage', window.location.href);

        window.location.href = 'login.html';
    });
    $(document).on('click', '.signupButton', function () {
        localStorage.removeItem('redirectPage');

        window.location.href = 'signup.html';
    });

    $(document).on('submit', '#loginForm', function (event) {
        event.preventDefault();

        var username = $('#username').val();
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);


        $('.loginButton').hide();

        var redirectPage = localStorage.getItem('redirectPage');
        window.location.href = redirectPage;

        console.log('apus bang');
        localStorage.removeItem('redirectPage');
    });

    function checkLoginStatus() {
        var isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn === 'true') {
            var username = localStorage.getItem('username');

            $('#loginStatus').append(
                '<img src="assets/img/akun.svg" alt="User Profile" width="40" height="40">' +
                '<button id="logoutButton">Logout</button>'
            );

            $('.loginButton').hide();
            $('.signupButton').hide();
            $('.logoutButton').show();
        } else {
            $('.logoutButton').hide();
        }
    }

    $(document).on('click', '#logoutButton', function (event) {

        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('username');

        $('#loginStatus').empty();

        window.location.href = 'Landing_page.html';
    });

    //Animation on Scroll
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    window.addEventListener('load', () => {
        aos_init();
    });

    /*--------------------------------------------------------------
    # AirCheck
    --------------------------------------------------------------*/
    $(document).ready(function () {
        $('#city-input').on('keypress', function (e) {
            if (e.which === 13) {
                var input = $(this).val().trim();

                if (input != '') {
                    $('.container-fluid').css({
                        'min-height': '130vh'
                    });

                    $('#someText').css({ 'opacity': '0', 'transition': 'opacity 1s ease-in-out, top 0.2s ease-in-out' });

                    $('.bg-shrinked').css({
                        'height': '6vh',
                        'transition': 'height 1s'
                    });

                    $('.search-city').css({
                        'top': '60px',
                        'transition': 'top 1s'
                    });

                    $('.result').css({
                        'opacity': '1',
                        'visibility': 'visible',
                        'pointer-events': 'all',
                        'transition': 'opacity 0.8s ease-in-out 0.8s'
                    });

                }
            }
        });
    });

    //Map leaflet
    var map = L.map('map').setView([-7.955556, 112.612744], 10); // Set initial coordinates and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    //Chart
    Chart.defaults.plugins.legend.display = false;

    var ctxHistory = document.getElementById('historyChart').getContext('2d');
    var ctxForecast = document.getElementById('forecastChart').getContext('2d');

    var monthHistory = ['Okt', 'Sep', 'Ags', 'Jul', 'Jun', 'Mei'];
    var aqiHistory = [119, 98, 101, 99, 100, 99];

    var monthForecast = ['Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei'];
    var aqiForecast = [92, 103, 121, 119, 128, 110];

    function getColor(value) {
        if (value > 300) {
            return '#a06a7b';
        } else if (value > 200) {
            return 'purple';
        } else if (value > 150) {
            return 'red';
        } else if (value > 100) {
            return 'orange';
        } else if (value > 50) {
            return 'yellow';
        } else if (value > 0) {
            return 'green';
        }
    }

    var colorsAqiHistory = aqiHistory.map(value => getColor(value));
    var colorsAqiForecast = aqiForecast.map(value => getColor(value));

    var historyChart = new Chart(ctxHistory, {
        type: 'bar',
        data: {
            labels: monthHistory,
            datasets: [{
                data: aqiHistory,
                backgroundColor: colorsAqiHistory
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    suggestedMax: 140,
                    suggestedMin: 90,
                    beginAtZero: false,
                    ticks: {
                        stepSize: 5
                    },
                    title: {
                        display: true,
                        text: 'AQI'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });

    var forecastChart = new Chart(ctxForecast, {
        type: 'bar',
        data: {
            labels: monthForecast,
            datasets: [{
                label: 'AQI Average',
                data: aqiForecast,
                backgroundColor: colorsAqiForecast
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    suggestedMax: 140,
                    suggestedMin: 90,
                    beginAtZero: false,
                    ticks: {
                        stepSize: 5
                    },
                    title: {
                        display: true,
                        text: 'AQI'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
});
