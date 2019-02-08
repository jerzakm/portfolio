let intViewportHeight = window.innerWidth;

console.log(intViewportHeight);

function resize() {
    intViewportHeight = window.innerWidth;
    console.log('resize'+intViewportHeight);
}


window.onresize = resize;