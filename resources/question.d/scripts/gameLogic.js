import {
  getAnswerButtons,
  getButtonContainer,
  removeClickListener,
  resetButtonColor,
  colorRewardTable,
  getQuestionContainer,
  colorButtons,
  addJokerClickListener,
  enableElement,
  setTimerValue,
} from "./windowActions.js";

import { shuffleArray, convertTimeToString, sleep } from "../../util.js";

export var previouslyAsked = [];
var allQuestions = [];
export var buttons = [];
export var gameOver = false;
var gameStarted = false;
export var currentQuestion;

export async function gameRun() {
  allQuestions = await fetchQuestions();
  console.log(allQuestions);
}

export function askTextQuestion() {
  //aborts if there are no questions left
  if (!checkQuestionsLeft()) {
    return;
  }

  if(!gameStarted){
    gameStarted=true;
    onFirstQuestion()
  }

  let question = getRandomTextQuestion();
  currentQuestion = question;
  let questionText = question.question;
  console.log(questionText);
  assignButtonAnswers(question);
  resetButtonColor();
  document.getElementById("questionContainer").innerText = questionText;
}

function onFirstQuestion(){
    //enables Jokers with first Question
  addJokerClickListener();
  timer();
  getButtonContainer().removeEventListener("click", askTextQuestion);
}

function assignButtonAnswers(question) {
  buttons = getAnswerButtons();
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
    win();
    return false;
  }
  return true;
}

export function resolveQuestion(event) {
  removeClickListener();
  resetButtonColor();

  if (event.target.innerText == buttons[0].innerText) {
    correctAnswer();
  } else {
    wrongAnswer();
  }
  enableElement(buttons[1]);
  enableElement(buttons[2]);
  colorButtons();
}

function correctAnswer() {
  let questionContainer = getQuestionContainer();
  questionContainer.innerText = "Correct: You Win 1 Point";
  console.log("correctAnswer");
  // Change to "nextQuestionListener"
  buttons.forEach((button) => {
    button.addEventListener("click", askTextQuestion);
  });

  colorRewardTable();
  if (previouslyAsked.length == 12) {
    win();
  }
}

function wrongAnswer() {
  let questionContainer = getQuestionContainer();
  questionContainer.innerText = "Wrong: You Lose";
  console.log("wrongAnswer");
  gameOver=true;
  prepareLeaderboard()
}

function win() {
  let questionContainer = getQuestionContainer();
  questionContainer.innerText = "There are no more Questions: You Win!";
  removeClickListener();
  console.log("WIN");
  gameOver=true;
  prepareLeaderboard()
}

function timeOut() {
  let questionContainer = getQuestionContainer();
  questionContainer.innerText = "You ran out of Time You lose!";
  removeClickListener();
  console.log("timeOut");
  prepareLeaderboard()
}

function getRandomTextQuestion() {
  let randomIndex = Math.floor(Math.random() * allQuestions.length);
  let question = allQuestions[randomIndex];

  if (previouslyAsked.includes(question)) {
    return getRandomTextQuestion();
  }
  previouslyAsked.push(question);
  console.log(question);
  return question;
}

async function prepareLeaderboard(){
  sleep(5000).then( () => {

    removeClickListener()
    getQuestionContainer().innerText="Compare yourself to other contestants"
    getAnswerButtons().forEach(button => {
      button.addEventListener("click", () => window.location.href=('../../../leaderboard.html'));
      button.innerText="Go To Leaderbarod"
    });
  })

  }


async function fetchQuestions() {
  console.log("fetchQuestions");
  let questionsRaw = await fetch("resources\\question.d\\questions.json");
  let questionsJSON = questionsRaw.json();
  return await questionsJSON;
}

var secondsLeft = 300;
async function timer() {
  while (!gameOver && secondsLeft > 0) {
    let timeString = convertTimeToString(--secondsLeft);
    setTimerValue(timeString);
    await sleep(1000);
  }
  if (secondsLeft <= 0) {
    timeOut();
  }
}



