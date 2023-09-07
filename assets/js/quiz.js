const question = document.querySelector('#question');
const cardContainer = document.querySelector('.card-container');
const dropText = document.querySelector('.drop-text');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let selectedChoice = null;

let questions = [
    {
        question: 'Which of the following expressions evaluate to 3.5? \n I. (double) 2 / 4 + 3  \n  II. (double) (2 / 4) + 3  \n III.(double) (2 / 4 + 3) ',
        choice1: 'I only',
        choice2: 'II and III only',
        choice3: 'I and II only',
        choice4: 'I, II, and III',
        answer: 1,
    },
    {
        question: 'Assume that a, b, and c are boolean variables that have been properly declared and initialized. Which of the following boolean expressions is equivalent to !(a && b) || c ?',
        choice1: 'a || b || c',
        choice2: '!a && !b || c',
        choice3: '!a && !b && c',
        choice4: '!a || !b || c',
        answer: 4,
    },
    {
        question: 'Consider the following code segment. Assume that a is greater than zero.  \n int a = /* value not shown */;  \n int b = a + (int) (Math.random() * a); \n Which of the following best describes the value assigned to b when the code segment is executed?',
        choice1: 'a',
        choice2: '2 * a',
        choice3: 'A random integer between a and 2 * a, inclusive',
        choice4: 'A random integer between a and 2 * a - 1, inclusive',
        answer: 4,
    },
    {
        question: 'Consider the following statement. Assume that a and b are properly declared and initialized boolean variables.  \n boolean c = (a && b) || (!a && b);  \n Under which of the following conditions will c be assigned the value false ?',
        choice1: 'Always',
        choice2: 'Never',
        choice3: 'When a and b have the same value',
        choice4: 'When b has the value false',
        answer: 4,
    },
    {
        question: 'Which of the following is NOT a Java primitive type',
        choice1: 'double',
        choice2: 'float',
        choice3: 'int',
        choice4: 'String',
        answer: 4,
    },
    {
        question: 'Consider the following code segment. \n String str = "0";  \n str += str + 0 + 8;  \n System.out.println(str);  \n What is printed as a result of executing the code segment?',
        choice1: '8',
        choice2: '008',
        choice3: '0008',
        choice4: 'Nothing is printed, because numerical values cannot be added to a String object.',
        answer: 3,
    },
    {
        question: 'Assume that a, b, and c are boolean variables that have been properly declared and initialized. Which of the following boolean expressions is equivalent to !(a && b) || c ?',
        choice1: 'a && b && c',
        choice2: 'a || b || c',
        choice3: '!a && !b || c',
        choice4: '!a || !b || c',
        answer: 4,
    },
    {
        question: 'Assume that the boolean variables a, b, c, and d have been declared and initialized. Consider the following expression.  \n !( !( a && b ) || ( c || !d ))   \n Which of the following is equivalent to the expression?',
        choice1: '( a && b ) && ( !c && d )',
        choice2: '( a || b ) && ( !c && d )',
        choice3: '( a && b ) || ( c || !d )',
        choice4: '( !a || !b ) && ( !c && d )',
        answer: 1,
    },
    {
        question: 'Consider the following Boolean expressions.   \n I. A && B  \n  II. !A && !B  Which of the following best describes the relationship between values produced by expression I and expression II?',
        choice1: 'Expression I and expression II evaluate to different values for all values of A and B.',
        choice2: 'Expression I and expression II evaluate to the same value for all values of A and B.',
        choice3: 'Expression I and expression II evaluate to the same value only when A and B are the same.',
        choice4: 'Expression I and expression II evaluate to the same value only when A and B differ.',
        answer: 4,
    }
];

const SCORE_POINTS = 100; // Points awarded for each correct answer
const MAX_QUESTIONS = 9; // Maximum number of questions in the game

// Function to start the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //spread operator to get all the question values in the array
    getNewQuestion();
};

// Function to retrieve and display a new question
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score); //save to local storage

        return (window.location.href = 'https://tianbinliu.github.io/CSA-FinalProject/');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`; //question 1 of 4, 2 of 4, etc. incrementing by 1 each time
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //calculate what question we are on and correspond w/ the percentage

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length); //calculate value of the question index
    currentQuestion = availableQuestions[questionsIndex]; //keep track of what questions we are on
    question.innerText = currentQuestion.question; //know what the question asked

    cardContainer.innerHTML = ''; // Clear the card container
    for (let i = 1; i <= 4; i++) {
        const choiceCard = document.createElement('div');
        choiceCard.classList.add('choice-card');
        choiceCard.draggable = true;
        choiceCard.dataset.number = i;
        choiceCard.innerText = currentQuestion['choice' + i];
        cardContainer.appendChild(choiceCard);
    }

    availableQuestions.splice(questionsIndex, 1); //splice(start, deleteCount) - remove elements from an array

    acceptingAnswers = true;

    cardContainer.addEventListener('dragstart', (e) => {
        selectedChoice = e.target.dataset.number;
    });
};



const dropArea = document.getElementById('drop-area');

// Drag and drop event listeners
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!acceptingAnswers) return;

    // Get the selected choice from the stored variable
    const selectedAnswer = selectedChoice;

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    console.log('classToApply:', classToApply);

    if (classToApply === 'correct') {
        incrementScore(SCORE_POINTS);
    }

    dropArea.classList.add(classToApply);

    setTimeout(() => {
        dropArea.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);
});



// Function to increment the score
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
}

startGame();
