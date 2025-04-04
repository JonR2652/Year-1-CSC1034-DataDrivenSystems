# game_backup
This is my 1st year contribution to my Web 
development / database module, CSC1034

The project is a group project for a Text Based 
Adventure game. The game is to have a database
through phpMyAdmin in SQL, which tracks data
such as player details, login/ registration,
individual player inventory, game save, 
items and achievements. Minigames are encouraged
throughout.

Each member has a section or room to design
and make. Our story is a Prison Break Story.
A rough flow of the game is;

Cell -> Cafeteria -> Cell (breaking out of the
cell) -> A hallway -> Courtyard / Exercise area
-> escape.

My aspect of the development was the 
Hallway and Inventory table in our database, in which
i added an additional room named "guardEncounter.html" 
for a minigame.

THE HALLWAY:
For the hallway, I decided to have an encounter
with the guard. This involves a three choice
system through interavtive buttons, each leading
to new choices. Some use the users judgement,
to hide from the guard, charm the guard
or to attack the guard.

Hiding from the guard is an easy straighforward
way through, whereas charming takes a little 
more thought.

Attacking the guard leads to a turn based minigame
I coded, in which you can attack, block or use
an item. Player Health and Guard Health is
displayed and updated throughout. I will touch more 
on the database aspect to the minigame
later on.

I implemented async functions in order to have a 
"delay()" function to have a short delay 
before updating text, for example;

"You attacked the guard!"
"You did 20 damage"
"It is the guard's turn!"

In the code for the minigame, I used a 
random maths function to randomly decide what
the guard will do - attack or block.
Blocking will halve the damage dealt.

 
The inventory table of the database is labelled
"playerInventory", which uses "playerId" and "itemID"
as primary and foreign keys. In the
database, there is a table named "itemInfo" which
lists all the items in the game, which are all uniquely
identified by an "itemID."

I have written functions for the rest of my
group to use, for example adding items to
the players inventory as well as removing and 
checking the inventory for a specific item. In 
addition to these, there is also a
"clearInvetory" function, which clears the player's 
inventory upon the start of a new game.
 
PlayerID is dynamically chosen through
the use of "sessionlog," which was written
by another member of my group. This allows the
correct playerInventory to be targeted as there
will be multiple users. I use this as a
parameter for my add/remove/check item function and my
"clearInventory" function..

As for how this ties in with my minigame, I 
implement the use of my checkItem function
to check if a player has three specific items;
A rusted scalpel, knuckledusters or food.

The item button calls the check item function
which will return true or false, depending if
the item is held. If it is true, the player will
deal double damage. This item function also
checks if the guard is blocking to compensate
for any accidental double damage, when it
should just be regular. 

The item button checks for a rusted scalpel or knuckledusters. 
The rusted scalpel will break after use. If the player has no items,
a unique message will be displayed;

"You have no items, so you punched the guard..."

Finally, upon a user interaction in the guard encounter, 
music will fade in. Additonally, this music
fades out on a win or lose in time with the redirect to
the following page (either "breakout.html" or the "gameOver.html."

NOTES FOR FUTURE IMPROVEMENT;

If I could redo this project, I would add 
more functionality to the item button, through 
being able to choose what item to use. I would implement
this through a drop down menu. Addtionally, I would add
that, on hover, an item description display
alongside the damage and if the item breaks.

