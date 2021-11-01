// Initial data

let dummyHead = document.querySelector('.dummyHead');
let dummyBody = document.querySelector('.dummyBody');
let dummyLeftArm = document.querySelector('.left-arm');
let dummyRightArm = document.querySelector('.right-arm');
let dummyLeftLeg = document.querySelector('.left-leg');
let dummyRightLeg = document.querySelector('.right-leg');
let lettersArea = document.querySelector('.letters-area');
let lettersAreaHTML = '';
let inputArea = document.querySelector('.GUI .inputsArea');
let letterInput = document.querySelector('.GUI input');
let writtenLettersArea = document.querySelector('.GUI h3 span');
let endGameScreen = document.querySelector('.GUI .endGameScreen');
let currentError = 0;
let currentlyPlaying = true;
let currentAnswer = '';
let arrayAnswer = [];
let winCondition = []
let writtenLetters = [];
let writtenLettersHTML = '';

// Events

document.querySelector('.inputs button').addEventListener('click', checkLetter)
document.querySelector('.endGameScreen button').addEventListener('click', startGame)

// Functions

function startGame() {
    
    currentlyPlaying = true;
    let chosenNumber = Math.floor(Math.random() * words.length);
    let chosenWord = words[chosenNumber];
    currentAnswer = chosenWord.answer;
    arrayAnswer = currentAnswer.split('');
    winCondition = currentAnswer.split('');
    letterInput.value = '';
    lettersAreaHTML = '';
    currentError = 0;

    // Structure length part
    document.querySelector('.structureBars div:nth-child(2)').style.width = `${(arrayAnswer.length)*9}rem`
    document.querySelector('.structureBars div:nth-child(3)').style.marginLeft = `calc(${(arrayAnswer.length)*9}rem - 0.7rem)`
    document.querySelector('.gameDisplay').style.width = `${(arrayAnswer.length)*9}rem`


    console.log('the answer is '+currentAnswer)

    for(let i = 0; i<6 ; i++){
        document.querySelectorAll('.dummy div')[i].style.display = 'none'
    }
    endGameScreen.style.display = 'none';
    document.querySelector('.GUI .tip').style.display = 'block';
    inputArea.style.display = 'flex';

    for(i=0; i<chosenWord.answer.length; i++) {
        lettersAreaHTML += '<div class="emptyLetter"></div>'
    }
    lettersArea.innerHTML = lettersAreaHTML
    document.querySelector('.GUI h2 span').innerHTML = chosenWord.tip
}

function checkLetter() {
    if(currentlyPlaying == true){
        if(winCondition.value !== ''){

            if(winCondition.indexOf(letterInput.value)>-1) {
                let selectedLetter = document.querySelectorAll('.letters-area div')[arrayAnswer.indexOf(letterInput.value)]
                console.log('tem essa letra! e ta na posição '+arrayAnswer.indexOf(letterInput.value));
                selectedLetter.classList.remove('emptyLetter');
                selectedLetter.classList.add('letter');
                selectedLetter.innerHTML = arrayAnswer[arrayAnswer.indexOf(letterInput.value)];
                winCondition.splice(winCondition.indexOf(letterInput.value), 1);
                if(winCondition.length == 0) {
                    wonGame();
                }
                writtenLettersHTML = '';
                writtenLetters.push(arrayAnswer[arrayAnswer.indexOf(letterInput.value)]);
                writtenLetters.sort();
                writtenLettersHTML = writtenLetters.join(', ')
                writtenLettersArea.innerHTML = writtenLettersHTML




                
            } else {
                checkError()
                console.log('n tem essa letra :(')
                currentError++;
            };


        }
    }
}

function wonGame() {
    currentlyPlaying = false
    document.querySelector('.GUI .tip').style.display = 'none';
    inputArea.style.display = 'none';
    document.querySelector('.endGameScreen h2').innerHTML = `Congratulations, you won!`
    endGameScreen.style.display = 'flex';
}

function checkError(){
    if(currentError < 5){
        document.querySelectorAll('.dummy div')[currentError].style.display = 'block'
    } else {
        document.querySelector('.right-leg').style.display = 'block'
        currentlyPlaying = false
        document.querySelector('.GUI .tip').style.display = 'none';
        inputArea.style.display = 'none';
        document.querySelector('.endGameScreen h2').innerHTML = `You lost, the answer was: <span>${currentAnswer}</span>`
        endGameScreen.style.display = 'flex';
    }
}


startGame()
