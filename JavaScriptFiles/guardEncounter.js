
// Player variables
var plHealth = 100;
var plDamage = 20;
var plIsGuard = false;
var turn = true;

// Enemy variables
var enHealth = 100;
var enDamage = 20;
var enIsGuard = false;




// Button constants
var attackBtn = document.getElementById("btnAttack");
var defendBtn = document.getElementById("btnDefend");
var itemBtn = document.getElementById("btnItem");
//enemyTurn();
document.getElementById("battleText").innerHTML = "The guard is attacking you! What do you do?";

//async is used to allow for a wait function
function playerTurn() {
    if (plHealth <= 0) {
        lose();
    } if (enHealth <= 0) {
        win();
    }
    document.getElementById("battleText").innerHTML = "Its your turn!";
}

async function enemyTurn() {
    if (plHealth <= 0) {
        lose();
    } if (enHealth <= 0) {
        win();
    }
    console.log(turn); //debugging
    //chooses whether an enemy will attack or defend
    //math chooses between 0 or 1

    var enemyChoice = Math.floor(Math.random() * 2);
    if (!turn && enemyChoice == 0) {
        //attack function
        document.getElementById("battleText").innerHTML = "Its the enemies turn!";
        //the await delay is to pace the game and wait for 1 second
        await delay(2000);
        //precatuion to make sure the enemy is not guarding as it attacks
        enIsGuard = false;
        enemyAttack();
    } else if (!turn && enemyChoice == 1) {
        //defend function
        document.getElementById("battleText").innerHTML = "Its the enemies turn!";
        await delay(2000);
        enemyGuard();
    } else if (turn) {
        //changes to player turn
        playerTurn();

    }
}

//check for attackbtn
attackBtn.addEventListener('click', async function () {
    console.log("PlayerTurn");
    console.log(turn);
    addItemToInventory(4);
    if (turn) {
        if (enIsGuard) {
            //if enemy is guarding do half dmg
            enHealth = enHealth - plDamage / 2;
            enIsGuard = false;
            //displaying enemy health
            document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
            document.getElementById("battleText").innerHTML = "You attacked!";
            await delay(1000);
        } else {
            //if enemy is not guarding do full dmg
            enHealth = enHealth - plDamage;
            document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
            document.getElementById("battleText").innerHTML = "You attacked!";
            await delay(1000);
        }
        turn = false;

    }
    enemyTurn();
});
//defending function
defendBtn.addEventListener('click', async function () {
    console.log("PlayerTurn"); //debugging
    console.log(turn); //debugging
    if (turn) {
        document.getElementById("battleText").innerHTML = "You defended, you will take half the damage next time you get hit!";
        await delay(1000);
        plIsGuard = true;
        turn = false;
    }
    enemyTurn();
});
//WILL NOT FUNCTION UNTIL THE INVENTORY FUNCTION IS WORKING
//using an item
//NEEDS CGED TOTAKE PARAMETER FOR PLAYERID
itemBtn.addEventListener('click', async function () {

    if (turn) {
        if (enIsGuard) {
            if (checkForItem(4) == true) {
                document.getElementById("battleText").innerHTML = "You attacked using a rusted scalpel, but the enemy blocked! The scalpel broke...";
                enHealth = enHealth - plDamage - plDamage
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
                removeItemFromInventory(4);
                turn = false;
                plIsGuard = false;
                await delay(2000);
            } else if (checkForItem() == 5) {
                document.getElementById("battleText").innerHTML = "You attacked using knuckle dusters, but the enemy blocked! ";
                enHealth = enHealth - plDamage
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
                turn = false;
                plIsGuard = false;
                await delay(2000);
            } else {
                document.getElementById("battleText").innerHTML = "You had no items, so you punched the guard...but he blocked!"
                enHealth = enHealth - 10;
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
                turn = false;
                plIsGuard = false;
                await delay(2000);
            }
            turn = false;

        }
        else {
            if (checkForItem(4) == true) {
                document.getElementById("battleText").innerHTML = "You attacked using a rusted scalpel! The scalpel broke...";
                enHealth = enHealth - plDamage - plDamage
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
                removeItemFromInventory(4);
                turn = false;
                plIsGuard = false;
                await delay(2000);
            } else if (checkForItem() == 5) {
                document.getElementById("battleText").innerHTML = "You attacked using knuckle dusters!";
                enHealth = enHealth - plDamage - plDamage
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
                turn = false;
                plIsGuard = false;
                await delay(2000);
            } else {
                document.getElementById("battleText").innerHTML = "You have no items, so you punched the guard..."
                enHealth = enHealth - plDamage;
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
                turn = false;
                plIsGuard = false;
                await delay(2000);
            }
            turn = false;

        }
    }
    enemyTurn();

});


//enemy attack function
async function enemyAttack() {
    if (plIsGuard) {
        //if player is guarding do less dmg
        plHealth = plHealth - enDamage / 2;
        plIsGuard = false;
        document.getElementById("playerhp").innerHTML = "Player health: " + plHealth
        document.getElementById("battleText").innerHTML = "Enemy attacked!"
        await delay(1000);
    } else {
        //if player is not guarding do full dmg
        plHealth = plHealth - enDamage;
        document.getElementById("playerhp").innerHTML = "Player health: " + plHealth
        document.getElementById("battleText").innerHTML = "Enemy attacked!"
        await delay(1000);
    }
    turn = true;
    enemyTurn();
}

async function enemyGuard() {
    //enemy guard function
    document.getElementById("battleText").innerHTML = "The enemy defended, it will take half the damage next time it gets hit!";
    await delay(1000);
    enIsGuard = true;
    turn = true;
    enemyTurn();
}
//delay function
function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
// leads to win/lose page
async function win() {
    document.getElementById("battleText").innerHTML = "You beat the guard!"
    await delay(3000);
    location.replace("../htmlFiles/Breakout.html");
}
//LOSE SCREEN
async function lose() {
    document.getElementById("battleText").innerHTML = "Oh no! The guard knocked you out!"
    await delay(3000);
    location.replace("./lose.html");
}

//PLAYER INVENTORY display














