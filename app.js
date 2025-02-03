// random number generator
function rand(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const init = _ => {
    submitInput();
    
}

const submitBttn = document.getElementById('bttnsubmit');
const newGameBttn = document.getElementById('bttnnewgame');
const output = document.getElementById('output');


let ans, dif, toGuess, health, lose;
let previous = [];


const readInput = _ => {
    output.innerText = '';
    const guessInput = document.getElementById('guess');
    ans = parseInt(guessInput.value);

    checkValid();
}


const submitInput = _ => {
    submitBttn.addEventListener('click', readInput);
    newGameBttn.addEventListener('click', readDiff);
}


const clearInput = _ => {
    document.getElementById('guess').value = '';
}


const checkValid = _ => {
    if (isNaN(dif)) {
        output.innerText = "Please pick a difficulty";
        clearInput();
        return;
    }
    if (isNaN(ans)) {
        output.innerText = "Please pick a number";
        return;
    }
    if (ans <= 0 || ans > dif) {
        output.innerText = 'Invalid number received, please try again';
        clearInput();
        return;
    }
    clearInput();
    checkAns();
    pushPrevious();
    showHealth();
    checkStatus();
}


// Nustatom iki kiek max ir sugeneruojam skaiciu kuri reikia atspeti
const readDiff = _ => {
    const radioButtons = document.getElementsByName('difficulty');
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            dif = parseInt(radioButton.value);
            break;
        }
    }
    if (dif == null) {
        output.innerText = 'Please pick a difficulty';
    } else {
        toGuess = rand(1, dif);
        output.innerText = 'Random number has been generated. Good Luck!';
        console.log(toGuess);
    }
    newGame();
    tryCalc();
    if(isNaN(dif)) {
        return;
    } else {
    showHealth();
    }
    newGameBttn.innerText = 'Start again';
    submitBttn.style.background = '#92CD41';

}

const newGame = _ => {
    //clear previous list
    const listPrevious = document.getElementById('previous');
    listPrevious.innerText = '';
    previous = [];
    lose = false;
    submitBttn.disabled = false;
}


const checkAns = _ => {
    if(ans > toGuess) {
        output.innerText = '<<<<<<LOWER!';
        health--;
    } else if (ans < toGuess) {
        output.innerText = 'HIGHER!>>>>>>';
        health--;
    } else if (ans == toGuess) {
        winner();
    }
}


const pushPrevious = _ => {
    const listPrevious = document.getElementById('previous');

    if (previous.includes(ans)) {
        output.innerText = 'ALREADY GUESSED!';
        health++;
        return;
    }
    previous.push(ans);
    let lastThree = previous.slice(-5);
    listPrevious.innerText = `${lastThree.join(",")}`;
}


const tryCalc = _ => {
    if(dif == NaN) return;
    if(dif == 10) health = 3;
    if(dif == 100) health = 10;
    if(dif == 500) health = 15;
}


const checkStatus = _ => {
    if(lose) {
        output.innerText = 'GAME OVER!';
        disableButton();
    }
}

const showHealth = _ => {
    const div = document.querySelector('[data-health]');
    const heart = document.getElementById('heartIcon');
    if (heart) {
        heart.style.opacity = 1;
    }
    div.innerText = health;
    if(health <= 0) {
        lose = true;
        // div.innerText = '';
    }
        
}

const winner = _ => {
    const midText = document.createTextNode('CONGRATULATIONS, YOU GUESSED RIGHT!');
    const startIcon = document.createElement('img');
    const endIcon = document.createElement('img');  
    startIcon.src = 'winner.svg';
    endIcon.src = 'winner.svg';
    output.innerHTML = ''

    startIcon.style.fill = 'white';
    startIcon.style.marginRight = '10px';
    endIcon.style.fill = 'white';
    endIcon.style.marginLeft = '10px'
    
    // output.appendChild(startIcon);  
    output.appendChild(midText);
    // output.appendChild(endIcon);

    disableButton();
}

const disableButton = _ => {
    submitBttn.style.background = '#898989';
    submitBttn.disabled = true;
}

init();