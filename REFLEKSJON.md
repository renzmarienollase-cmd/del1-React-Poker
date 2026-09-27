## Lobby

The Lobby page contains a create player feature and displays a list of players created. The list contains a button that navigates to the actual game. I thought about making this a navigation link at first, but it made more sense for it to be a button as it then creates information about which player is playing instead of just navigating on to the game page.

## Proper HTML Structure

When building the Payout Table, I encountered an Error from React regarding possible "hydration issues". This issue came from incorrect HTML structure of the <table> element. Read up on HTML documentation to correct the structure.

## Box-Sizing Border Box

The box-sizing border box does not seem to be working as borders on hover still add extra pixels.

## Dark Theme

The toggle was inspired by this video: https://www.youtube.com/watch?v=Uz35Qiia84g&t=182s
However, I used Zustand to store and set the theme.
