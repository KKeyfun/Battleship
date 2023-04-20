# Battleship

Project to recreate the classic battleship boardgame

## Goals
1 - Practice TDD, Jest will be used for testing

2 - Write code that's more flexible, currently have a habit of writing tightly coupled code

## Built Using
- HTML
- JavaScript
- CSS
- Webpack
- Jest
- Babel

## Thoughts
This was an interesting project to work on, and although I personally felt like I didn't quite achieve my second goal, I was able to learn a few things during the process:

**Currying**: With the way I had the game board set up, I ran into issues with adding event listeners and passing arguments with them, as they would automatically fire rather than fire when the event is triggered. The workarounds I found for this issue was to wrap the function with arguments in an anonymous function, use the  `bind()` method, or curry the function. I opted to curry the functions simply because I needed to remove the function later, and I thought it would be a good tool to have under my belt, and the best way to learn is it practice with it.

Currying the functions would do exactly what I wanted. However, this created another issue; the currying function returned a new function, and with how I've set up the game board, this was done in a loop. In order to remove the event listeners later, I would need to keep the function reference somewhere for each tile on the board. To solve this, I used an object to store the tile's coordinates as a key with the function as the property. This would allow me to store the function reference and remove the event listeners in a loop later.

<br>

**Event Delegation**: When looking at how I would get my event listeners set up, I found out about event delegation, and it was very interesting, but I ended up not using it because of how my event handlers were set up. Due to how events propagate (bubbling and capturing), I would be able to use a single event listener on my game board instead of adding event listeners to each tile on the game board. In the future I would love to revisit this, if I got this working properly for this project as an example, I wouldn't need an object with many function references.

<br>

**Testing**: Designing tests before writing the functions forced me to write code that was less tightly coupled. This was great, as I had to think in different ways when writing my functions. This also helped my realise my shortcomings with how I design my functions, as I struggled to figure out how I would write certain functionality while keeping my functions loosely coupled.

<br>

Despite my struggles, I still enjoyed what I was able to learn from this project. I'll be looking at improving how I design my functions, as I noticed that my functions tend to share the same arguments, and there was a lot of tramp data before I cleaned up my functions. Testing was also somewhat difficult due to how some functions interacted with the DOM, which was hard to test for. Additionally, I didn't like how I had set up the event listeners during the player's ship placement phase; it felt messy. If I were to revisit this project, the placement functions would be at the top of my list of code to clean up/change.


## Sources
Template for webpack built using https://createapp.dev/