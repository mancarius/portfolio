const container = document.getElementById('home');
const box = container.querySelector('.move');


const maxX = container.clientWidth - box.clientWidth;
const maxY = container.clientHeight - box.clientHeight;


const handleMotion = (e) => {
    var x = e.rotationRate.beta; // In degree in the range [-180,180)
    var y = e.rotationRate.gamma; // In degree in the range [-90,90)



    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x > 90) {
        x = 90
    };
    if (x < -90) {
        x = -90
    };

    // To make computation easier we shift the range of
    // x and y to [0,180]
    x += 90;
    y += 90;

    // 10 is half the size of the ball
    // It center the positioning point to the center of the ball
    box.style.top = (maxY * y / 180 - (box.offsetHeight / 2)) + "px";
    box.style.left = (maxX * x / 180 - (box.offsetHeight / 2)) + "px";
}

export default handleMotion