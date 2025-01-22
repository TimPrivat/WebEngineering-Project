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

export { sayHello, shuffleArray, parseStringToElement };
