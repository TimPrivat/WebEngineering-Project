var previouslyAsked = [];
function askTextQuestion() {
  document.getElementById("buttonContainer").removeAttribute("onclick");


  if(!checkQuestionsLeft()){
    return
  }
  let question = getRandomTextQuestion();
  questionText = question.question;
  console.log(questionText);
  assignButtonAnswers(question);
  resetButtonColor();
  document.getElementById("questionContainer").innerText = questionText;
}

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function assignButtonAnswers(question) {
  buttons = Array.from(document.getElementsByClassName("answerButton"));
  console.log(buttons);

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
    win()
    return false;
  }
  return true
}

function removeClickListener() {
  if (previouslyAsked.length >= 1) {
    buttons.forEach((button) => {
      button.removeEventListener("click", resolveQuestion);
      button.removeEventListener("click", askTextQuestion);
    });
  }
}

function resetButtonColor(){
  buttons.forEach((button) => {
    button.style.background="white";
  });
}

function resolveQuestion(event) {
  removeClickListener();
  if (event.target.innerText == buttons[0].innerText) {
    correctAnswer();
  } else {
    wrongAnswer();
  }
  buttons[0].style.background="#22d10f";
  buttons[1].style.background="#a62942";
  buttons[2].style.background="#a62942";
  buttons[3].style.background="#a62942";
}

function correctAnswer() {
  document.getElementById("questionContainer").innerText =
    "Correct: You Win 1 Point";
  console.log("correctAnswer");
  // Change to "nextQuestionListener"
  buttons.forEach((button) => {
    button.addEventListener("click", askTextQuestion);
  });

  colorRewardTable()
  if(previouslyAsked.length==12){
    win()
  }
}

function wrongAnswer() {
  document.getElementById("questionContainer").innerText = "Wrong: You Lose";
  console.log("wrongAnswer");
}

function win(){
  document.getElementById("questionContainer").innerText =
      "There are no more Questions: You Win!";
    removeClickListener();
  console.log("WIN")
}

function getRandomTextQuestion() {
  randomIndex = Math.floor(Math.random() * allQuestions.length);
  question = allQuestions[randomIndex];

  if (previouslyAsked.includes(question)) {
    return getRandomTextQuestion();
  }
  previouslyAsked.push(question);
  console.log(question);
  return question;
}

function colorRewardTable(){
    // Color Rewardsection
  //https://www.w3schools.com/jsref/coll_table_rows.asp
  rowIndex=12-(previouslyAsked.length-2)
  rewardTableElem = document.getElementById("rewardTable").rows[rowIndex].cells[0].querySelector("p")
  rewardTableElem.style.background="green"
}


//Window Operations
windowBuilt=false;
function buildReward(){
  fetchQuestions()
  console.log("buildReward")
  if (windowBuilt) {
    return;
  }
  windowBuilt=true;
  startPrize=1000000;
  rewardTableElem= document.getElementById("rewardTable")
   rewardTableElem.innerHTML="<th>Price</th>"
  rewardTableElem.innerHTML+="<tr>"
  margin=1

  for (let index = 0; index < 12; index++) {

    rewardTableElem.innerHTML += `<td> <p class="rewardBox" style="margin-right:${margin}%;margin-left:${margin}%"> ${startPrize} </p> </td>`;
    startPrize=startPrize/2;
    startPrize=Math.ceil(startPrize/500)*500
    margin+=3

  }
  rewardTableElem.innerHTML+="</tr>"
}

//util

// https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro

function parseStringToElement(elementType,htmlString){
  var element = document.createElement(elementType)
  element.innerHTML=htmlString
  return element
}



function fetchQuestions(){
  questionPromise=fetch("resources\\question.d\\questions.json")
  questionPromise.then(response => response.json()).then(questions => {allQuestions=questions;console.log(allQuestions)})
  
}

