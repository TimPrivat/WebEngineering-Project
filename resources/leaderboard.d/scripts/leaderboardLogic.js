import {
  getDifficulty,
  getPlayerName,
} from "../../settings.d/scripts/settings.js";

import { getGameWon,getSecondsLeft } from "../../question.d/scripts/gameLogic.js";

import { convertTimeToString } from "../../util.js";

async function fetchLeaderboardDB() {
  console.log("fetchLeaderboardDB");
  let leaderBoardData = await fetch("../../../resources/leaderboard.json");
  let leaderBoardJSON = leaderBoardData.json();
  console.log(await leaderBoardJSON);
  return await leaderBoardJSON;
}

async function extractLeaderBoardData() {
  let fullLeaderboard = await fetchLeaderboardDB();
  let fullDataArray = Array.from(fullLeaderboard);
console.log(getSecondsLeft())
console.log(getGameWon())
    if(getGameWon()=="true"){
        console.log("GameWon")
        let playerEntry={
            "playerName": getPlayerName(),
            "difficulty": getDifficulty(),
            "time_left": getSecondsLeft()
        }
        fullDataArray.push(playerEntry)
    }


  let sortedLeaderboard = fullDataArray
    .filter((entry) => entry.difficulty == getDifficulty())
    .sort((entry1, entry2) => entry2.time_left - entry1.time_left);
  console.log(sortedLeaderboard);
  return sortedLeaderboard
}

async function insertLeaderboard() {
    let leaderboard= await extractLeaderBoardData()
    let leaderBoardElement = document.getElementById("leaderboard")

    //reset list
    leaderBoardElement.innerHTML=""

    leaderboard.forEach(entry => {


        leaderBoardElement.innerHTML+=`<li>${entry.playerName} ${convertTimeToString(300-entry.time_left)}min</li>`

    });

}

export function setupLeaderboardPage() {
  console.log("setupLeaderboardPage");
  setDifficulty();
  setPlayerName();
  insertLeaderboard()
}

function setDifficulty() {
  let importDifficulty = getDifficulty();
  console.log(importDifficulty);
  let difficultyDiv = document.getElementById("difficultyPresenter");
  let difficulty = importDifficulty == null ? "medium" : importDifficulty;

  difficultyDiv.innerText = `Difficulty: ${difficulty}`;
}

function setPlayerName() {
  let importPlayerName = getPlayerName();
  console.log(importPlayerName);
  let playerNameDiv = document.getElementById("namePresenter");
  let playerName =
    importPlayerName == null ? "StandardPlayerName" : importPlayerName;
  playerNameDiv.innerText = `Player: ${playerName}`;
}
