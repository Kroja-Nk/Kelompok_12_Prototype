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

            $('#loginStatus').append(`
            <div class="dropdown" style="padding-left: 100px;">
                <button class="btn btn-light" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false"
                    style="border-radius: 50%; padding: 0 0 0 0; box-shadow: none;">
                    <a href="#">
                        <img src="assets/img/gambar.jpg" alt=""
                            style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;border: 1px solid #fff;">
                    </a>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item bi bi-person-circle" href="profile.html"> Profile</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item bi bi-door-open-fill" id="logoutButton" href="#"> Logout</a>
                </div>
            </div>`
            );
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

/*--------------------------------------------------------------
# Profile
--------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    const inputText = document.getElementById('usrname');
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
    const name = document.getElementById('nameee');

    // Retrieve text from localStorage on page load
    const storedText = localStorage.getItem('storedText');
    if (storedText) {
        inputText.value = storedText;
        if (storedText) {
            name.textContent = storedText;
        }
    }

    // Edit button functionality
    editButton.addEventListener('click', function () {
        if (inputText.readOnly) {
            inputText.readOnly = false;
            inputText.focus();
        } else {
            inputText.readOnly = true;
        }
    });

    saveButton.addEventListener('click', function () {
        name.textContent = inputText.value;
        localStorage.setItem('storedText', inputText.value);
    });
});

function showProfileMenu() {
    document.getElementById('profileMenu').style.display = 'block';
    document.getElementById('profileDetails').style.display = 'none';
    document.getElementById('changePassword').style.display = 'none';
    document.getElementById('savedLocation').style.display = 'none';
}

function showProfileDetails() {
    document.getElementById('profileMenu').style.display = 'none';
    document.getElementById('profileDetails').style.display = 'block';
    document.getElementById('changePassword').style.display = 'none';
    document.getElementById('savedLocation').style.display = 'none';
}

function showChangePassword() {
    document.getElementById('profileMenu').style.display = 'none';
    document.getElementById('profileDetails').style.display = 'none';
    document.getElementById('changePassword').style.display = 'block';
    document.getElementById('savedLocation').style.display = 'none';
}
function showSavedLocation() {
    document.getElementById('profileMenu').style.display = 'none';
    document.getElementById('profileDetails').style.display = 'none';
    document.getElementById('changePassword').style.display = 'none';
    document.getElementById('savedLocation').style.display = 'block';
}


const showPopupButton = document.getElementById('showPopupButton');
const popupContainer = document.getElementById('popupContainer');

showPopupButton.addEventListener('click', function () {
    popupContainer.style.display = 'block';
});

const closePopupButton = document.getElementById('closePopupButton');

closePopupButton.addEventListener('click', function () {
    popupContainer.style.display = 'none';
});