export {
    handleOrientation
}
from "./handleMotion";


export const progressRing = {
    circle: null,
    radius: 0,
    circumference: 0,
    init: (selector) => {
        $(selector).each((index, el) => {
            progressRing.circle = el.querySelector('circle');
            progressRing.radius = progressRing.circle.r.baseVal.value;
            progressRing.circumference = progressRing.radius * 2 * Math.PI;
            progressRing.circle.style.strokeDasharray = `${progressRing.circumference} ${progressRing.circumference}`;
            progressRing.circle.style.strokeDashoffset = progressRing.circumference;
            progressRing.setProgress(el.dataset.percent);
        })
    },
    setProgress: (percent) => {
        const offset = progressRing.circumference - percent / 100 * progressRing.circumference;
        progressRing.circle.style.strokeDashoffset = offset;
    }
}



const is_on_screen = el => {
    const coords = el.getBoundingClientRect();

    return (
        coords.y <= (window.innerHeight * .95)
    );
}




// find on screen container
export const findElementOnScreen = () => {
    // eseguo verifica su ogni elemento
    const elms = document.querySelectorAll('.fade-in');

    elms.forEach((el, i) => {
        if (is_on_screen(el) && !el.classList.contains('on-screen')) {
            el.classList.add('on-screen');
        } else if (el.classList.contains('on-screen')) {
            const coords = el.getBoundingClientRect();
            coords.y > window.innerHeight && el.classList.remove('on-screen');
        }
    })

    // refresh progressRing when on screen
    const rings = document.querySelectorAll('.progress-ring');
    rings.forEach((el, i) => {
        if (is_on_screen(el) && !el.classList.contains('on-screen')) {
            el.classList.add('on-screen');
            progressRing.init('.progress-ring');
            return;
        }
    });
}




export const toggleContacts = () => {
    document.querySelector('body').classList.toggle('no-scroll');
    document.querySelector('#contacts').classList.toggle('active');
}



export const navTo = target => {
    document.querySelector(target).scrollIntoView();
}


export const toggleNav = e => {
    const el = document.querySelector('.button-hamburger');
    // if not mobile exit
    if (window.getComputedStyle(el, null).display == 'none') return;
    const target = document.getElementById('main-menu');
    el.classList.toggle('close');
    target.classList.toggle('active');
    document.getElementById('nav-tag').classList.toggle('hide');
    document.body.classList.toggle('no-scroll');
}


export const formSubmit = () => {
    alert('Messaggio inviato');
}