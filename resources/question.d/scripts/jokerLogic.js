import { buttons } from "./gameLogic.js";
import { disableElement,get5050cross,getFiftyFiftyJoker,getQuestionContainer,telephoneCross,getPhoneJoker } from "./windowActions.js";


function runFiftyFifty(){
    console.log("runFiftyFifty")
    disableElement(buttons[1])
    disableElement(buttons[2])
    get5050cross().hidden=false;
    getFiftyFiftyJoker().removeEventListener("click",runFiftyFifty)


}

function runPhone(){
    console.log("runPhone")
    let questionContainer =getQuestionContainer()
    questionContainer.innerHTML='<img id="einstein" alt="einstein" style="height:70%;width:80%;" src="resources/question.d/images/einstein.png">'
    questionContainer.innerHTML+=`The answer is: ${buttons[0].innerText}`
    telephoneCross().hidden=false;
    getPhoneJoker().removeEventListener("click",runPhone)

}

export {
    runFiftyFifty,
    runPhone
}