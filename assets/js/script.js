// Defining the questions, answers, and key for my quiz
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

// Isolating elements that I will need to manipulate throughout my program
var questionsEl = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var clockEl = document.getElementById("clock");
var timerSpan = document.getElementById("timer");

// Defining necessary variables
var timerInterval;
var currentQuestionIndex = 0;
var score = 0;
var time = 60;

// Start the quiz
function startQuiz() {
  clockEl.style.display = "block"; // Display the timer
  currentQuestionIndex = 0; // Resetting the question index
  score = 0; // Resetting score
  nextButton.innerHTML = "Next Question"; // Updating button text
  showQuestions();
  startTimer();
}

// Display current question
function showQuestions() {
  resetState(); // Reset the answer button's state

  // Display the question
  var currentQuestion = questions[currentQuestionIndex];
  var questionNum = currentQuestionIndex + 1;
  questionsEl.innerHTML = questionNum + ". " + currentQuestion.question;

  // Creating buttons for each answer choice
  currentQuestion.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    // Adding an event listener for the selected answers
    button.addEventListener("click", selectAnswer);
  });
}

// Resetting the state of the answer buttons
function resetState() {
  // Hiding the next button until the user answers each question
  nextButton.style.display = "none";

  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Start the quiz timer
function startTimer() {
  // Display initial time
  timerSpan.textContent = time; 

  timerInterval = setInterval(function() {
    // Decrement time by 1 second
    time--; 
    // Update the timer display
    timerSpan.textContent = time; 

    // When the timer reaches 0
    if (time <= 0) {
      alert("Your time has expired!");
      // Clear timer interval
      clearInterval(timerInterval);
      // Show user's score
      showScore();
    }
  }, 1000);
}

// Function used to handle the selection of an answer
function selectAnswer(event) {
  var selectedBtn = event.target;
  var isCorrect = selectedBtn.dataset.correct === "true";

  if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect")
    time -= 10;
  }

  // Highlight correct answer
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    // Disable answer buttons
    button.disabled = true;
  });
  // Show next question button
  nextButton.style.display = "block";
}

// Function used to show the user's score & 
function showScore() {
  resetState();
  questionsEl.innerHTML = `You scored ${score} out of ${questions.length}!`;

  // Create input field for name
  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "Enter your Initials");
  nameInput.setAttribute("id", "name-input");
  nameInput.style.display = "block";
  nameInput.style.margin = "0 auto";
  answerButtons.appendChild(nameInput);

  // Create submit button
  var submitButton = document.createElement("button");
  submitButton.innerHTML = "Submit";
  submitButton.classList.add("submit-button");
  submitButton.addEventListener("click", saveScore);
  answerButtons.appendChild(submitButton);
  
  // Change text to from 'next question' to 'play again'
  nextButton.innerHTML = "Play Again";
  // Display the button
  nextButton.style.display = "block";
  // Hide the clock
  clockEl.style.display = "none";
}

// Function used to save the user's initials and score to localStorage
function saveScore() {
  var initials = document.getElementById("name-input").value;
  // Retrieve existing highscores from local storage
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  // Add current score and initials to the highscores array
  highscores.push({ initials: initials, score: score });
  // Using the .sort method to sort the highscores in descending order
  highscores.sort((a, b) => b.score - a.score);
  // Store the updated highscores array in local storage
  localStorage.setItem("highscores", JSON.stringify(highscores));
  // Redirect to highscores.html
  window.location.href = "highscores.html";
}

// Function used to handle click event on the 'next question' button
function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
    clearInterval(timerInterval);
  }
}

// Adding an event listener for hte 'next question' button
nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
    time = 60;
    startTimer();
  }
});

// Add click event listener to start button
var startButton = document.getElementById("start-btn");
var quizContainer = document.querySelector(".quiz");

// Hide the quiz container initially
quizContainer.style.display = "none";

startButton.addEventListener("click", function () {
  startButton.style.display = "none"; // Hide the start button
  quizContainer.style.display = "block"; // Display the quiz container
  startQuiz(); // Start the quiz
});
