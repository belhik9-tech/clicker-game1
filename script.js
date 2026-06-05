let score = 0;
let timeLeft = 60;
let combo = 0;  
let timer = null;
let isPlaying = false;


let currentCorrectAnswer = 0; 
let shownAnswer = 0;

const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const comboEl = document.getElementById('combo');
const statementEl = document.getElementById('statement');
const messageEl = document.getElementById('message');
const startBtn = document.getElementById('startBtn');
const trueBtn = document.getElementById('trueBtn');
const falseBtn = document.getElementById('falseBtn');


function startGame() {
    score = 0;
    timeLeft = 60;
    combo = 0;
    isPlaying = true;
    

    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    comboEl.textContent = combo;
    messageEl.textContent = "Aiziet! Vai tas ir taisnība?";
    messageEl.style.color = "white";
    
    startBtn.style.display = "none"; 
    
    nextQuestion();
    
    clearInterval(timer);
    timer = setInterval(updateTime, 1000);
}

function updateTime() {
    timeLeft--;
    timeEl.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        endGame();
    }
}

function nextQuestion() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    const operation = Math.floor(Math.random() * 2);
    let operationSign = "";

    if (operation === 0) {
        operationSign = "+";
        currentCorrectAnswer = num1 + num2;
    } else {
        operationSign = "-";
        if (num1 >= num2) {
            currentCorrectAnswer = num1 - num2;
            statementEl.textContent = `${num1} - ${num2} = `;
        } else {
            currentCorrectAnswer = num2 - num1;
            statementEl.textContent = `${num2} - ${num1} = `;
        }
    }

    if (operation === 0) {
        statementEl.textContent = `${num1} + ${num2} = `;
    }

    const shouldBeTrue = Math.random() > 0.5;
    
    if (shouldBeTrue) {
        shownAnswer = currentCorrectAnswer;
    } else {
        const mistake = Math.floor(Math.random() * 3) + 1;
        if (Math.random() > 0.5) {
            shownAnswer = currentCorrectAnswer + mistake;
        } else {
            shownAnswer = currentCorrectAnswer - mistake;
        }
        
        if (shownAnswer === currentCorrectAnswer) {
            shownAnswer += 1;
        }
    }
    
    statementEl.textContent += shownAnswer;
}

function checkAnswer(playerChoseTrue) {
    if (!isPlaying) return; 
    
    const isActuallyTrue = (shownAnswer === currentCorrectAnswer);
    
    if (playerChoseTrue === isActuallyTrue) {
        combo++;
        score += 10 + (combo * 2);
        messageEl.textContent = "Pareizi!";
        messageEl.style.color = "#2ecc71";
    } else {
        combo = 0;
        score = Math.max(0, score - 5);
        messageEl.textContent = "Nepareizi!";
        messageEl.style.color = "#e74c3c";
    }
    
    scoreEl.textContent = score;
    comboEl.textContent = combo;
    
    nextQuestion();
}

function endGame() {
    isPlaying = false;
    clearInterval(timer);
    
    statementEl.textContent = "Laiks beidzies! ⏱️";
    messageEl.textContent = `Tavs gala rezultāts: ${score} punkti!`;
    messageEl.style.color = "#f1c40f";
    
    startBtn.textContent = "Spēlēt vēlreiz";
    startBtn.style.display = "inline-block";
}

startBtn.addEventListener('click', startGame);

trueBtn.addEventListener('click', () => {
    checkAnswer(true);
});

falseBtn.addEventListener('click', () => {
    checkAnswer(false);
});