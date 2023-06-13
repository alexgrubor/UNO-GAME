# Fullstack UNO App

This is a UNO (the popular card game) fullstack application, designed to allow users to play the
game online with their friends or with other users around the world. The application consists of a
web-based front-end and a server-side back-end, allowing for real-time gameplay and communication.
Users can create accounts, join or host game rooms, and play UNO . The application is built using
the MERN stack and socket.io and aims to provide a smooth and enjoyable online UNO experience.
## LIVE VERSION: 
[PLAY HERE](https://uno-5dzs.onrender.com/#/)

## Installation

To run the application locally, clone the repository and run:

-   `cd Server`
-   `npm install`
-   `cd ../client`
-   `npm install`

After that you can run the development server for the client with: `npm run dev` and for the server
with `npm start`

## Git & Github Workflow

To work on new features make sure that you got the latest `dev` branch with `git pull origin dev`.
After that you should create a new branch which follows the following format:
`<name>-<feature-description>`. So for example `marvin-add-readme`.

Please make sure that you only work on one feature per branch and commit often.

After completing a feature run `git push origin <branch-name>` to push the new branch to Github. You
can then create a pull request to get your branch merged into the `dev` branch.

The `main` branch gets updated from the main branch at the end of each day.
