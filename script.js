//declare all my variables with jQuery selectors
var highScores = $('#high-scores')
var backButton = $('#return')
var displayTime = $('#display-time')
var main = $('#main')
var startButton = $('#start-button')
var submitButton = $('#submit-button')
var correct = $('#correct')
var wrong = $('#wrong')
var score = $('#score')
var message = $('#message')
var scoreSpan = $('#score-span')
var username = $('#username')
var question = document.querySelector('#question').children[0]
var options = document.querySelector('#options').children[0]

//object used to save user information
var user = {
    player: $.trim(username.val()),
    playerScore: parseInt(scoreSpan.html()),

};

//start the quiz
startQuiz();

//function used to reset all displays
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
    message.hide()
}

//function that displays the start of quiz
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

//variable used to access questions array - is incremented as questions are answered
var questionSelector = 0;

//array of objects containing information for each question
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

//global variable used to set interval and clear interval
var counter;

//timer object with start and count methods
var timer = {
    //time key used as counter which methods can access
    time: 0,

    //method to set timer length and start quiz
    start: function () {
        clearInterval(counter)
        timer.time = questions.length * 10;
        displayTime.show()
        displayTime.html(timer.time)
        startButton.hide();
        displayQuestions();
        counter = setInterval(timer.count, 1000);
    },
    //method to increment down every 1000ms
    count: function () {
        timer.time--
        displayTime.html(timer.time)
        //if counter runs out of time
        if (timer.time <= 0) {
            clearInterval(counter);
            timer.time = 0;
            displayTime.html(timer.time);
            noTime();
        } else {
            displayQuestions();
        }
    },

}
//event listener on start quiz button
startButton.on('click', timer.start);

//function used to display the questions using questionSelector var to access each object
function displayQuestions() {
    console.log(questionSelector)
    console.log(questions.length)
    //checks if all questions have been answered
    if (questionSelector === questions.length) {
        clearInterval(counter);
        displayTime.html(timer.time);
        //display final score page
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

//event listener on UL parent container of all LI options
options.addEventListener('click', checkSelection)

//function to evaluate the users selection
function checkSelection() {
    event.preventDefault();
    correct.hide()
    wrong.hide()

    //if correct, show correct message, increment questionSelector and display question
    if (event.target.textContent === questions[questionSelector]['answer']) {
        correct.html('Correct!')
        correct.show()
        questionSelector++
        displayQuestions()
    }
    //if wrong minus time
    else if (event.target.textContent !== questions[questionSelector]['answer']) {
        timer.time -= 5
        //to show updated score immediately instead of waiting for counter
        displayTime.html(timer.time);

        //if time penalty decrease time to 0 or less, then display noTime message
        if (timer.time < 0) {
            //clear interval as game over
            clearInterval(counter)
            wrong.html('Wrong!')
            wrong.show()
            setTimeout(() => {
                wrong.hide()
            }, 2000);
            noTime();

        } else {
            //if wrong but still have time remaining then display wrong message
            wrong.html('Wrong!')
            wrong.show()

        }
        //increment questionSelector and then display question to show the next question
        questionSelector++
        displayQuestions();

    }

}

//function called if no time remaining
function noTime() {
    displayReset();
    wrong.html('Ran Out of Time!')
    wrong.show()
    timer.time = 0
    displayTime.html(timer.time)
    //show final score page after displaying no time message
    finalScore();
}

//function to display finalScore
function finalScore() {
    //if final question correct or wrong, hide after 2 seconds
    setTimeout(() => {
        correct.hide()
    }, 2000);
    setTimeout(() => {
        wrong.hide()
    }, 2000);
    //set user variable score to the timer.time value    
    user.playerScore = timer.time

    //display final score
    main.hide()
    highScores.show()
    displayTime.show()
    //check if no score in localStorage OR if the player score is higher than the localStorage score (current high score)
    if (JSON.parse(localStorage.getItem('user')) === null || user.playerScore > JSON.parse(localStorage.getItem('user')).playerScore) {
        //show username input and submit button
        submitButton.show()
        username.show()
        score.show()
        score.html('Final Score : ' + '<span id="score-span">' + timer.time + '</span>')
    }
    //if player did not beat the localStorage store (current high score), then only display message and call startQuiz afterwards
    else if (user.playerScore < JSON.parse(localStorage.getItem('user')).playerScore) {
        setTimeout(() => {
            message.show()
            message.html('Sorry you have not beaten the High-Score')
        }, 2000);
        setTimeout(() => {
            startQuiz();
        }, 3500);
    }
}

//event listener on submit button (to submit high score)
submitButton.on('click', saveScore)

//function to save the score to localStorage
function saveScore() {
    event.preventDefault();
    //set the input of user to the user object
    user.player = $.trim(username.val())

    //check if input is blank
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
        //after score saved display startQuiz
        setTimeout(() => {
            displayReset();
            startQuiz();
        }, 2000);
    }

}

//event listener on the high scores button
highScores.on('click', displayScores);

//function to display the current high score stored on localStorage
function displayScores() {
    clearInterval(counter);
    displayReset();
    highScores.hide();
    backButton.show()
    score.show()

    score.html(JSON.parse(localStorage.getItem('user')).player + ' : ' + JSON.parse(localStorage.getItem('user')).playerScore)
}

//event listener on back button that calls the startQuiz
backButton.on('click', displayReset)
backButton.on('click', startQuiz)