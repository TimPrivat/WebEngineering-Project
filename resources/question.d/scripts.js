var previouslyAsked = [];
function askTextQuestion() {
  document.getElementById("buttonContainer").removeAttribute("onclick");


  if(!checkQuestionsLeft()){
    return
  }
  let question = getRandomTextQuestion();
  questionText = question.question;
  console.log(questionText);
  assignButtonAnswers(question);
  resetButtonColor();
  document.getElementById("questionContainer").innerText = questionText;
}

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function assignButtonAnswers(question) {
  buttons = Array.from(document.getElementsByClassName("answerButton"));
  console.log(buttons);

  buttons = shuffleArray(buttons);
  buttons[0].innerText = question.correct;
  buttons[1].innerText = question.wrong1;
  buttons[2].innerText = question.wrong2;
  buttons[3].innerText = question.wrong3;
  removeClickListener();
  buttons.forEach((button) => {
    button.addEventListener("click", resolveQuestion);
  });

}

function checkQuestionsLeft() {
  if (previouslyAsked.length >= allQuestions.length) {
    document.getElementById("questionContainer").innerText =
      "There are no more Questions: You Win!";
    removeClickListener();
    return false;
  }
  return true
}

function removeClickListener() {
  if (previouslyAsked.length >= 1) {
    buttons.forEach((button) => {
      button.removeEventListener("click", resolveQuestion);
      button.removeEventListener("click", askTextQuestion);
    });
  }
}

function resetButtonColor(){
  buttons.forEach((button) => {
    button.style.background="white";
  });
}

function resolveQuestion(event) {
  removeClickListener();
  if (event.target.innerText == buttons[0].innerText) {
    correctAnswer();
  } else {
    wrongAnswer();
  }
  buttons[0].style.background="#22d10f";
  buttons[1].style.background="#a62942";
  buttons[2].style.background="#a62942";
  buttons[3].style.background="#a62942";
}

function correctAnswer() {
  document.getElementById("questionContainer").innerText =
    "Correct: You Win 1 Point";
  console.log("correctAnswer");
  buttons.forEach((button) => {
    button.addEventListener("click", askTextQuestion);
  });
}

function wrongAnswer() {
  document.getElementById("questionContainer").innerText = "Wrong: You Lose";
  console.log("wrongAnswer");
}

function getRandomTextQuestion() {
  randomIndex = Math.floor(Math.random() * allQuestions.length);
  question = allQuestions[randomIndex];

  if (previouslyAsked.includes(question)) {
    return getRandomTextQuestion();
  }
  previouslyAsked.push(question);
  console.log(question);
  return question;
}

var allQuestions = [
  {
    question: "Which is the highest Mountain in the World?",
    wrong1: "Zugspitze",
    wrong2: "Kangchenjunga",
    wrong3: "Broad Peak",
    correct: "Mount Everest",
  },
  {
    question: "Which is the latest Record by Taylor Swift?",
    wrong1: "Back in Black",
    wrong2: "Red",
    wrong3: "Evermore",
    correct: "The tortured Poets Department",
  },
];
