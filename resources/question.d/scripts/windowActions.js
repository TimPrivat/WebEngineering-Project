import {
  gameRun,
  askTextQuestion,
  previouslyAsked,
  buttons,
  resolveQuestion,
} from "./gameLogic.js";
import { runFiftyFifty,runPhone,runOracle } from "./jokerLogic.js";

var windowLoaded = false;
export function onWindowLoad() {
  console.log("onWindowLoad");

  if (!windowLoaded) {
    onFirstWindowLoad();
    windowLoaded = true;
  }
}

function onFirstWindowLoad() {
  buildReward();
  gameRun();
  }

export function addJokerClickListener() {
  console.log("addJokerClickListener")
  let fiftyfifty = getFiftyFiftyJoker();
  let phone = getPhoneJoker();
  let oracle=getOracleJoker()

  fiftyfifty.addEventListener("click", runFiftyFifty);
  phone.addEventListener("click", runPhone);
  oracle.addEventListener("click",runOracle)
}

function removeClickListener() {
  if (previouslyAsked.length >= 1) {
    buttons.forEach((button) => {
      button.removeEventListener("click", resolveQuestion);
      button.removeEventListener("click", askTextQuestion);
    });
  }
}

function colorButtons() {
  buttons[0].style.background = "#22d10f";
  buttons[1].style.background = "#a62942";
  buttons[2].style.background = "#a62942";
  buttons[3].style.background = "#a62942";
}

function resetButtonColor() {
  buttons.forEach((button) => {
    button.style.background = "white";
  });
}
function buildReward() {
  console.log("buildReward");

  let buttonContainer = getButtonContainer();
  let startPrize =1000000000;
  let margin = 1;
  let rewardTableElem = document.getElementById("rewardTable");

  buttonContainer.addEventListener("click", askTextQuestion);
  rewardTableElem.innerHTML = "";
  rewardTableElem.innerHTML += "<tr>";

  for (let index = 0; index < 12; index++) {
    rewardTableElem.innerHTML += `<td> <p class="rewardBox roundedBorders" style="margin-right:${margin}%;margin-left:${margin}%"> ${startPrize} </p> </td>`;
    startPrize = startPrize / 2;
    startPrize = Math.ceil(startPrize / 500000) * 500000;
    margin += 3;
  }
  rewardTableElem.innerHTML += "</tr>";
}

// Color Rewardsection
//https://www.w3schools.com/jsref/coll_table_rows.asp
function colorRewardTable() {
  let rowIndex = 12 - (previouslyAsked.length - 1);
  console.log(rowIndex)
  console.log(document.getElementById("rewardTable").rows[rowIndex])
  let rewardTableElem = document
    .getElementById("rewardTable")
    .rows[rowIndex].cells[0].querySelector("p");
  rewardTableElem.style.background = "green";
}

function getAnswerButtons() {
  return Array.from(document.getElementsByClassName("answerButton"));
}

function getButtonContainer() {
  return document.getElementById("buttonContainer");
}
function getQuestionContainer() {
  console.log("getQuestionContainer");
  return document.getElementById("questionContainer");
}

function getFiftyFiftyJoker() {
  console.log("getFiftyFiftyJoker");
  return document.getElementById("50/50")
}

function getPhoneJoker() {
  console.log("getPhoneJoker");
  return document.getElementById("telephone")
}

function disableElement(elem){
  elem.setAttribute("disabled",true)
  elem.style.background = "grey"
  elem.style.pointerEvents = "none";
}

function enableElement(elem){
  elem.removeAttribute("disabled")
  elem.style.background = "initial"
  elem.style.pointerEvents = "auto";
}

function get5050cross(){
  console.log("get5050cross")
  return document.getElementById("5050cross")
}
function getTelephoneCross(){
  console.log("telephoneCross")
  return document.getElementById("telephoneCross")
}
function getOracleJoker(){
  console.log("getOracleJoker")
  return document.getElementById("oracle")
}

function getOracleCross(){
  console.log("getOracleCross")
  return document.getElementById("oracleCross")
}

// https://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window
function openURLinNewTab(url){
  window.open(url, '_blank').focus();
}

function setTimerValue(value){
  document.getElementById("timer").innerText=value
}




export {
  removeClickListener,
  resetButtonColor,
  colorRewardTable,
  getAnswerButtons,
  getButtonContainer,
  buildReward,
  getQuestionContainer,
  colorButtons,
  disableElement,
  enableElement,
  getFiftyFiftyJoker,
  get5050cross,
  getTelephoneCross,
  getPhoneJoker,
  openURLinNewTab,
  getOracleCross,
  getOracleJoker,
  setTimerValue
};
