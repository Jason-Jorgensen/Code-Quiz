let startButton = document.getElementById("start-button");
let landingContainer = document.getElementById("landing-container");
let quizContainer = document.getElementById("quiz-container");
let highScoreContainer= document.getElementById("highscore-container");
let timerDisplay = document.getElementById("seconds");
let buttonChoice = document.querySelectorAll(".btn1");
let clickResponse = document.getElementById("clickResponse");
var timer = 76;
var timerId;
var questionNumber = 0;


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


function startQuiz() {
    landingContainer.setAttribute("class","container d-none");
    quizContainer.setAttribute("class","container");
    startTime();
    startQuestions();
}

function startTime() {
    timerId = setInterval(function() {
        timer--;
        timerDisplay.textContent = timer;

    if (timer === 0) {
        clearInterval(timerId);
    }
    },1000);
}

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

function clearClickResponse(){
    setTimeout(function(){
        clickResponse.textContent = " ";
    },1000);    
}

function startQuestionsTimeout(){
    setTimeout(function(){
        startQuestions();
    },1000);
}

function checkChoice() {
    var buttonSelected = this.getAttribute("id"); 
    checkChoice2(buttonSelected);
    questionNumber++;

    if(questionNumber <= questions.length - 1){
        startQuestionsTimeout();
    }
    else{
        endQuiz();
        clearInterval(timer)
    }

}

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
            endQuiz();
        }
}
}



    // timerId = setInterval(,1000)
    // timerDisplay.textContent = timer;
    
    // for (let i = timer; i>0; i--) {
    //     setInterval(function() {
    //     timerDisplay.textContent = i;
    //     }
    // }
    


 
startButton.onclick = startQuiz;
