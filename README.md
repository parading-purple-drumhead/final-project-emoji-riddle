# Emoji Riddle with Friends
[GitHub Repo Link](https://github.com/eleon23/final-project-emoji-riddle)
## Team
1. Eric Leon (eleon23@uic.edu)
2. Sudhanshu Basu Roy (sbasur2@uic.edu)
3. Mridvika Suresh (msures3@uic.edu)

# Checkpoint 2
-----------------
### [Deployed Website Link](https://brilliant-creponne-cdcbb0.netlify.app/](https://emoji-riddle-with-friends.netlify.app/)

### MVP Deliverables:
The main goal for our MVP at the end of checkpoint 2 is for our application to be able to host multiple users in a lobby. We were thinking of 6 players max and have them be able to communicate emoji riddles to each other. A timer and point system will not be integrated for this deliverable. We also aim to have data being safely and securely being saved for each individual user. Finally, our last goal is to establish basic game functionality. So in short our goals:
1. Host multiple players in a lobby
2. Store game data securely
3. Establish basic game functionality

User Flow:
<img width="1007" alt="image" src="https://github.com/eleon23/final-project-emoji-riddle/assets/77844841/c5fd16d5-aa2a-4e72-a86f-9f87a4ea4935">

### What does your application do?
When the user opens the application, they have to sign in using Google SSO. They are given the option to create a new game or join an existing game. Host/Non-Host are automatically detected based on option selected. When all users join the game, the admin user (host) needs to press start game to begin.
Gameplay: When it's your turn, you pick a phrase from the list of phrases and input emojis that best describe the phrase. The other participants have to try to guess the original phrase from the emojis picked by you. Once the user guesses correctly, feedback is shown in the chat and the round can be ended to start the next turn. The number of rounds will correspond to the number of players. Currently, we're not playing with a timer and we aren't keeping score, this functionality will be added for the final deliverable. Other functionality we will add to the final deliverable is option to delete the selected emojis, creating a link for other users to join a game, fixing security issues, and improving aesthetics of the application. 


# Checkpoint 1
-----------------
### What makes it different than a CRUD app? I.e., what functionality does it provide that is not just a user interface layer on top of a database of user information,and the ability to view / add to / change that information?

The main difference that we added here is the ability to connect with multiple players and play with them in real-time. The ability to encrypt messages with emojis and send it out to other players to decrypt them.

### What security and privacy concerns do you expect you (as developers) or your users to have with this application?

The main security we were thinking about was how we would securely communicate with multiple players in a game. We were also wondering how we would encrypt messages properly without others seeing it. Finally, how we would store user information/logins properly.

### This repository

This repository has a package.json that functions as a blank shell that gets full credit if you turn it in to the gradescope autograder. We will not be using the autograder in any way to actually evaluate your project, it is just there to keep track of your initial submission.

We recommend that you use this repository for your final project code. This will allow you to ask questions on Piazza and get help from the TAs and instructors. Adding a real linter, type checker, etc, based on our other examples would be a good idea.
