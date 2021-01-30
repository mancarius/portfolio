import React from 'react'
import ReactDom from 'react-dom'
import SvgWave from './views/SvgWave'
import SocialList from './views/socials/SocialList'
import slick from 'slick-carousel'
import {
    progressRing,
    toggleContacts,
    toggleNav,
    navTo,
    formSubmit,
    findElementOnScreen
} from './modules/modules'
import '/src/css/index.scss'


//////////////////////////////////////
// Move home text based on device orientation

//window.addEventListener('devicemotion', handleMotion, true);


//////////////////////////////////////////////
/////// Slider

const slickOptions = {
    infinite: false,
    dots: true,
    //mobileFirst: true,
    arrows: false,
    responsive: [{

        breakpoint: 9999,
        settings: 'unslick',

    }, {

        breakpoint: 768,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
        }

    }, {

        breakpoint: 425,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }

    }]
};

$(".skills-list").not('.slick-initialized').slick(slickOptions);


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


//////////////////////////////////////////////
// Toggle Nav
//////////////////////////////////////////////


// hamburger on click
$('.button-hamburger').on('click', toggleNav);

$('#main-menu a[href]').on('click', toggleNav);

// menu items on click
$('a[data-target]').on('click', (e) => {
    e.preventDefault();
    // disable scroll event listener
    const el = e.target;
    const target = '#' + el.dataset.target;
    navTo(target);
});



//////////////////////////////////////////////
// Highlight Active Menu Item Based On Scroll
//////////////////////////////////////////////

// return true when element is on top of viewport

window.addEventListener('scroll', (e) => {
    findElementOnScreen();
},
{ passive: false });



//////////////////////////////////////////////
// Hide address bar on mobile
//////////////////////////////////////////////

// This hides the address bar:
//window.scrollTo(0, 1);


//////////////////////////////////////////////
// Contact form button switch
//////////////////////////////////////////////

$('#contact-form').on('submit', (e) => {
    e.preventDefault();

    const $fieldset = $(e.currentTarget).find('fieldset');
    
    grecaptcha.ready(function() {
        grecaptcha.execute('6Ldz1ykaAAAAAOD_zaZjW-vORcaXzepMpXUMUSYH', { action: 'submit' }).then(function (token) {
            
            formSubmit(e.currentTarget);

        });
    });
        
})
  
    
//////////////////////////////////////////////
// Set input's labels class
//////////////////////////////////////////////
    
$('.form-group input[type="text"], .form-group input[type="email"], textarea').on('focus', (e) => {
    const $this = $(e.currentTarget);
    const $label = $this.siblings('label[for="' + $this[0].id + '"');

    $label.addClass('active');
});

$('.form-group input[type="text"], .form-group input[type="email"], textarea').on('blur', (e) => {
    const $this  = $(e.currentTarget);
    const $label = $this.siblings('label[for="' + $this[0].id + '"');

    if ($this[0].value === '') {
        $label.removeClass('active');
    }
})


/////////////////////
// Load Particles
///////////////////

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
/*particlesJS.load('particles-js', '/assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});*/


/////////////////////
// Load SvgWaves
/////////////////////

document.querySelectorAll('#root .wave.top').forEach((element) => {
    ReactDom.render(
        <SvgWave position="top" />,
        element
        )
})


document.querySelectorAll('#root .wave.bottom').forEach((element) => {
    ReactDom.render( <
        SvgWave position = "bottom" / > ,
        element
    )
})



/////////////////////
// Load Socials
/////////////////////

document.querySelectorAll('#root ul.contact-socials').forEach((element) => {
    ReactDom.render( <SocialList /> ,element)
})


/////////////////////
// Load Tippy
/////////////////////

tippy('[data-tippy-template]', {
    content(reference) {
        const id = reference.getAttribute('data-tippy-template');
        const template = document.getElementById(id);
        return template.innerHTML;
    },
    interactive: true,
    interactiveBorder: 15,
    allowHTML: true,
});


/////////////////////
// Page Loader
/////////////////////

window.onload = () => {
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
}