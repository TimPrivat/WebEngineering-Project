var difficulty;
var playerName;

export function fetchSessionSettings(){
    console.log("fetchSessionSettings")
    let allDifficulties=Array.from(document.getElementsByClassName("radioSelector"))
    let checkedButton=allDifficulties
    .filter(button => button.checked)
    .map(button => button.value)

    difficulty=checkedButton[0]

    console.log("Difficulty: "+difficulty)


    playerName =document.getElementById("playerName").value
    console.log("playerName: "+playerName)


    localStorage.setItem("difficulty",difficulty)
    localStorage.setItem("playerName",playerName)

}

export function getPlayerName(){
    return localStorage.getItem("playerName");
}
export function getDifficulty(){
    return localStorage.getItem("difficulty")
}


