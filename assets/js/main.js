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
        localStorage.setItem('redirectPage', window.location.href);

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

        localStorage.removeItem('redirectPage');
    });

    function checkLoginStatus() {
        var isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn === 'true') {
            var username = localStorage.getItem('username');

            $('#loginStatus').show();
            $('.loginButton').hide();
            $('.signupButton').hide();
        } else {
            $('#loginStatus').hide();
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
                    $('#someText').css({ 'opacity': '0', 'transition': 'opacity 1s ease-in-out, top 0.2s ease-in-out' });

                    $('.bg-shrinked').css({
                        'height': '6vh',
                        'transition': 'height 0.8s'
                    });

                    $('.search-city').css({
                        'top': '135px',
                        'transition': 'top 1s'
                    });

                    $('.result').css({
                        'opacity': '1',
                        'position': 'relative',
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
    var dataHis = [120, 150, 130, 146, 157, 190, 137, 198, 162, 210, 190];
    var dataFor = [113, 98, 74, 91, 178, 191, 139, 148, 172, 160, 190];

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

    let chartHis;
    let chartFor;

    function charHist(datasetNum) {
        // Hide the chart container before displaying the new chart
        document.getElementById('chartHis');

        // Based on the button clicked, select the respective dataset
        const selectedDataset = datasetNum === 1 ? dataHis : dataFor;
        const colors = selectedDataset.map(value => getColor(value));

        // If chart exists, destroy it before creating a new one
        if (chartHis) {
            chartHis.destroy();
        }

        // Create a new chart
        chartHis = Highcharts.chart('chartHis', {
            chart: {
                type: 'column',
                inverted: false // Set to true for a horizontal bar chart
            },
            title: {
                text: ''
            },
            legend: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: 'AQI US'
                }
            },
            plotOptions: {
                column: {
                    colorByPoint: true,
                    colors: colors
                }
            },

            series: [{
                data: selectedDataset
            }]
        });
    }

    charHist(1);

    function chartFore(datasetNum) {
        // Hide the chart container before displaying the new chart
        document.getElementById('chartFor');

        // Based on the button clicked, select the respective dataset
        const selectedDataset = datasetNum === 1 ? dataHis : dataFor;
        const colors = selectedDataset.map(value => getColor(value));

        // If chart exists, destroy it before creating a new one
        if (chartFor) {
            chartFor.destroy();
        }

        // Create a new chart
        chartFor = Highcharts.chart('chartFor', {
            chart: {
                type: 'column',
                inverted: false // Set to true for a horizontal bar chart
            },
            title: {
                text: ''
            },
            legend: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: 'AQI US'
                }
            },
            plotOptions: {
                column: {
                    colorByPoint: true,
                    colors: colors
                }
            },
            series: [{
                data: selectedDataset
            }]
        });
    }

    chartFore(2);
});
