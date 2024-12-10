var previouslyAsked = [];
function askTextQuestion() {
  if (previouslyAsked.length == allQuestions.length) {
    document.getElementById("questionContainer").innerText =
      "There are no more Questions: You Win!";
    return;
  }

  let question = getRandomTextQuestion();
  questionText = question.question;
  console.log(questionText);
  assignButtonAnswers(question)
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
  console.log(buttons)
  buttons=shuffleArray(buttons);
  buttons[0].innerText=question.correct;
  buttons[1].innerText=question.wrong1;
  buttons[2].innerText=question.wrong2;
  buttons[3].innerText=question.wrong3;

}

function correctAnwser(){
  document.getElementById("questionContainer").innerText =
  "Correct: You Win 1 Point";
}

function WrongAnwser(){
  document.getElementById("questionContainer").innerText =
  "Wrong: You Lose";
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
    wrong3: "The tortured Poets Department",
    correct: "Evermore",
  },
];

//getRandomTextQuestion();
