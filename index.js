let startButton = document.getElementById("start-button");
let landingContainer = document.getElementById("landing-container");
let timerDisplay = document.getElementById("seconds");
var timer = 75;

function startQuiz() {
    // landingContainer.setAttribute("class","hide")
    landingContainer.style.display = landingContainer.style.display == 'none' ? 'display' : 'none';
    timerDisplay.textContent = timer;
    
    for (let i = timer; i>0; i--) {
        setTimeout(function() {
        timerDisplay.textContent = i;
        }
    }
    
}

startButton.onclick = startQuiz;