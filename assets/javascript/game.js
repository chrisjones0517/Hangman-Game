const wins = document.querySelector('.wins');
const currentWord = document.querySelector('.currentWord');
const guessesRmg = document.querySelector('.guessesRmg');
const lettersUsed = document.querySelector('.lettersUsed');
const body = document.querySelector('.bg-dark');
const start = document.querySelector('.start');
const wordList = ['variable', 'scope', 'function', 'syntax', 'global', 'local', 'loop', 'string', 'object', 'boolean', 'number', 'array', 'undefined', 'null', 'nan'];

let gameStatus;
let userArray = [];
let blankArray;
let word;
let charCount = 0;
guessesRmg.textContent = 10;


document.addEventListener('keypress', (e) => {
    
    if (gameStatus === 1) {
        
        guessesRmg.textContent--;
        //console.log(e.key);
        compare(e);

        
    } else {
        //console.log(gameStatus);
        wordSelector();
        
    }
    if (guessesRmg.textContent === 0) {
        alert
    }
    gameStatus = 1;
    start.style.display = 'none';
    
});





function wordSelector() {
    let randIndex = Math.floor(wordList.length * Math.random());
    word = wordList[randIndex];
    let wil = word.length;
    blankArray = [];

    for (let i = 0; i < wil; i++) {
        blankArray.push('_');
        
    }
    //console.log(wordIndex);
    //console.log(blankString);
    currentWord.textContent = blankArray.join(' ');

    
    
}

function compare(e) {
    let pos = word.indexOf(e.key);
    let pos2 = word.lastIndexOf(e.key);
    

    userArray.push(e.key);
    //console.log(word);
    lettersUsed.textContent = userArray.join(' ');
    
    
        

    if (pos !== -1 && pos === pos2) {
        blankArray[pos] = e.key;
        charCount++;
    } else if (pos2 !== -1) {
        blankArray[pos] = e.key;
        blankArray[pos2] = e.key;
        charCount += 2;
    } 

    console.log(charCount);
    
    if (charCount === word.length) {
        console.log("success!");
        charCount = 0;
        userArray = [];
        lettersUsed.textContent = userArray;
        wordSelector();
    }
    //console.log(pos);
    currentWord.textContent = blankArray.join(' ');
    
}









