# ONE MORE TIME 06/10/2026

## useEffect or no useEffect? That is the question.

Dealing with delayed dealCount lead to bugs on determining when the game was over.
Code online said to use useEffect, but reading documentation made me realize that probably wasn't the best case.
Fix: Simplifying the logic with nextDeal and determining the game was over through this count.

## Do I really need a hook? Or will simple logic work?

The biggest hurdle of this project for me was assuming that everything needed to be managed through useState. This lead to unnecessary state management and confusing myself on which states actions needed to be tied to/components should be re-rendered.

## Mobile vs Desktop

On my previous projects, I only thought about preventing defaults such as keydown to prevent dismissal of a dialog. However, I realized, that on mobile, users don't necessarily do a keydown. They could simply tap outside of the modal or swipe. This made me realize that I should not only focus on keyboard and desktop focused events, but also events that can happen on a mobile browser.

#####################################

# THE GAME ON SUBMISSION 28/09/2026

Right now, the game can only be played for one round as the logic that handles the deal count and when to trigger the handleGameOver functions is flawed.

Given more time, I would find a more effective order of calling on functions so that the game can be played more than one round. A direction I think would be useful is creating a nextDeal state management that determines whether the next deal should deal the player new cards or whether to initiate game over and reset the game.

## Accessibility

The game satisfies accessibility requirements for contrast, hierarchy, and accessibility with a keyboard. However, I would have liked to test the game with a screenreader to ensure that there are no missing contexts in the game and the game has a clear structure even without visual cues.

I used Web Accessibility Evaluation Tool to check for accessibility. However, an additional accessibility checking tool like pa11y which we used last semester could be helpful.

## Store Management

I encountered the problem on one player's poker hand showing up on another player's "game." I also did not have the time to learn more about resetting to an initial state so I decided therefore, to create a Zustand store that saves a player's game in session storage. This way, the game can reset every time the window is closed. This seemed to be a good MVP solution for the lack of an initial state in Zustand.

## Game Over

The current game over solution relies on the okay button on the Game Over dialog. The button manually resets states by calling on "set" functions.

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
