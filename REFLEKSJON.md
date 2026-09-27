# THE GAME ON SUBMISSION

Right now, the game can only play one round as the logic in handling the deal count and when to trigger the handleGameOver functions is flawed.

Given more time, I would find a more effective order of calling on functions so that the game can be played more than one round.

## Lobby

The Lobby page contains a create player feature and displays a list of players created. The list contains a button that navigates to the actual game. I thought about making this a navigation link at first, but it made more sense for it to be a button as it then creates information about which player is playing instead of just navigating on to the game page.

## Proper HTML Structure

When building the Payout Table, I encountered an Error from React regarding possible "hydration issues". This issue came from incorrect HTML structure of the <table> element. Read up on HTML documentation to correct the structure.

## Box-Sizing Border Box

The box-sizing border box does not seem to be working as borders on hover. Hover border still adds extra pixels.

## Dark Theme

The toggle was inspired by this video: https://www.youtube.com/watch?v=Uz35Qiia84g&t=182s

However, I used Zustand to store and set the theme.

## Dialog

Inspiration for this solution was Marek Bombera's article "How to use <dialog> in React — Easy Modals & Tooltips" (https://medium.com/@bomber.marek/how-to-use-dialog-in-react-easy-modals-tooltips-81e44d570c8a#c9ff)
