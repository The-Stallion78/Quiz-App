const questions = [
    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Indus River", correct: false },
            { text: "Mississippi River", correct: false }
        ]
    },
    {
        question: "Which country has the largest population in the world?",
        answers: [
            { text: "China", correct: true },
            { text: "Pakistan", correct: false },
            { text: "India", correct: false },
            { text: "Russia", correct: false }
        ]
    },
    {
        question: "Which city is known as the 'The city of Dams'?",
        answers: [
            { text: "London", correct: false },
            { text: "Haripur Hazara", correct: true },
            { text: "Rome", correct: false },
            { text: "Kolkata", correct: false }
        ]
    },
    {
        question: "What is the official currency of Japan?",
        answers: [
            { text: "Yuan", correct: false },
            { text: "Yen", correct: true },
            { text: "Dollar", correct: false },
            { text: "Ruble", correct: false }
        ]
    },
    {
        question: "Which desert is the largest in the world by area?",
        answers: [
            { text: "Sahara Desert", correct: true },
            { text: "Gobi Desert", correct: false },
            { text: "Albanian Desert", correct: false },
            { text: "Kalahari Desert", correct: false }
        ]
    },
    {
        question: "Who was the first person to reach the South Pole?",
        answers: [
            { text: "Roald Amundsen", correct: true },
            { text: "Robert Falcon Scott", correct: false },
            { text: "Ernest Shackleton", correct: false },
            { text: "Edmund Hillary", correct: false }
        ]
    },
    {
        question: "Which is the smallest country in the world by land area?",
        answers: [
            { text: "Sri Lanka", correct: false },
            { text: "Cook Islands", correct: false },
            { text: "Vatican City", correct: true },
            { text: "Malta", correct: false }
        ]
    },
    {
        question: "Which mountain is the tallest in the world?",
        answers: [
            { text: "Mount Everest", correct: true },
            { text: "K2", correct: false },
            { text: "Nanga Parbat", correct: false },
            { text: "Kanchenjunga", correct: false }
        ]
    },
    {
        question: "In which year did the Titanic sink?",
        answers: [
            { text: "1910", correct: false },
            { text: "1912", correct: true },
            { text: "1909", correct: false },
            { text: "1899", correct: false }
        ]
    },
    {
        question: "What is the capital city of Kosovo?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Ottawa", correct: false },
            { text: "Hamburg", correct: false },
            { text: "Pristina", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; // this will iterate over number of Questions.
let score = 0; // this will store the number of right answers.

function startQuiz() {
    currentQuestionIndex = 0; // when Quiz starts, it'll reset the quiz to start location.
    score = 0; // initially the score is 0
    nextButton.innerHTML = "Next"; // activate next button 
    showQuestion(); // show next question
}

function showQuestion() {
    resetState(); // this will reset the previous state of Questions and answers
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; // initially 0+1 = 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
    nextButton.style.display = "none"; // Hide the next button until an answer is selected
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++; // increase score for correct answer
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after selection
    });
    nextButton.style.display = "block"; // Show the next button after an answer is selected
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz(); // function call
