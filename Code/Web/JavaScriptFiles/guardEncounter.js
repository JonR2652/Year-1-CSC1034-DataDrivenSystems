
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

document.getElementById("battleText").innerHTML = "The guard is attacking you! What do you do?";

//checks to see if the game has finished, ie health is 0 or under
function playerTurn() {
    if (plHealth <= 0) {
        lose();
    } if (enHealth <= 0) {
        win();
    }

    document.getElementById("battleText").innerHTML = "It's your turn!";
}
//checks to see if the game has finished, ie health is 0 or under
async function enemyTurn() {
    if (plHealth <= 0) {
        lose();
    } if (enHealth <= 0) {
        win();
    }
    console.log(turn); //debugging

    //decides whether an enemy will attack or defend
    //math chooses between 0 or 1
    var enemyChoice = Math.floor(Math.random() * 2);
    if (!turn && enemyChoice == 0) {
        document.getElementById("battleText").innerHTML = "Its the enemies turn!";
        //the await delay is to pace the game and wait for 2s
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

function isGameOver() {
    if (plHealth <= 0) {
        lose();
        return true;
    }
    if (enHealth <= 0) {
        win();
        return true;
    }
    return false;
}
//check for attackbtn
attackBtn.addEventListener('click', async function () {
    console.log("PlayerTurn");
    console.log(turn);


    if (turn) {
        if (enIsGuard) {
            // Enemy is guarding — take half damage
            enHealth -= plDamage / 2;
            enIsGuard = false;
            document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
            document.getElementById("battleText").innerHTML = "You attacked!";
        } else {
            // Full damage
            enHealth -= plDamage;
            document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
            document.getElementById("battleText").innerHTML = "You attacked!";
        }

        await delay(2000);

        // Check if the game ended — stop here if it did
        if (isGameOver()) return;

        turn = false;
        enemyTurn(); // Guard's turn only if game is still ongoing
    }
});
//defending function
defendBtn.addEventListener('click', async function () {
    console.log("PlayerTurn"); // debugging
    console.log(turn);         // debugging

    if (turn) {
        document.getElementById("battleText").innerHTML = "You defended, you will take half the damage next time you get hit!";
        await delay(2000);
        plIsGuard = true;

        // Check if game is over before allowing the enemy to act
        if (isGameOver()) return;

        turn = false;
        if (isGameOver()) return;

    } enemyTurn();
});

//WILL NOT FUNCTION UNTIL THE INVENTORY FUNCTION IS WORKING
//using an item
//NEEDS CGED TOTAKE PARAMETER FOR PLAYERID
itemBtn.addEventListener('click', async function () {
    if (turn) {
        playerTurn();

        if (enIsGuard) {
            console.log("en is guard called");

            if (await checkForItem(4)) {
                document.getElementById("battleText").innerHTML = "You attacked using a rusted scalpel, but the enemy blocked! The scalpel broke...";
                enHealth -= plDamage * 2;
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
                removeItemFromInventory(4);
            } else if (await checkForItem(5)) {
                document.getElementById("battleText").innerHTML = "You attacked using knuckle dusters, but the enemy blocked!";
                enHealth -= plDamage;
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
            } else {
                document.getElementById("battleText").innerHTML = "You had no items, so you punched the guard... but he blocked!";
                enHealth -= 20;
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
            }
        } else {
            if (await checkForItem(4)) {
                document.getElementById("battleText").innerHTML = "You attacked using a rusted scalpel! The scalpel broke...";
                enHealth -= plDamage * 2;
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
                removeItemFromInventory(4);
            } else if (await checkForItem(5)) {
                document.getElementById("battleText").innerHTML = "You attacked using knuckle dusters!";
                enHealth -= plDamage * 2;
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
            } else {
                document.getElementById("battleText").innerHTML = "You have no items, so you punched the guard...";
                enHealth -= plDamage;
                document.getElementById("enemyhp").innerHTML = "Enemy health: " + enHealth;
            }
        }

        turn = false;
        plIsGuard = false;
        await delay(2000);

        if (isGameOver()) return;

        enemyTurn();
    }
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
    await delay(2000);
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

    const music = document.getElementById("minigameMusic");
    fadeOutMusic(music, 5000)


    await delay(5000);
    location.replace("../htmlFiles/Breakout.html");
}
//LOSE SCREEN
async function lose() {
    document.getElementById("battleText").innerHTML = "Oh no! The guard knocked you out!"

    const music = document.getElementById("minigameMusic");
    fadeOutMusic(music, 5000)
    await delay(5000);
    location.replace("../htmlFiles/game Over.html");
}



//function to play music, as well as fade in / out
function playMusic() {
    //set music as minigame music for ease of use
    const music = document.getElementById("minigameMusic");


    //start music, if paused then fadein
    function startMusic() {
        if (music.paused) {
            fadeInMusic(music, 5000)
        }
        //removes event listeners so no duplication of the music
        document.removeEventListener("click", startMusic);
        document.removeEventListener("keydown", startMusic);
        document.removeEventListener("touchstart", startMusic);

    }
    //listens for keydown, click or a touch if on mobile to begin music
    document.addEventListener("click", startMusic);
    document.addEventListener("keydown", startMusic);
    document.addEventListener("touchstart", startMusic);



}
//when page is done loading, load playMusic()
document.addEventListener("DOMContentLoaded", () => {
    playMusic();
})
//function to fade music in to game for a default duration of 5000ms (5s)
function fadeInMusic(audioElement, duration = 5000) {
    //start at 0% volume
    audioElement.volume = 0;
    audioElement.play().catch(error => {
        console.warn("Music couldn't begin", error);
    });

    const fadeSteps = 30;
    const interval = duration / fadeSteps;
    let step = 0;

    const fadeInterval = setInterval(() => {
        //increase volume
        step++;
        audioElement.volume = Math.min(step / fadeSteps, 1);

        if (step >= fadeSteps) {
            clearInterval(fadeInterval);
        }
    }, interval);
}
//fade out music, if none is defined then the default is 10000ms, otherwise 
//call function with parameter(music, overrideDuration)
function fadeOutMusic(audioElement, duration = 10000) {
    //start at 100% volume
    audioElement.volume = 1;
    audioElement.play().catch(error => {
        console.warn("Music couldn't begin", error);
    });

    const fadeSteps = 30;
    const interval = duration / fadeSteps;
    let step = 0;

    const fadeInterval = setInterval(() => {
        //decrease volume
        step++;
        audioElement.volume = Math.max(1 - step / fadeSteps, 0);

        if (step >= fadeSteps) {
            clearInterval(fadeInterval);
            audioElement.pause();
            audioElement.currentTime = 0
        }
    }, interval)

}









