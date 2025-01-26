function sayHello() {
  console.log("Hello");
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro

function parseStringToElement(elementType, htmlString) {
  var element = document.createElement(elementType);
  element.innerHTML = htmlString;
  return element;
}

function convertTimeToString(timeInSeconds){
    let minutes=Math.floor(timeInSeconds / 60);
    let seconds=timeInSeconds%60
    seconds=(seconds<10)? "0"+seconds:seconds
    return "0"+minutes+":"+seconds

}

function sleep(timeInMillis) {
  return new Promise(resolve => setTimeout(resolve, timeInMillis));
}

export { sayHello, shuffleArray, parseStringToElement, convertTimeToString,sleep };
