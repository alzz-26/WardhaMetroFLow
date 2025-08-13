const toggle = document.querySelector('.mode-toggle-button'); 
const body = document.body;
const header = document.querySelector('.header');

toggle.addEventListener('click', () => {
    const currentBg = getComputedStyle(body).backgroundImage;

    const gradient = 'linear-gradient(135deg, rgb(254, 215, 170) 0%, rgb(253, 186, 116) 25%, rgb(134, 239, 172) 75%, rgb(74, 222, 128) 100%)';

    if (currentBg.includes('linear-gradient')) {
        body.style.backgroundImage = 'none';
        body.style.backgroundColor = 'black';
        header.style.backgroundColor='black';
        toggle.textContent = '🌤️ Daylight Mode';
        body.style.color = 'white';
        header.style.color='rgb(0,0,0)';
        console.log("Light To Dark");
    } else {
        body.style.backgroundImage = gradient;
        toggle.textContent = '🌙 Eclipsed Mode';
        header.style.backgroundColor='white';
        header.style.color='black';
        body.style.color = 'black';
        console.log("Dark To Light");
    }
});
