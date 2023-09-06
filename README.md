# Emoji Riddle with Friends

# Team
1. Eric Leon (eleon23@uic.edu)
2. Sudhanshu Basu Roy (sbasur2@uic.edu)
3. Mridvika Suresh (msures3@uic.edu)
 

# [Your GitHub repository link goes here](https://github.com/eleon23/final-project-emoji-riddle)

## What does your application do?
# Initial thoughts
When the user opens the application, they have to sign in and create a new game with the number of players they want to play the game. Then the user sends a link to the game to their friends to join the game. When all users join the game, the admin user needs to press start to begin. 
Gameplay: When the user enters a sentence, the API converts the words of that sentence to an emoji if it’s possible (https://funtranslations.com/api/emoji). If not, the user is prompted to generate a new sentence. Alternatively, the user can insert their own emojis in a sentence if they want to use that emoji in the sentence. After the emoji-encoded message is sent, the other users need to guess the original sentence in a specific time period (30 seconds or so). The player whose turn it is can select the correct answer after the timer runs out and points will be awarded to the player that got it right. The number of rounds will correspond to the number of players (or we can do like double the number of rounds for the number of participants). 
At the end of the game, the scoreboard is displayed with the option to start a new game or quit (logout).

## What makes it different than a CRUD app? I.e., what functionality does it provide that is not just a user interface layer on top of a database of user information,and the ability to view / add to / change that information?
The main difference that we added here is the ability to connect with multiple players and play with them in real-time. The ability to encrypt messages with emojis and send it out to other players to decrypt them.

## What security and privacy concerns do you expect you (as developers) or your users to have with this application?
The main security we were thinking about was how we would securely communicate with multiple players in a game. We were also wondering how we would encrypt messages properly without others seeing it. Finally, how we would store user information/logins properly.


### This repository

This repository has a package.json that functions as a blank shell that gets full credit if you turn it in to the gradescope autograder. We will not be using the autograder in any way to actually evaluate your project, it is just there to keep track of your initial submission.

We recommend that you use this repository for your final project code. This will allow you to ask questions on Piazza and get help from the TAs and instructors. Adding a real linter, type checker, etc, based on our other examples would be a good idea.


