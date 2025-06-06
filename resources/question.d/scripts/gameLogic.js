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

import {
  shuffleArray,
  convertTimeToString,
  sleep,
  b64DecodeUnicode,
} from "../../util.js";

import { getDifficulty } from "../../settings.d/scripts/settings.js";

export var previouslyAsked = [];
var allQuestions = [];
export var buttons = [];
export var gameOver = false;
var gameWon = false;
var gameStarted = false;
export var currentQuestion;

export async function gameRun() {
  //allQuestions = await fetchQuestions();
  allQuestions = await fetchQuestionsAPI();
  console.log(allQuestions);
}

export function askTextQuestion() {
  //aborts if there are no questions left
  if (!checkQuestionsLeft()) {
    return;
  }

  if (!gameStarted) {
    gameStarted = true;
    onFirstQuestion();
  }

  let question = getRandomTextQuestion();
  currentQuestion = question;
  let questionText = question.question;
  console.log(questionText);
  assignButtonAnswers(question);
  resetButtonColor();
  document.getElementById("questionContainer").innerText = questionText;
}

function onFirstQuestion() {
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
  gameOver = true;
  gameWon = false;
  prepareLeaderboard();
}

function win() {
  let questionContainer = getQuestionContainer();
  questionContainer.innerText = "There are no more Questions: You Win!";
  removeClickListener();
  gameOver = true;
  gameWon = true;
  console.log("WIN");
  prepareLeaderboard();
}

function timeOut() {
  let questionContainer = getQuestionContainer();
  questionContainer.innerText = "You ran out of Time You lose!";
  removeClickListener();
  console.log("timeOut");
  gameWon = false;
  prepareLeaderboard();
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

async function prepareLeaderboard() {
  localStorage.setItem("gameWon", gameWon);
  sleep(5000).then(() => {
    removeClickListener();
    getQuestionContainer().innerText = "Compare yourself to other contestants";
    getAnswerButtons().forEach((button) => {
      button.addEventListener(
        "click",
        () => (window.location.href = "../../../leaderboard.html")
      );
      button.innerText = "Go To Leaderbarod";
    });
  });
}

async function fetchQuestionsFile() {
  console.log("fetchQuestions");
  let questionsRaw = await fetch("resources\\question.d\\questions.json");
  let questionsJSON = questionsRaw.json();
  fetchQuestionsAPI();
  return await questionsJSON;
}

async function fetchQuestionsAPI() {
  // uses this api: https://opentdb.com/api_config.php
  let requestURL = `https://opentdb.com/api.php?amount=12&category=9&difficulty=${getDifficulty()}&type=multiple&&encode=base64`;

  let fetchResponse = await fetch(requestURL);
  if (fetchResponse.status == "429") {
    console.error("Too many Requests: Waiting for 6sec");
    await sleep(6000);
    return await fetchQuestionsAPI();
  } else if (fetchResponse.status != 200) {
    return await fetchQuestionsFile();
  }
  let requestResult = await fetchResponse.json();
  let questionArray = Array.from(requestResult.results);
  console.log(questionArray);

  return questionArray.map((item) => {
    return {
      question: b64DecodeUnicode(item.question),
      correct: b64DecodeUnicode(item.correct_answer),
      wrong1: b64DecodeUnicode(item.incorrect_answers[0]),
      wrong2: b64DecodeUnicode(item.incorrect_answers[1]),
      wrong3: b64DecodeUnicode(item.incorrect_answers[2]),
    };
  });
}

var secondsLeft = 300;

export function getSecondsLeft() {
  return localStorage.getItem("secondsLeft");
}

export function getGameWon() {
  return localStorage.getItem("gameWon");
}

async function timer() {
  while (!gameOver && secondsLeft > 0) {
    let timeString = convertTimeToString(--secondsLeft);
    setTimerValue(timeString);
    await sleep(1000);
  }
  localStorage.setItem("secondsLeft", secondsLeft);
  if (secondsLeft <= 0) {
    timeOut();
  }
}
