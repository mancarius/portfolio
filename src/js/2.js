import LazyLoad from "vanilla-lazyload"
import React from 'react'
import ReactDom from 'react-dom'
import SvgWave from './views/SvgWave'
import SocialList from './views/socials/SocialList'
import slick from 'slick-carousel'
import { formSubmit } from './modules/modules'
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




/////////////// LAZYLOAD FOR IMAGES

window.lazyLoadInstance = new LazyLoad({
    use_native : true
});


/////////////////////
// Load SvgWaves
/////////////////////

document.querySelectorAll('#root .wave.top').forEach((element) => {
    ReactDom.render( <
        SvgWave position = "top" / > ,
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
    ReactDom.render( < SocialList / > , element)
})



//////////////////////////////////////////////
// Set input's labels class
//////////////////////////////////////////////

$('.form-group input:not([type=checkbox]), .form-group textarea').on('focus', (e) => {
    const $this = $(e.currentTarget);
    const $label = $this.siblings('label[for="' + $this[0].id + '"');

    $label.addClass('active');
});

$('.form-group input, .form-group textarea').on('blur', (e) => {
    const $this = $(e.currentTarget);
    const $label = $this.siblings('label[for="' + $this[0].id + '"');

    if ($this[0].value === '') {
        $label.removeClass('active');
    }
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



//////////////////////////////////////////////
// Contact form submit
//////////////////////////////////////////////

$('#contact-form').on('submit', (e) => {
    e.preventDefault();
    const $form = $(e.currentTarget.querySelectorAll('fieldset input, fieldset textarea')).serializeArray();
    const url = e.currentTarget.action;
    const formStatesContainer = document.querySelector('#contacts .form-states');

    formStatesContainer.dataset.currentState = 'sending';
    // disable all input untill submit
    $('#contact-form input, #contact-form textarea').prop('disabled', true);


    grecaptcha.ready(function () {
        grecaptcha.execute('6Ldz1ykaAAAAAOD_zaZjW-vORcaXzepMpXUMUSYH', {
            action: 'submit'
        }).then(function (token) {

            formSubmit(token, $form, url).then(
                result => {
                    console.log(result);
                    if (result.success) {
                        formStatesContainer.dataset.currentState = 'success';
                    } else {
                        formStatesContainer.dataset.currentState = 'error';
                    }
                },
                error => {
                    console.warn(error);
                    formStatesContainer.dataset.currentState = 'error';
                }
            )

        });
    });

})