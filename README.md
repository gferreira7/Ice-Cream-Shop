# Ice Cream Shop

[Click here to see deployed game](https://gferreira7.github.io/Ice-Cream-Shop/)

## Description
You run an a little shop and have to fulfil customer's orders in a given time.


## MVP
The main goal of the game is to achieve the highest score before the time run's out.
You get increasingly higher tips (combo) the more correct orders you submit.

The combo goes back to zero if you deliver the wrong order or if you get bitten by Francis, the mouse. Francis will also cost -10s of game time so try to jump over it! 

## Backlog
The original idea did not include ice-cream, but pizzas or burguers. The decision was made due to the short timelime for the project but I will come back to this and add more levels with different foods.


## Data structure

GameBoard Object
 - Where the canvas is created and updated
 - Keeps track of all possible game states, customer orders, location of the player in the different stations and all keys pressed.
 - Holds all current orders and all the loaded components in Arrays to be rendered or removed as the game progresses.


Classes

Component
- Defines the basic assets loaded on screen, includes all relevant properties like position and image and basic functions like render() and checkCollision()

Player 
- Extends Component to include inventory, movement and interaction with the other components to get items. 
- 3 different player states: idle, walking and jumping, animated via 9X3 spritesheet

Mouse
- Extends Component to include movement and interaction with the Player (bite function).

Order
- Describes an object for a single order, holds the timer and ingredients needed to fulfill.
- Decrement Time function to update the width of the progress rendered in the top menu


## States/States Transitions
Main Menu
- Start Game - starts a countdown to get ready and then renders the canvas
- Tutorial - Overview of the rules and Keys needed to play the game - added due to overwhelming popular demand! 
- High Scores - Shows the top 5 - stored locally in the cache

## Task

The purpose of this game is to deliver the correct orders (on time). To do that you need to:
1. Get a Cone from storage 
2. Choose which flavor to get from the Ice Cream Machine
3. Submit it to the Checkout Counter

Combo points added to Correct orders but also if delivered within x time elapsed, if the order starts flashing you lose the tips.

## Links

<!-- - [Trello Link](https://trello.com) -->
- [Slides Link](http://slides.com)
- [Github repository Link](https://github.com/gferreira7/overcooked.git)
- [Deployment Link](https://gferreira7.github.io/overcooked/)
