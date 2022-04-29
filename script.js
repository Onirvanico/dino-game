const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const scoreElement = document.querySelector('#score');

var isJumping = false;
let dinoPosition = 0;
let cactusPosition;
let score = 0;

var configDinoEvent = (event) => {
    event.preventDefault();
    if(event.keyCode === 32 || event.keyCode === 38) {
        if(!isJumping) jump();
    }
};

function jump() {
    isJumping = true;

    let intervalUp =  setInterval(() => {
        if(dinoPosition < 150) {
            dinoPosition += 15;
            dino.style.bottom = `${dinoPosition}px`;
        
        } else {
            clearInterval(intervalUp);
            let intervalDown = setInterval(() => {
                dinoPosition -= 20;
                dino.style.bottom = `${dinoPosition}px`;
                if(dinoPosition <= 0) {
                    clearInterval(intervalDown);
                    isJumping = false;
                }
            }, 20);
        } 
    }, 20);
}

function initializeCactu(cactus) {
    cactusPosition = 95;
     

    cactus.classList.add('cactus')
    cactus.style.left = cactusPosition + "%";
    background.appendChild(cactus);

}

const createCactus = () => {
    let cactus = document.createElement('div');
    initializeCactu(cactus);
    let randomTime = Math.random() * 7000;

    var scoreInterval = setInterval(() => {
        score ++
        scoreElement.innerHTML = `<p>${score}</p>`;
    }, 50);

    var leftInterval = setInterval(() => {
        cactusPosition -= 1.5;
        cactus.style.left = cactusPosition + "%"; 
        if(cactusPosition === 5 && dinoPosition < 60) {
            document.body.innerHTML = `<h1 class="game-over">Game Over</h1><p id="score">${score}</p>`;
            clearInterval(scoreInterval);
            clearInterval(leftInterval);
            background.innerHTML = "";
        
        } else if(cactusPosition < -60) {
            clearInterval(leftInterval);
            clearInterval(scoreInterval);
            background.removeChild(cactus);
            
        }
    }, 50);

    setTimeout(createCactus, randomTime);
};


(createCactus)();

document.addEventListener('keyup', configDinoEvent);