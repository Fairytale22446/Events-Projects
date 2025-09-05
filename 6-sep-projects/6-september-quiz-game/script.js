const questions = [
  {
    question: "When is Pakistan's Defence Day observed?",
    answers: [
      { text: "6th September", correct: true },
      { text: "14th August", correct: false },
      { text: "23rd March", correct: false },
      { text: "25th December", correct: false },
    ],
  },
  {
    question: "Which war is commemorated on Defence Day?",
    answers: [
      { text: "1965 War", correct: true },
      { text: "1971 War", correct: false },
      { text: "1999 Kargil War", correct: false },
      { text: "1947 War", correct: false },
    ],
  },
  {
    question: "Which city is especially associated with 1965 Defence Day?",
    answers: [
      { text: "Lahore", correct: true },
      { text: "Karachi", correct: false },
      { text: "Islamabad", correct: false },
      { text: "Peshawar", correct: false },
    ],
  },
  {
    question: "Which Pakistani general is celebrated on Defence Day?",
    answers: [
      { text: "General Muhammad Ayub Khan", correct: false },
      { text: "General Muhammad Musa", correct: false },
      { text: "Major Raja Aziz Bhatti", correct: true },
      { text: "General Zia-ul-Haq", correct: false },
    ],
  },
  {
    question: "What is the official name of Pakistan's army?",
    answers: [
      { text: "Pakistan National Guard", correct: false },
      { text: "Pakistan Army", correct: true },
      { text: "Pak Defence Force", correct: false },
      { text: "Pakistan Security Force", correct: false },
    ],
  },
  {
    question: "Which famous battle is remembered on Defence Day?",
    answers: [
      { text: "Battle of Chawinda", correct: true },
      { text: "Battle of Panipat", correct: false },
      { text: "Battle of Lahore", correct: false },
      { text: "Battle of Karachi", correct: false },
    ],
  },
  {
    question: "What is a common tradition on Defence Day?",
    answers: [
      { text: "Parades and ceremonies", correct: true },
      { text: "Fireworks only", correct: false },
      { text: "Sports competition", correct: false },
      { text: "Tree planting", correct: false },
    ],
  },
  {
    question:
      "Which branch of Pakistan's military participated actively in 1965?",
    answers: [
      { text: "Pakistan Navy", correct: false },
      { text: "Pakistan Air Force", correct: true },
      { text: "Coast Guard", correct: false },
      { text: "Paramilitary", correct: false },
    ],
  },
  {
    question: "Which color is symbolic of Pakistan's Defence Day?",
    answers: [
      { text: "Green", correct: true },
      { text: "Red", correct: false },
      { text: "Blue", correct: false },
      { text: "Yellow", correct: false },
    ],
  },
  {
    question: "Defence Day is also called:",
    answers: [
      { text: "Yaum-e-Difa", correct: true },
      { text: "Yaum-e-Takbeer", correct: false },
      { text: "Yaum-e-Azadi", correct: false },
      { text: "Yaum-e-Shujaat", correct: false },
    ],
  },
];

const introContainer = document.getElementById("intro-container");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const result = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");
const startBtn = document.getElementById("start-btn");
const finalMessage = document.getElementById("final-message");
const restartBtn = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let userName = "";
let userLine = "";

startBtn.addEventListener("click", () => {
  userName = document.getElementById("username").value.trim();
  userLine = document.getElementById("userline").value.trim();
  if (userName === "" || userLine === "") {
    alert("Please enter your name and a line about Pakistan!");
    return;
  }
  introContainer.classList.add("hide");
  quizContainer.classList.remove("hide");
  startQuiz();
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = "Score: 0";
  questionContainer.classList.remove("hide");
  result.classList.add("hide");
  nextButton.classList.add("hide");
  restartBtn.classList.add("hide");
  progressBar.style.width = "0%";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
  updateProgress();
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") button.classList.add("correct");
    button.disabled = true;
  });
  scoreElement.innerText = `Score: ${score}`;
  nextButton.classList.remove("hide");
}

function updateProgress() {
  let percent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = percent + "%";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) showQuestion();
  else showResult();
});

function showResult() {
  questionContainer.classList.add("hide");
  result.classList.remove("hide");
  scoreElement.innerText = `Final Score: ${score} / ${questions.length}`;

  // custom message based on score
  let message = "";
  if (score > 7) {
    message = "Excellent knowledge! You are a true patriot 🇵🇰";
  } else if (score >= 4) {
    message = "Good effort! Keep learning 💚";
  } else {
    message = "Don’t worry, next time you’ll do better ✨";
  }

  finalMessage.innerText = `${userName}, you said: "${userLine}". ${message}`;
  restartBtn.classList.remove("hide");
  createConfetti();
}

restartBtn.addEventListener("click", () => {
  introContainer.classList.remove("hide");
  quizContainer.classList.add("hide");
});

function createConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360},70%,60%)`;
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}
