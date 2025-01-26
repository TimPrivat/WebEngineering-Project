import { buttons, currentQuestion } from "./gameLogic.js";
import {
  disableElement,
  get5050cross,
  getFiftyFiftyJoker,
  getQuestionContainer,
  getTelephoneCross,
  getPhoneJoker,
  openURLinNewTab,
  getOracleCross,
  getOracleJoker
} from "./windowActions.js";

function runFiftyFifty() {
  console.log("runFiftyFifty");
  disableElement(buttons[1]);
  disableElement(buttons[2]);
  get5050cross().hidden = false;
  getFiftyFiftyJoker().removeEventListener("click", runFiftyFifty);
}

function runPhone() {
  console.log("runPhone");
  let questionContainer = getQuestionContainer();
  questionContainer.innerHTML =
    '<img id="einstein" alt="einstein" style="height:70%;width:80%;" src="resources/question.d/images/einstein.png">';
  questionContainer.innerHTML += `The answer is: ${currentQuestion.correct}`;
  getTelephoneCross().hidden = false;
  getPhoneJoker().removeEventListener("click", runPhone);
}

function runOracle() {
  console.log("runOracle");
  let questionAsArray=currentQuestion.question.split(" ")
  let baseUrl="https://letmegooglethat.com/?q="
  let urlQuestion=questionAsArray.reduce((url,word) => url+word+"%20",baseUrl)
  console.log(urlQuestion);
  openURLinNewTab(urlQuestion)
  getOracleCross().hidden=false
  getOracleJoker().removeEventListener("click", runOracle);
}


export { runFiftyFifty, runPhone, runOracle };
