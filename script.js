var highScores = $('#high-scores')
var backButton = $('#return')
var displayTime = $('#display-time')
var main = $('#main')
var startButton = $('#start-button')
var submitButton = $('#submit-button')
var message = $('#message')
var score = $('#score')
var question = document.querySelector('#question').children[0]
var options = document.querySelector('#options').children[0]

//on document load call start quiz

$(document).ready(function () {
    displayReset();
    startQuiz();
    startButton.on('click', timer.start);
});

function displayReset() {
    //reset all displays
    console.log('display reset')
    highScores.attr('style', 'display: none');
    backButton.attr('style', 'display: none');
    displayTime.attr('style', 'display: none');
    main.attr('style', 'display: none');
    startButton.attr('style', 'display: none');
    submitButton.attr('style', 'display: none');
    message.attr('style', 'display: none')
    score.attr('style', 'display: none')
}

function startQuiz() {
    clearInterval(counter);
    questionSelector = 0;
    //display start quiz button
    console.log('start quiz')
    startButton.attr('style', 'display: block')
    //display highscores tab
    highScores.attr('style', 'display: block')
}

var questionSelector = 0;

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "The DOM refers to:",
        choices: ["delegation of macs", "directive object model", "document object model", "differing on management"],
        answer: "document object model"
    },
    {
        title: "An array variable is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "square brackets"
    },
    ///etc.
];


var counter;

var timer = {
    time: 0,

    start: function () {
        clearInterval(counter)
        timer.time = questions.length * 10;
        displayTime.attr('style', 'display: block');
        displayTime.html(timer.time)
        startButton.attr('style', 'display: none');
        displayQuestions();
        counter = setInterval(timer.count, 1000);
    },

    count: function () {
        timer.time--
        displayTime.html(timer.time)
        if (timer.time <= 0) {
            clearInterval(counter);
            timer.time = 0;
            displayTime.html(timer.time);
            finalScore();
        }  else {
            displayQuestions();
        }
    },


    //set interval

    //start time equals number of questions * 10

    //clear interval when time up

    //clear interval when no more questions
}



function endCheck() {
    //if time over
    console.log('hi')

    //if all questions asked
}


function displayQuestions() {
    main.attr('style', 'display: block');
    //display the question
    question.innerHTML = questions[questionSelector]['title']
    //display options
    options.children[0].innerHTML = questions[questionSelector]['choices'][0]
    options.children[1].innerHTML = questions[questionSelector]['choices'][1]
    options.children[2].innerHTML = questions[questionSelector]['choices'][2]
    options.children[3].innerHTML = questions[questionSelector]['choices'][3]
}


options.addEventListener('click', checkSelection)

function checkSelection() {
    event.preventDefault();
    message.removeClass('alert-success alert-danger')
    message.attr('style', 'display: block');
    
    //if correct display question
    if (event.target.textContent === questions[questionSelector]['answer']) {
        message.addClass('alert-success')
        message.html('correct')
        setTimeout(() => {
            message.attr('style', 'display: none');
        }, 1500);
        
    }
    //if wrong minus time display question
    else {
        timer.time -= 5
        //to show updated score immediately
        displayTime.html(timer.time);
        message.addClass('alert-danger')
        message.html('wrong')
        setTimeout(() => {
            message.attr('style', 'display: none');
        }, 1500);
        
    }
    questionSelector++
    //this if is to change the questions instantly upon click. counter does the same thing but only at 1000ms intervals - actually removed the one in counter, only evaluate length here (less double up)
    if(questionSelector === questions.length){
        clearInterval(counter);
        displayTime.html(timer.time);
        finalScore();
    } else {
    displayQuestions();
    }
}

function finalScore() {
    //display final score
    displayReset();
    highScores.attr('style', 'display: block');
    displayTime.attr('style', 'display: block');
    submitButton.attr('style', 'display: block');
    message.attr('style', 'display: block');
    score.attr('style', 'display: block');

    score.html('Final Score: ' + timer.time)
}

function saveScore() {
    //save user and score
}


highScores.on('click', displayScores);

function displayScores() {
    clearInterval(counter);
    displayReset();
    highScores.attr('style', 'display: none');
    backButton.attr('style', 'display: block');
    score.attr('style', 'display: block');

    score.html('Highest Score! : ')
}


backButton.on('click', displayReset)
backButton.on('click', startQuiz)