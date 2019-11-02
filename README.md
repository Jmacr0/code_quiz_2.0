# Code Quiz

The is a quiz style game that asks the user a set of coding related questions.

Each questions displays multiple options, and awaits the user to select one.

The user continues to make selections until all the questions have been answered, or if time runs out.

The score is determined based on the time remaining.

Application stores the user name and score on local storage, if they are have the highest score.

The application uses bootstrap for styling and Javascript for DOM manipulation to change the webpage without reload.


### Live Version: 

https://jmacr0.github.io/code_quiz_2.0/


### It is a time based game that ends if one of two conditions are met:

* The set times lapses to zero

* The user answers all questions

### Outcomes:

* *If the user answers all questions before the time lapses, then the remaining time is used as the users score.*

* *If there is no high score stored on local storage, then the user can save their score.*

* *If the users score is high than the score stored on local storage, user can save their score and replace the current high score.*

* *If the users score is lower than the score stored on local storage, user cannot save their score.*