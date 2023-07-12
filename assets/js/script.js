var questions = [
  {
    question: "HTML stands for what?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Module Language", correct: false },
      { text: "Hyper Test Markup Language", correct: false },
      { text: "Hyper Text Markup Lingo", correct: false },
    ]
  },
  {
    question: "Who is the father of HTML?",
    answers: [
      { text: "Rasmus Lerdorf", correct: false },
      { text: "Tim Berners-Lee", correct: true },
      { text: "Brendan Eich", correct: false },
      { text: "Sergy Brin", correct: false },
    ]
  }, {
    question: "Which tag is used for inserting the largest heading in HTML?",
    answers: [
      { text: "head", correct: false },
      { text: "heading", correct: false },
      { text: "h1", correct: true },
      { text: "h2", correct: false },
    ]
  }, {
    question: "HTML program can be read and rendered by a(n) ___.",
    answers: [
      { text: "compiler", correct: false },
      { text: "server", correct: false },
      { text: "interpreter", correct: false },
      { text: "web browser", correct: true },
    ]
  }, {
    question: "HTML tags are surrounded by ___ brackets.",
    answers: [
      { text: "angle", correct: true },
      { text: "curly", correct: false },
      { text: "round", correct: false },
      { text: "squart", correct: false },
    ]
  }
];

var questionsEl = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var clockEl = document.getElementById("clock");

var timerInterval;
var currentQuestionIndex = 0;
var score = 0;
var time = 60;

function startQuiz() {
  clockEl.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next Question";
  showQuestions();
  startTimer();
}

function showQuestions() {
  resetState();

  var currentQuestion = questions[currentQuestionIndex];
  var questionNum = currentQuestionIndex + 1;
  questionsEl.innerHTML = questionNum + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";

  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function startTimer() {
  var timerSpan = document.getElementById("timer");
  timerSpan.textContent = time; // Display initial time

  var timerInterval = setInterval(function() {
    time--; // Decrement time by 1 second
    timerSpan.textContent = time; // Update the timer display

    if (time <= 0) {
      clearInterval(timerInterval);
      showScore(); // Call showScore() if time runs out
    }
  }, 1000); // Run the countdown every second
}


function selectAnswer(e) {
  var selectedBtn = e.target;
  var isCorrect = selectedBtn.dataset.correct === "true";

  if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect")
    time -= 10;
  }

  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionsEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

  clockEl.style.display = "none"; // hide the clock when the quiz stops
}

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
    clearInterval(timerInterval);
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
    time = 60; // reset timer
    startTimer();
  }
})

startQuiz();