var previouslyAsked = [];
function askTextQuestion() {
  let question = getRandomTextQuestion();
  questionText = question.question;
  console.log(questionText);
  document.getElementById("questionContainer").innerText = questionText;
}

function getRandomTextQuestion() {
  randomIndex = Math.floor(Math.random() * allQuestions.length);
  question = allQuestions[randomIndex];
  question = null;
  if (previouslyAsked.includes(question)) {
    return getRandomTextQuestion();
  }
  //  previouslyAsked.push(question);
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

getRandomTextQuestion();
