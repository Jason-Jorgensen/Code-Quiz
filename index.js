let startButton = document.getElementById("start-button");
let landingContainer = document.getElementById("landing-container");
let quizContainer = document.getElementById("quiz-container");
let highScoreContainer= document.getElementById("highscore-container");
let timerDisplay = document.getElementById("seconds");
let buttonChoice = document.querySelectorAll(".btn1");
let clickResponse = document.getElementById("clickResponse");
let enterHighScoreContainer = document.getElementById("enter-highscore-container");
let highScoresContainer = document.getElementById("highscores-container");
let postedScore = document.getElementById("posted-score");
let enteredName = document.querySelector(".enteredName");
let submitButton = document.getElementById("submit-button");
let clearButton = document.getElementById("clear-button");
let highScoreList = document.getElementById("highScoreList");
let backToQuiz = document.getElementById("back-button");
let viewHighScoreLinks = document.querySelector(".viewHighScoreLink");
var timer = 76;
var timerId;
var questionNumber = 0;
var scores = [];


//QUESTIONS
const questions = [
    {
        title: "Question 1: Which of these is a correct method to create a new array?",
        choice1:"var myArray = ( );",
        choice2:"var myArray = [ ];", 
        choice3:"var myArray = new Array[ ]",
        choice4:"var myArray = { };",
        answer: "choice-button2"
    },
    {
        title: "Question 2: Which of the following variable types does not exist in JavaScript?",
        choice1:"boolean",
        choice2:"number",
        choice3:"string",
        choice4:"double",
        answer: "choice-button4"
    },
    {
        title: "Question 3: Which of these operators compares two variables by value AND type?",
        choice1:"===",
        choice2:"None of these",
        choice3:"==",
        choice4:"=",
        answer: "choice-button3"
    },
    {
        title: "Question 4: How do you round the number 7.25, to the nearest whole number?",
        choice1:"Math.round(7.25)",
        choice2:"rnd(7.25)",
        choice3:"round(7.25)",
        choice4:"Math.rnd(7.25)",
        answer: "choice-button1"
    },
    {
        title: "Question 5: The var statement is used to:",
        choice1:"Create a new local variable",
        choice2:"Retrieve a variable descriptor",
        choice3:"Declare a member of a class",
        choice4:"Change a constant",
        answer: "choice-button1"
    },
    {
        title: "Question 6: What keyword is used to begin a conditional statement?",
        choice1:"when",
        choice2:"how",
        choice3:"if",
        choice4:"condition",
        answer: "choice-button3"
    },
]

// Click start to begin Quiz
function startQuiz() {
    landingContainer.setAttribute("class","container d-none");
    quizContainer.setAttribute("class","container");
    startTime();
    startQuestions();
}
// Timer function that starts the countdown
function startTime() {
    timerId = setInterval(function() {
        timer--;
        timerDisplay.textContent = timer;

    if (timer === 0) {
        clearInterval(timerId);
        endQuiz;
    }
    },1000);
}
// Adds the question and choices according to the Question number variable.
function startQuestions() {
    document.getElementById("question-header").innerHTML = questions[questionNumber].title;
    document.getElementById("choice-button1").innerHTML = questions[questionNumber].choice1;
    document.getElementById("choice-button2").innerHTML = questions[questionNumber].choice2;
    document.getElementById("choice-button3").innerHTML = questions[questionNumber].choice3;
    document.getElementById("choice-button4").innerHTML = questions[questionNumber].choice4;
}

for (let i=0; i < buttonChoice.length; i++) {
    buttonChoice[i].onclick = checkChoice;
}
//gives a one second timeout for correct or incorrect text when answer selected
function clearClickResponse(){
    setTimeout(function(){
        clickResponse.textContent = " ";
    },1000);    
}
//waits one second before showing the next question
function startQuestionsTimeout(){
    setTimeout(function(){
        startQuestions();
    },1000);
}
//gets the id of the selected button and sends it to checkChoice2.
function checkChoice() {
    var buttonSelected = this.getAttribute("id"); 
    checkChoice2(buttonSelected);
    questionNumber++;

    if(questionNumber <= questions.length - 1){
        startQuestionsTimeout();
        
    }
    else{
        endQuiz()
    }

}
//Checks to see if the selection is correct or not
function checkChoice2(buttonSelected){
    if (buttonSelected == questions[questionNumber].answer){
        clickResponse.textContent = "Correct!";
        clearClickResponse();

    }
    else {
        clickResponse.textContent = "Incorrect! You lost 10 Seconds.";
        clearClickResponse();

        if (timer>10){
            timer=timer-10;
        }
            
        else{
            timer=0;
            endQuiz();
            
        }
}
}
//Ends the quiz by hiding the quiz container and stopping the timer. Also shows the final score and add name user input
function endQuiz(){
    quizContainer.setAttribute("class", "container d-none");
    clearInterval(timerId);
    enterHighScoreContainer.setAttribute("class","container");
    postedScore.textContent = timer;
}
//Logs the score to local storage
function logHighScores(){
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores !== null) {
        scores = storedScores;
    }
    scores.push(timer + " - " + enteredName.value);
    localStorage.setItem("scores",JSON.stringify(scores));
}
//Renders the high Score by placing it in <p> tags in highscore order.
function pullHighScores(){
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores !== null) {
        scores = storedScores;
    }
    for (let index = 0; index<scores.length; index++){
        scores.sort();
        scores.reverse();
        var score = scores[index];
        var ul = document.createElement("p");
        ul.textContent = score;
        highScoreList.appendChild(ul);

    }
}
//calls the Log High Score and Pull High Score functions when submit button pressed.
function showScores() {
    logHighScores();
    enterHighScoreContainer.setAttribute("class","container d-none");
    highScoresContainer.setAttribute("class","container");
    pullHighScores();
}
//Clears the local storage and empties the HighScore List
function clearStorage(){
    localStorage.clear();
    highScoreList.textContent=" ";
}
//Refreshes the page when back to quiz button is selected.
function refreshPage() {
    window.location.reload();
}
//Hides all containers except for the HighScore Container and stops the clock if pressed during the quiz.
function viewHighScoreLink(){
    landingContainer.setAttribute("class","container d-none");
    quizContainer.setAttribute("class","container d-none");
    enterHighScoreContainer.setAttribute("class","container d-none");
    highScoresContainer.setAttribute("class","container");
    pullHighScores();
    clearInterval(timerId);
}
 
//Actions called when buttons are pressed.
viewHighScoreLinks.onclick = viewHighScoreLink;
backToQuiz.onclick = refreshPage;
clearButton.onclick = clearStorage;
submitButton.onclick = showScores;
startButton.onclick = startQuiz;
