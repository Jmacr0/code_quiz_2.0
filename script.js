var highScores = $('#high-scores')
var backButton = $('#return')
var displayTime = $('#display-time')
var main = $('#main')
var startButton = $('#start-button')
var submitButton = $('#submit-button')
var correct = $('#correct')
var wrong = $('#wrong')
var score = $('#score')
var scoreSpan = $('#score-span')
var username = $('#username')
var question = document.querySelector('#question').children[0]
var options = document.querySelector('#options').children[0]

var user = {
    player: $.trim(username.val()),
    playerScore: parseInt(scoreSpan.html()),

};

//on document load call start quiz
startQuiz();



function displayReset() {
    //reset all displays
    console.log('display reset')
    highScores.hide();
    backButton.hide();
    displayTime.hide();
    main.hide();
    startButton.hide();
    submitButton.hide();
    correct.hide()
    wrong.hide()
    score.hide()
    username.hide()
}

function startQuiz() {
    displayReset();
    clearInterval(counter);
    questionSelector = 0;
    //display start quiz button
    console.log('start quiz')
    startButton.show();
    //display highscores tab
    highScores.show();
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
        displayTime.show()
        displayTime.html(timer.time)
        startButton.hide();
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
            noTime();
        } else {
            displayQuestions();
        }
    },


    //set interval

    //start time equals number of questions * 10

    //clear interval when time up

    //clear interval when no more questions
}

startButton.on('click', timer.start);

function displayQuestions() {
    console.log(questionSelector)
    console.log(questions.length)
    if (questionSelector === questions.length) {
        clearInterval(counter);
        displayTime.html(timer.time);            
        finalScore();
    } else {
        main.show()
        //display the question
        question.innerHTML = questions[questionSelector]['title']
        //display options
        options.children[0].innerHTML = questions[questionSelector]['choices'][0]
        options.children[1].innerHTML = questions[questionSelector]['choices'][1]
        options.children[2].innerHTML = questions[questionSelector]['choices'][2]
        options.children[3].innerHTML = questions[questionSelector]['choices'][3]
    }
}


options.addEventListener('click', checkSelection)

function checkSelection() {
    event.preventDefault();
    correct.hide()
    wrong.hide()   


    //if correct display question
    if (event.target.textContent === questions[questionSelector]['answer']) {
        correct.html('Correct!')
        correct.show()
        questionSelector++
        displayQuestions()
    }
    //if wrong minus time display question
    else if (event.target.textContent !== questions[questionSelector]['answer']) {
        timer.time -= 5
        //to show updated score immediately
        displayTime.html(timer.time);

        //instantly change to no time message
        if (timer.time < 0) {
            clearInterval(counter)
            wrong.html('Wrong!')
            wrong.show()
            setTimeout(() => {
                wrong.hide()
            }, 2000);
            noTime();

        } else {
            //to show updated score immediately
            wrong.html('Wrong!')
            wrong.show()

        }
        questionSelector++
        displayQuestions();

    }

    //this if is to change the questions instantly upon click. counter does the same thing but only at 1000ms intervals - actually removed the one in counter, only evaluate length here (less double up)

}

function noTime() {
    displayReset();
    wrong.html('Ran Out of Time!')
    wrong.show()
    timer.time = 0
    displayTime.html(timer.time)
    finalScore();
}


function finalScore() {
    //if final question correct, hide after 2 seconds
    setTimeout(() => {
        correct.hide()
    }, 2000);
    setTimeout(() => {
        wrong.hide()
    }, 2000);
    //set user variable object values    
    user.playerScore = timer.time
    console.log(user.playerScore)
    //display final score
    main.hide()
    highScores.show()
    displayTime.show()
    if (JSON.parse(localStorage.getItem('user')) === null || user.playerScore > JSON.parse(localStorage.getItem('user')).playerScore) {
        //show username input and submit button
        submitButton.show()
        username.show()
        score.show()
        score.html('Final Score : ' + '<span id="score-span">' + timer.time + '</span>')
    }
    else if (user.playerScore < JSON.parse(localStorage.getItem('user')).playerScore) {
        wrong.show()
        setTimeout(() => {
            wrong.html('Sorry you have not beaten the High-Score')
        }, 1500);
        setTimeout(() => {
            startQuiz();
        }, 3000);
    }
}

submitButton.on('click', saveScore)

function saveScore() {
    event.preventDefault();
    //save user and score if no current score
    user.player = $.trim(username.val())

    if (user.player === "") {
        correct.hide()
        wrong.show()
        wrong.html("Name cannot be blank!")
        return;
    } else {
        //set user in local storage as highest scorer
        localStorage.setItem("user", JSON.stringify(user))
        score.hide()
        username.hide()
        submitButton.hide()
        wrong.hide()
        correct.show()
        correct.html("Score saved!")
        setTimeout(() => {
            displayReset();
            startQuiz();
        }, 2000);
    }

    //check if no high score saved to local storage

    //check if player score is higher than current high score

    //else if lower then display didnt win
}


highScores.on('click', displayScores);

function displayScores() {
    clearInterval(counter);
    displayReset();
    highScores.hide();
    backButton.show()
    score.show()

    score.html(JSON.parse(localStorage.getItem('user')).player + ' : ' + JSON.parse(localStorage.getItem('user')).playerScore)
}


backButton.on('click', displayReset)
backButton.on('click', startQuiz)