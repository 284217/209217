
// Match map height to left column
function adjustMapHeight() {
    const leftCol = document.querySelector('.contact-left');
    const map = document.querySelector('.map-container');

    if (leftCol && map) {
        const leftHeight = leftCol.offsetHeight;
        map.style.height = `${leftHeight}px`;
    }
}

// Adjust on page load and window resize
window.addEventListener('load', adjustMapHeight);
window.addEventListener('resize', adjustMapHeight);



