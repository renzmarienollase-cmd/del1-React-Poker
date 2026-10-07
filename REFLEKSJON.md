# ONE MORE TIME 07/10/2026

## Simplifying the problem instead of adding more complexity

One of the biggest realizations I had during this project was that I was making the solution more complicated than it needed to be.

Since we were learning a new framework and library, I mistakenly thought that every aspect of the solution had to be managed using concepts and tools within this new stack. This led me to introduce unnecessary state and hooks, which made it more difficult for me to understand how the different parts of the application were connected.

### Do I really need a hook? Or will simple logic work?

One example of this was dealing with a delayed `dealCount` and a `gameOver` state that I used as the point for rendering a game-over component. Managing these two states led to bugs when determining when to update the DOM.

Code I found online suggested using `useEffect`, but reading the React documentation made me realize that this probably wasn't the best use case for an effect. Since determining whether the game was over was based on a value I already had, I didn't need an effect to synchronize anything.

Instead, I simplified the logic by using a `nextDeal` count and determining whether the game was over through this. I realized that I didn't need to manage `gameOver` as its own piece of state. I could simply render the game-over component based on the `dealCount`. The game-over state was already represented by the deal count, so creating another state for it meant that I was managing two pieces of information when I really only needed one source of truth.

### Avoid the pitfalls of overcomplicating things

The biggest realization from this fix and refactor was that it's better to keep the code simple. There is probably a more sophisticated way of writing the code for this project that takes full advantage of the arsenal of tools in React and Zustand. However, increasing the amount of state that needed to be managed led to more confusion on my end.

I needed to take a step back and reduce the moving parts. Instead of asking myself, "What React tool should I use to solve this?" I started asking, "Do I actually need to add something here?" This helped me recognize when simple logic was enough and when I actually needed React's state management.

Still, I feel that I can keep exploring other options built into the framework as I keep learning.

### Extra Thoughts: Mobile vs. Desktop

On my previous projects, I mostly thought about preventing default behavior for desktop interactions, such as using `keydown` to prevent the dismissal of a dialog. However, I realized that on mobile, users don't necessarily interact with the application through a keyboard. They could simply tap outside of a modal or swipe.

This made me realize that I should not only focus on keyboard- and desktop-focused events, but also think about the different ways users can interact with a mobile browser.

### Extra, Extra Thoughts & A Confession: Navigation and state persistence

Another problem I ran into was how the game state was handled when navigating between players. Since the game state was being saved in session storage, navigating back to another player meant that the previous player's state could still be there. This caused one player to essentially inherit another player's cards and game state.

My first thought was to connect the state to the URL using a hash. I thought that having the active player's information in the URL would give each player their own state. However, because I was only changing the active player when the game store was created, this still led to other players "having" the previous player's cards. The state was still being shared even though the URL was different.

This approach did make me realize that storing state in the URL could be useful in situations where URLs need to be shared. However, it didn't solve the problem I was trying to solve in this project.

Instead, I decided to create a unique window for each player through the URL. I changed the `PlayButton` from a button into a link that navigates to a route containing the player's ID. This gave each player their own route and made the navigation more closely match how I wanted the game to work.

I also considered other approaches, such as creating a new store for every player, implementing an initial state, or creating a separate `player-session` state in the global store and partializing it so that it would not be saved to local storage. Another possibility would have been to manually reset the game to its initial state when the user navigated away from the game. However, I had a feeling that these approaches would require extra checks and extra code, such as checking for navigation events. This is something I still need to learn more about, but given the time constraints of the project, I decided to take a different approach.

Instead, I decided to take advantage of the impermanence of session storage. By using session storage, I could avoid having to implement a reset for the game state in local storage. The game state would automatically be cleared when the tab was closed. It wasn't necessarily the most sophisticated solution (and I can already imagine bugs that could come from this), but it solved the problem while keeping the implementation relatively simple.

This connected back to the bigger lesson I had been learning throughout the project: sometimes the better solution isn't the one that uses the most features or requires the most code, but the one that solves the problem with the fewest moving parts.

Confession: I was unsure about how to create multiple stores so I asked chatGPT and it pointed me to the Map object. I was aware of the map() method for arrays, but this is the first time I encountered this JS object.

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
