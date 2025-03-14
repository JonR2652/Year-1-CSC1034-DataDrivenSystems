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

//enemyTurn();
document.getElementById("battleText").innerHTML = "The guard is attacking you! What do you do?";

//async is used to allow for a wait function
function playerTurn(){
    if(plHealth <= 0) {
        lose();
    } if (enHealth<=0){
        win();
    }
    document.getElementById("battleText").innerHTML = "Its your turn!";
}

async function enemyTurn() {
    if(plHealth <= 0) {
        lose();
    } if (enHealth<=0){
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
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
// leads to win/lose page
function win(){
    location.replace("./win.html");
}

function lose(){
    location.replace("./lose.html");
}
