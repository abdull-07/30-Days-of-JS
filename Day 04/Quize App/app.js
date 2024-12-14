const message = document.querySelector("#finished"); // Show the message when quiz ends
const messageCont = document.getElementsByClassName("message-cont");
const resetQuizBtn = document.querySelector("#reset"); // Restart the Quiz
const nextQuestionBtn = document.querySelector("#next"); // Move to the next Question
const scoreElement = document.querySelector("#score span"); // Show score
const questionElement = document.querySelector("#question"); // Show Question
const options = document.querySelectorAll("#answers .answer"); // Options of every question
const quizCont = document.getElementsByClassName("quiz");
const buttons = document.getElementsByClassName("buttons");
const tryAgain = document.querySelector("#Try-again"); // Try Again once quiz ends
const finalScore = document.querySelector("#final-score");
let currentScore = 0;
let currentIndex = 0;

// Questions
const questions = [
    {
        Q: "Q1: What is the correct syntax for referring to an external script called 'app.js'?",
        answers: [
            { text: "<script name='app.js'>", correct: false },
            { text: " <script href='app.js'>", correct: false },
            { text: " <script src='app.js'>", correct: true },
            { text: " <script file='app.js'>", correct: false }
        ]
    },
    {
        Q: "Q2: Which company developed JavaScript?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Netscape", correct: true },
            { text: "Sun Microsystems", correct: false },
            { text: "IBM", correct: false }
        ]
    },
    {
        Q: "Q3: What is the output of console.log(typeof NaN)?",
        answers: [
            { text: "Number", correct: true },
            { text: "String", correct: false },
            { text: "NaN", correct: false },
            { text: "Undefined", correct: false }
        ]
    },
    {
        Q: "Q4: Which method is used to add an element to the end of an array?",
        answers: [
            { text: "pop()", correct: false },
            { text: "push()", correct: true },
            { text: "shift()", correct: false },
            { text: "unshift()", correct: false }
        ]
    },
    {
        Q: "Q5: Which keyword is used to declare a constant in JavaScript?",
        answers: [
            { text: "let", correct: false },
            { text: "const", correct: true },
            { text: "var", correct: false },
            { text: "static", correct: false }
        ]
    },
    {
        Q: "Q6: How can you convert a string to an integer in JavaScript?",
        answers: [
            { text: "parseInt()", correct: true },
            { text: "toInteger()", correct: false },
            { text: "parseString()", correct: false },
            { text: "convertInt()", correct: false }
        ]
    },
    {
        Q: "Q7: Which CSS property is used to make a website responsive?",
        answers: [
            { text: "position", correct: false },
            { text: "media-query", correct: true },
            { text: "overflow", correct: false },
            { text: "z-index", correct: false }
        ]
    },
    {
        Q: "Q8: What is the purpose of the async keyword in JavaScript?",
        answers: [
            { text: "To declare a function as asynchronous", correct: true },
            { text: "To make code execute faster", correct: false },
            { text: "To loop asynchronously", correct: false },
            { text: "To pause execution", correct: false }
        ]
    },
    {
        Q: "Q9: What is the default value of the position property in CSS?",
        answers: [
            { text: "relative", correct: false },
            { text: "absolute", correct: false },
            { text: "static", correct: true },
            { text: "fixed", correct: false }
        ]
    },
    {
        Q: "Q10: Which of these is NOT a JavaScript framework?",
        answers: [
            { text: "Angular", correct: false },
            { text: "React", correct: false },
            { text: "Vue", correct: false },
            { text: "Django", correct: true }
        ]
    }

    // Add More Questions
];

// Start the Quiz
const startQuiz = () => {
    console.log("Quiz Start");
    Array.from(messageCont).forEach(message => message.classList.add("display"));
    Array.from(buttons).forEach(button => button.classList.remove("display"));
    Array.from(quizCont).forEach(quiz => quiz.classList.remove("display"));
    currentIndex = 0;
    currentScore = 0;
    displayQuestion(currentIndex); // Display the Questions
};

const displayQuestion = (index) => {
    console.log("Questions");
    const currentQuestion = randomizedQuestions[index]; // Randomize the Options every time
    questionElement.textContent = currentQuestion.Q;
    const labels = ['A. ', 'B. ', 'C. ', 'D. ']; // Option labels

    options.forEach((option, i) => {
        // Prepend labels to each answer
        option.textContent = `${labels[i]} ${currentQuestion.answers[i].text}`;
        option.dataset.correct = currentQuestion.answers[i].correct;
        option.style.backgroundColor = ""; // Reset background color
        option.disabled = false; // Enable options
    });
};


// Randomize the Options every time
const randomizeAnswers = (questions) => {
    return questions.map(question => {
        const shuffledAnswers = question.answers.sort(() => Math.random() - 0.5);
        return { ...question, answers: shuffledAnswers };
    });
};

const randomizedQuestions = randomizeAnswers(questions);

// Highlight Answers
const highlightAnswers = (selectedOption) => {
    const correctAnswer = [...options].find(option => option.dataset.correct === "true");

    // Highlight correct and incorrect answers
    if (selectedOption.dataset.correct === "true") {
        selectedOption.style.backgroundColor = "green"; // Highlight correct answer
        currentScore++; // Increment score
        scoreElement.innerHTML = `${currentScore} out of ${questions.length}`;
    } else {
        selectedOption.style.backgroundColor = "red"; // Highlight wrong answer
        correctAnswer.style.backgroundColor = "green"; // Highlight the correct answer
    }

    // Disable all options
    options.forEach(option => {
        option.disabled = true;
    });

    // Wait 3 seconds, then move to the next question
    setTimeout(() => {
        moveToNextQuestion();
    }, 1000);
};

// Move to next Question
const moveToNextQuestion = () => {
    currentIndex++;
    if (currentIndex < randomizedQuestions.length) {
        displayQuestion(currentIndex);
    } else {
        message.innerHTML = "Quiz finished!";
        finalScore.innerHTML = `Your Score is ${currentScore} out of ${questions.length}`;
        Array.from(buttons).forEach(button => button.classList.add("display"));
        Array.from(quizCont).forEach(quiz => quiz.classList.add("display"));
        Array.from(messageCont).forEach(message => message.classList.remove("display"));

        alert("Quiz finished!");
    }
};

// Add Event Listeners to Options
options.forEach(option => {
    option.addEventListener("click", (e) => {
        highlightAnswers(e.target);
    });
});

// Add Event Listeners to Buttons
nextQuestionBtn.addEventListener("click", moveToNextQuestion); // Go to Next Question
resetQuizBtn.addEventListener("click", startQuiz); // Restart Quiz
tryAgain.addEventListener("click", startQuiz); // Restart Quiz

// Start the Quiz
startQuiz();