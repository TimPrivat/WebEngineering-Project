import { gameRun,askTextQuestion,previouslyAsked,buttons,resolveQuestion } from "./gameLogic.js";


var windowLoaded = false;
export function onWindowLoad() {
  console.log("onWindowLoad");

  if (!windowLoaded) {
    onFirstWindowLoad();
    windowLoaded = true;
  }


}

function onFirstWindowLoad() {
    buildReward()
    gameRun();

}

function removeClickListener() {
  if (previouslyAsked.length >= 1) {
    buttons.forEach((button) => {
      button.removeEventListener("click", resolveQuestion);
      button.removeEventListener("click", askTextQuestion);
    });
  }
}

function resetButtonColor() {
  buttons.forEach((button) => {
    button.style.background = "white";
  });
}
function buildReward() {
  console.log("buildReward");

  let buttonContainer = getButtonContainer();
  let startPrize = 1000000;
  let margin = 1;
  let rewardTableElem = document.getElementById("rewardTable");

  buttonContainer.addEventListener("click", askTextQuestion);
  rewardTableElem.innerHTML = "<th>Price</th>";
  rewardTableElem.innerHTML += "<tr>";

  for (let index = 0; index < 12; index++) {
    rewardTableElem.innerHTML += `<td> <p class="rewardBox" style="margin-right:${margin}%;margin-left:${margin}%"> ${startPrize} </p> </td>`;
    startPrize = startPrize / 2;
    startPrize = Math.ceil(startPrize / 500) * 500;
    margin += 3;
  }
  rewardTableElem.innerHTML += "</tr>";
}

// Color Rewardsection
//https://www.w3schools.com/jsref/coll_table_rows.asp
function colorRewardTable() {
  let rowIndex = 12 - (previouslyAsked.length - 2);
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
function getQuestionContainer(){
    console.log("getQuestionContainer")
    return document.getElementById("questionContainer");
}

export {
  removeClickListener,
  resetButtonColor,
  colorRewardTable,
  getAnswerButtons,
  getButtonContainer,
  buildReward,
  getQuestionContainer

};
