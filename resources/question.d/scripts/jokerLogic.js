import { buttons } from "./gameLogic.js";
import { disableElement,get5050cross,getFiftyFiftyJoker } from "./windowActions.js";


function runFiftyFifty(){
    console.log("runFiftyFifty")
    disableElement(buttons[1])
    disableElement(buttons[2])
    get5050cross().style.display = 'block';
    getFiftyFiftyJoker().removeEventListener("click",runFiftyFifty)


}

function runPhone(){
    console.log("runPhone")


}

export {
    runFiftyFifty,
    runPhone
}