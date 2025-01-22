import {
  getAnswerButtons,
  getButtonContainer,
  removeClickListener,
  resetButtonColor,
  colorRewardTable,
  getQuestionContainer
} from "./windowActions.js";

import { shuffleArray } from "../../util.js";

export var previouslyAsked = [];
var allQuestions = [];
export var buttons = [];

export async function gameRun() {
  allQuestions = await fetchQuestions();
  console.log(allQuestions);
}

export function askTextQuestion() {
  let buttonContainer = getButtonContainer();
  buttonContainer.removeEventListener("click", askTextQuestion);
  if (!checkQuestionsLeft()) {
    return;
  }
  let question = getRandomTextQuestion();
  let questionText = question.question;
  console.log(questionText);
  assignButtonAnswers(question);
  resetButtonColor();
  document.getElementById("questionContainer").innerText = questionText;
}

function assignButtonAnswers(question) {
  buttons = getAnswerButtons();
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
    win();
    return false;
  }
  return true;
}

export function resolveQuestion(event) {
  removeClickListener();
  if (event.target.innerText == buttons[0].innerText) {
    correctAnswer();
  } else {
    wrongAnswer();
  }
  buttons[0].style.background = "#22d10f";
  buttons[1].style.background = "#a62942";
  buttons[2].style.background = "#a62942";
  buttons[3].style.background = "#a62942";
}

function correctAnswer() {
  let questionContainer=getQuestionContainer()
  questionContainer.innerText =
    "Correct: You Win 1 Point";
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
  let questionContainer=getQuestionContainer()
  questionContainer.innerText = "Wrong: You Lose";
  console.log("wrongAnswer");
}

function win() {
  let questionContainer=getQuestionContainer()
  questionContainer.innerText =
    "There are no more Questions: You Win!";
  removeClickListener();
  console.log("WIN");
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

//util

async function fetchQuestions() {
  console.log("fetchQuestions")
  let questionsRaw = await fetch("resources\\question.d\\questions.json");
  let questionsJSON = questionsRaw.json();
  return await questionsJSON
}
