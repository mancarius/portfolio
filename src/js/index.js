import {
    progressRing,
    toggleContacts,
    toggleNav,
    navTo,
    findElementOnScreen,
    getKeyboardFocusableElements
} from './modules/modules'






$(window).on('resize', function () {
    if (window.innerWidth < 768) {
        setTimeout(() => {
            $('.skills-list').not('.slick-initialized').slick(slickOptions);
        }, 100);
    }
    progressRing.init('.progress-ring');
    findElementOnScreen();
});

$(window).on('orientationchange', function () {
    $('.skills-list').not('.slick-initialized').slick(slickOptions);
    progressRing.init('.progress-ring');
});


//////////////////////////////////////////////
// Navigation
//////////////////////////////////////////////


$(document).on('click', 'a[href="#contacts"], #close-contacts', toggleContacts);

// show contacts frame when focused if hidden
$('#contacts:not(.active)').on('focus', getKeyboardFocusableElements(document.querySelector('#contacts')), toggleContacts);

//////////////////////////////////////////////
// Toggle Nav
//////////////////////////////////////////////


// hamburger on click
$('.button-hamburger').on('click', toggleNav);

// menu items on click
$('a[data-target]').on('click', (e) => {
    e.preventDefault();
    // disable scroll event listener
    const el = e.target;
    const target = '#' + el.dataset.target;
    navTo(target);
});

// close on background/anchor tap

$('#main-menu').on('click', toggleNav);

//////////////////////////////////////////////
// Highlight Active Menu Item Based On Scroll
//////////////////////////////////////////////

window.addEventListener('scroll', (e) => {
    findElementOnScreen();
}, {
    passive: true
});



/////////////////////
// Page Loader Frame
/////////////////////

$('.loading-frame .ball')
    .addClass('expand')
    .parent()
    .delay(1000)
    .fadeOut(() => {
        // don't show scrollbar if contacts frame is open
        if (location.hash !== "#contacts")
            $('body').removeClass('no-scroll');
        else
            $('body').addClass('no-scroll');
    });

//open contacts frame if hash point on #contacts
if (location.hash === "#contacts") {
    toggleContacts();
}