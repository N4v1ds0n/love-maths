// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type') === 'submit'){
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }

    runGame('addition');
})

/** 
 * The main game 'loop', called when the scrip is first loaded
 * and after the user's answer has been processed
*/
function runGame (gameType) {
    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random()*25) + 1;
    let num2 = Math.floor(Math.random()*25) + 1;

    if (gameType === 'addition'){
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'subtract'){
        displaySubstractQuestion(num1, num2);
    } else if (gameType === 'multiply'){
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === 'division'){
        displayDivideQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}. Aborting!`;
    }
}

/**
 * Checks the answer against the first element
 * in the returned calculatedCorrectAnswer array.
 */
function checkAnswer () {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    
    if (isCorrect){
        alert('Correct!')
        incrementScore()
    } else {
        alert(`${userAnswer} is wrong! The correct answer is: ${calculatedAnswer[0]}.`)
        incrementWrongAnswer()
    }
    runGame(calculatedAnswer[1]);
    document.getElementById('answer-box').value = ''
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus, etc.)
 * directly from the DOM, and returns the correct answer.
 */
function calculateCorrectAnswer () {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;
    
    if (operator === '+'){
        return [operand1 + operand2, 'addition'];
    } else if (operator === '-'){
        return [operand1 - operand2, 'subtract'];
    } else if (operator === 'x'){
        return [operand1 * operand2, 'multiply'];
    } else if (operator === ':'){
        return [operand1 / operand2, 'division'];
    } else{
        alert(`unimplemented operator ${operator}`);
        throw `unimplemented operator ${operator}. Aborting!`; 
    }
    return correctAnswer;
}

/**
 * Bumps up the score count if answer was correct
 */
function incrementScore() {
    parseInt(document.getElementById('score').value)++;
}

/**
 * Increases cont fr incorrect guesses if answer is wrong
 */
function incrementWrongAnswer() {
    parseInt(document.getElementById('incorrect').value)++;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubstractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
}

function displayDivideQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = ':';
}