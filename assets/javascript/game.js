const wins = document.querySelector('.wins');
const currentWord = document.querySelector('.currentWord');
const guessesRmg = document.querySelector('.guessesRmg');
const lettersUsed = document.querySelector('.lettersUsed');
const body = document.querySelector('.bg-dark');
const start = document.querySelector('.start');
const button = document.querySelector('button');
const message = document.querySelector('.message');
const hide = document.querySelector('.hide');
const win = document.querySelector('.win');
const lose = document.querySelector('.lose');

let audio = new Audio('./assets/images/horn.mp3');
let wordList = ['variable', 'scope', 'function', 'syntax', 'global', 'local', 'loop', 'string', 'object', 'boolean', 'number', 'array', 'undefined', 'null', 'nan'];
let wordIndex = 0;
let gameStatus;
let userArray = [];
let blankArray;
let word;
let charCount = 0;
guessesRmg.textContent = 10;
wins.textContent = 0;

button.addEventListener('click', (e) => {
    e.preventDefault();
    wordIndex = 0;
    wordList = shuffle(wordList);
    userArray = [];
    lettersUsed.textContent = [];
    start.style.display = 'block';
    hide.style.display = 'block';
    message.style.display = 'none';
    lose.style.display = 'none';
    win.style.display = 'none';
    guessesRmg.textContent = 10;
    wins.textContent = 0;
    currentWord.textContent = '';
    gameStatus = 0;
});

document.addEventListener('keypress', (e) => {
    if (gameStatus === 1 && wins.textContent < wordList.length) {
        compare(e);
    } else {
        wordList = shuffle(wordList);
        if (wins.textContent < wordList.length) {
            wordSelector();
        }
    }

    if (guessesRmg.textContent == 0) {
        hide.style.display = 'none';
        message.style.display = 'block';
        message.textContent = 'YOU LOSE';
        message.style.border = '5px solid red';
        message.style.fontSize = '3rem';
        lose.style.display = 'block';
        win.style.display = 'none';
    }
    
    if (wins.textContent == wordList.length) {
        console.log('I ran !!!');
        hide.style.display = 'none';
        message.style.display = 'block';
        message.textContent = 'YOU WIN!!!';
        message.style.border = '5px solid green';
        message.style.fontSize = '3rem';
        win.style.display = 'block';
        lose.style.display = 'none';
    }

    gameStatus = 1;
    start.style.display = 'none';
});

function wordSelector() {
    word = wordList[wordIndex];
    let wil = word.length;
    blankArray = [];

    for (let i = 0; i < wil; i++) {
        blankArray.push('_');
    }
    
    currentWord.textContent = blankArray.join(' ');
    if (wordIndex + 1 < wordList.length) {
        wordIndex++;
    }
}

function compare(e) {
    let pos = word.indexOf(e.key);
    let pos2 = word.lastIndexOf(e.key);
    let checkDup = userArray.indexOf(e.key);
    let search;
    let totalMisses = false;
    let hit = false;
    let repeatChar = false;
    let letterArray = word.split('');

    userArray.push(e.key);
    lettersUsed.textContent = userArray.join(' ');

    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i - 1] === e.key) {
            repeatChar = true;
        }
    }
    
    for (let i = 0; i < letterArray.length; i++) {
        if (letterArray[i] === e.key && repeatChar === false) {
            //console.log(letterArray[i]);
            blankArray[i] = e.key;
            hit = true;
            charCount++;
        } else {
            totalMisses = true;
        }
    }

    repeatChar = false;

    if (totalMisses && !hit) {
        guessesRmg.textContent--;
        hit = false;
    }
    
    if (charCount === letterArray.length) {
        audio.play();
        wins.textContent++;
        guessesRmg.textContent = 10;
        charCount = 0;
        userArray = [];
        lettersUsed.textContent = userArray;
        wordSelector();
    }
    
    currentWord.textContent = blankArray.join(' ');
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}







