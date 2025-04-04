// Breaking out of the sell
checkLogin();
var header = document.getElementById("textHeader");
var text = document.getElementById("text");

var subHeader = document.getElementById("subHeader");
var subText = document.getElementById("subText");

const sidebar = document.querySelector(".sidebar");

var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");

var image = document.getElementById("image");

function cellBreakout() {
    header.innerHTML = `The Return to the Cell`
    text.innerHTML = `You're back in your cell. It's time to put your escape plan into action. Take your time and make the right decisions or risk being caught, or even... <b>KILLED!</b>`

    subHeader.innerHTML = `Decisions! Decisions!`;
    subText.innerHTML = `How will you try and break out of your cell? Did you lift anything useful to use to get you out?`;

    button1.innerHTML = `Bribe the Guard`;
    button2.innerHTML = `Pick the Lock`;
    button3.innerHTML = `Use Guards' Key`;

    button1.onclick = bribeGuard;
    button2.onclick = pickLock;
    button3.onclick = guardKey;
}

function bribeGuard() {
    image.setAttribute("src", "../images/bribeGuard.png");
    header.innerHTML = `Bribe the Guard`;
    text.innerHTML = `I wonder will the guard take a bribe?`;

    subHeader.innerHTML = `Will you try to bribe the Guard?`;
    subText.innerHTML = `Are you sure you want to use your money now?`;

    button1.innerHTML = `Yes`;
    button2.innerHTML = `No`;
    button3.innerHTML = ``;

    button1.onclick = bribeGuardYes;
    button2.onclick = bribeGuardNo;
    button3.disabled = true;

    function bribeGuardYes() {
        image.setAttribute("src", "../images/bribeGuardRefuse.png");
        header.innerHTML = `Not today!`;
        text.innerHTML = `The guard has refused your bribe and has locked the cell door. You're stuck in the cell!`;

        subHeader.innerHTML = `What will you do!?`;
        subText.innerHTML = `You have to think fast!`;

        button1.innerHTML = `Attack Guard`;
        button2.innerHTML = `Give up`;
        button3.innerHTML = `Try Convince the Guard`;

        button3.disabled = false;

        button1.onclick = attackGuard;
        button2.onclick = giveUp;
        button3.onclick = convinceGuard;

        function attackGuard() {
            image.setAttribute("src", "../images/attackGuard.png");
            header.innerHTML = `BOOM! POW! BANG!`;
            text.innerHTML = `You've decided to attack the guard! You must fight for your freedom, but if you lose, it's GAME OVER!`;

            subHeader.innerHTML = `Strategy!`;
            subText.innerHTML = `You must be smart about how you fight!`;

            attackTitle.innerHTML = `FIGHT!`;
            attack.innerHTML = `It's your turn!`;
            plrHP.innerHTML = `Player Health: 100`;
            grdHP.innerHTML = `Guard Health: 100`;

            button1.innerHTML = `Attack`;
            button2.innerHTML = `Defend`;
            button3.innerHTML = ``;

            button3.disabled = true;

            var attackBtn = button1;
            var defendBtn = button2;

            // Player variables
            var plHealth = 100;
            var plDamage = 20;
            var plIsGuard = false;
            var turn = true;

            // Enemy variables
            var grdHealth = 100;
            var grdDamage = 20;
            var enIsGuard = false;

            function playerTurn() {
                if (plHealth <= 0) {
                    lose();
                } if (grdHealth <= 0) {
                    win();
                }
                document.getElementById("attack").innerHTML = "It's your turn!";
            }

            async function guardTurn() {
                if (turn) return;

                if (plHealth <= 0) {
                    lose();
                    return
                }
                if (grdHealth <= 0) {
                    win();
                    return
                }

                let guardChoice = Math.floor(Math.random() * 2);

                if (guardChoice === 0) {
                    await delay(2000);
                    enIsGuard = false;
                    guardAttack();
                } else {
                    document.getElementById("attack").innerHTML = "It's the Guard's turn!";
                    await delay(2000);
                    enemyGuard();
                }

                turn = true;
                playerTurn()
            }

            attackBtn.onclick = async function () {
                if (turn) {
                    if (enIsGuard) {
                        grdHealth -= plDamage / 2;
                        enIsGuard = false;

                        document.getElementById("grdHP").innerHTML = "Guard health: " + grdHealth;
                        document.getElementById("subText").innerHTML = "You have attacked!";
                        await delay(1000);
                    } else {
                        grdHealth -= plDamage;
                        document.getElementById("grdHP").innerHTML = "Guard health: " + grdHealth;
                        document.getElementById("subText").innerHTML = "You attacked!";
                        await delay(1000);
                    }
                    turn = false;
                }
                guardTurn();
            };

            defendBtn.onclick = async function () {
                console.log("PlayerTurn"); //debugging
                console.log(turn); //debugging
                if (turn) {
                    document.getElementById("subText").innerHTML = "You defended, you will take half the damage next time you get hit!";
                    await delay(1000);
                    plIsGuard = true;
                    turn = false;
                }
                guardTurn();
            };

            async function guardAttack() {
                if (plIsGuard) {
                    //if player is guarding do less dmg
                    plHealth -= grdDamage / 2;
                    plIsGuard = false;
                    document.getElementById("plrHP").innerHTML = "Player health: " + plHealth
                    document.getElementById("subText").innerHTML = "Guard attacked!"
                    await delay(1000);
                } else {
                    //if player is not guarding do full dmg
                    plHealth = plHealth - grdDamage;
                    document.getElementById("plrHP").innerHTML = "Player health: " + plHealth
                    document.getElementById("subText").innerHTML = "Guard attacked!"
                    await delay(1000);
                }
                turn = true;
                playerTurn();
            }

            async function enemyGuard() {
                //enemy guard function
                document.getElementById("subText").innerHTML = "The gaurd defended, it will take half the damage next time it gets hit!";
                await delay(1000);
                enIsGuard = true;
                turn = true;
                guardTurn();
            }
            //delay function
            function delay(milliseconds) {
                return new Promise(resolve => {
                    setTimeout(resolve, milliseconds);
                });
            }
            // leads to win/lose page
            function win() {
                attackTitle.innerHTML = `Prisoner Wins`;
                attack.innerHTML = `You've done it!`

                header.innerHTML = `WINNER!`;
                text.innerHTML = `Congratulations! You beat the guard and now it is time to move on to the next part of your escape plan.`;

                grdHP.innerHTML = `Guard health: 0`

                button1.innerHTML = `Move On!`;
                button2.innerHTML = ``;

                button1.onclick = 'hallway.html'
                button2.disabled = true;
                button3.disabled = true;
            }
        }

        function lose() {
            attackTitle.innerHTML = `Guard Wins`;
            attack.innerHTML = `Oh no!`

            header.innerHTML = `LOSER!`;
            text.innerHTML = `You LOST! The guard has beaten you to do death. GAME OVER!`;

            plrHP.innerHTML = `Player health: 0`;

            button1.innerHTML = `Game Over!`
            button2.innerHTML = ``;

            button2.disabled = true;

            button1.onclick = giveUp;

        }
    }

    function convinceGuard() {
        image.setAttribute("src", "declansImages/bribeGuardNo.png")
        header.innerHTML = `Please! Take the money!`
        text.innerHTML = `The guard isn't convinced! GET BACK IN YOUR CELL!`;

        button1.innerHTML = `Give up!`;
        button2.innerHTML = ``;
        button3.innerHTML = ``;

        button1.onclick = giveUp;
        button2.disabled = true;
        button3.disabled = true;
    }

    function bribeGuardNo() {
        image.setAttribute("src", "declansImages/bribeGuardNo.png");
        header.innerHTML = `The Guard Walks By`;
        text.innerHTML = `The guard walks by and ignores you. You're still in the cell and you've kept your money!`;

        subHeader.innerHTML = `What will you do next?`;
        subText.innerHTML = `Is there anything else you can do?`;

        button1.innerHTML = `Wait for the Guard to come back`;
        button2.innerHTML = `Pick the Lock`;
        button3.innerHTML = `Use Guards' Key`;

        button3.disabled = false;

        button1.onclick = bribeGuard;
        button2.onclick = pickLock;
        button3.onclick = guardKey;
    }

}

function pickLock() {
    image.setAttribute("src", "declansImages/pickLock.png");
    header.innerHTML = `Pick the Lock`;
    text.innerHTML = `Is now the time to use your paperclip to pick the lock?`;

    subHeader.innerHTML = `Will you try to pick the lock?`;
    subText.innerHTML = `Are you sure you want to use your paperclip now?`;

    button1.innerHTML = `Yes`;
    button2.innerHTML = `No`;
    button3.innerHTML = ``;

    button1.onclick = pickLockYes;
    button2.onclick = pickLockNo;
    button3.disabled = true;

    function pickLockYes() {
        testQuery();
        header.innerHTML = `Pick the Lock!`;
        text.innerHTML = `Put the numbers in the correct order to pick the lock. Be careful though, you only have 3 tries!`;

        button1.innerHTML = `Submit Guess`;
        button2.innerHTML = ``;
        button3.innerHTML = ``;

        button1.onclick = checkGuess;
        button2.disabled = true;
        button3.disabled = true;

        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const originalDigits = randomNumber.toString().split("");
        const shuffledDigits = originalDigits
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        const shuffledNumber = shuffledDigits.join("");
        
        let attempts = 5;

        document.getElementById("attackTitle").innerText = `Random number: ${shuffledNumber}`;

        console.log("Correct Number (for testing):", randomNumber); // debugging 

        async function checkGuess() {
            const playerInput = document.getElementById("playerGuess").value;

            if (playerInput.length !== 4 || isNaN(playerInput)) {
                document.getElementById("attack").innerText = `Guess correct to pick the lock!`;
                return;
            }

            // win
            if (parseInt(playerInput) === randomNumber) {
                document.getElementById("attack").innerText = `Congratulations! You have successfully picked the lock!`;

                header.innerHTML = `Success!`;
                text.innerHTML = `CONGRATULATIONS! You have been able to successfully pick the lock!`;

                subHeader.innerHTML = `Nice Work!`;
                subText.innerHTML = `Time to move on!`;
                // removeItemFromInventory(${playerID}, 3)
                await delay(3000);
                location.replace("hallway.html")
                disableInput();
                
                return;


            }

            // lose
            attempts--;
            if (attempts > 0) {
                document.getElementById("attackTitle").innerText = `Random Number: ${shuffledNumber}`;
                document.getElementById("attack").innerText = `Incorrect! Try again || Last Guess: ${playerInput}`;
                document.getElementById("subHeader").innerText = `Be careful!`;
                document.getElementById("subText").innerText = `${attempts} tries left.`;
            } else {
                document.getElementById("attack").innerText = `Game Over! The correct answer is: ${randomNumber}`;

                header.innerHTML = `Out of Luck!`
                text.innerHTML = `Oh no! The guard has heard you trying to pick the lock! That is <b>GAME OVER!</b>`;

                subHeader.innerHTML = `Oh No!`;
                subText.innerHTML = `No more tries!`;

                button3.disabled = false;
                button3.innerHTML = `End Game`;

                document.getElementById("button3").onclick = function () {
                    window.location.href = "gameOver.html";
                }

                disableInput();
            }

        }

        function disableInput() {
            document.getElementById("playerGuess").disabled = true;
            document.getElementById("submitGuess").disabled = true;
        }

        function showInput() {
            const inputField = document.getElementById("playerGuess");
            inputField.classList.remove("hidden");
        }

        showInput()

        document.getElementById("submitGuess").onclick = checkGuess;
    }

    function pickLockNo() {
        image.setAttribute("src", "declansImages/bribeGuardNo.png");
        header.innerHTML = `Crunch Time!`;
        text.innerHTML = `If you don't want to pick the lock, what else is there that you can do?`;

        subHeader.innerHTML = `What else can you do?`;
        subText.innerHTML = `What do you think the best option is?`;

        button1.innerHTML = `Bribe the Guard`;
        button2.innerHTML = `Try again and pick the lock`;
        button3.innerHTML = `Use the Guards' key`;

        button3.disabled = false;
        button1.onclick = bribeGuard;
        button2.onclick = pickLock;
        button3.onclick = guardKey;
    }

}

function guardKey() {
    image.setAttribute("src", "declansImages/guardsKey.png")
    header.innerHTML = `Use Guards' Key`;
    text.innerHTML = `Will the guards key work on your cell?`;

    subHeader.innerHTML = `Will you try the guards key?`;
    subText.innerHTML = `Are you sure you want to use the guards key now?`;

    button1.innerHTML = `Yes`;
    button2.innerHTML = `No`;
    button3.innerHTML = ``;

    button1.onclick = guardKeyYes;
    button2.onclick = guardKeyNo;
    button3.disabled = true;

    function guardKeyYes() {
        header.innerHTML = `They're Wrong!`;
        text.innerHTML = `Oh no! The Guards' key hasn't worked on your cell and the guards have heard the clattering of your keys! That is <b>GAME OVER!</b>`;

        subHeader.innerHTML = `All out of Luck!`;
        subText.innerHTML = `Back to the main menu you go.`;

        button1.innerHTML = `You're done!`
        button2.innerHTML = ``;
        button3.innerHTML = ``;

        button1.onclick = giveUp;
        button2.disabled = true;
        button3.disabled = true;
    }

    function guardKeyNo() {
        header.innerHTML = `Good call`;
        text.innerHTML = `That was the right decision. The Guards' keys are different for each part of the prison.`;

        subHeader.innerHTML = `What will you do instead?`;
        subText.innerHTML = `What do you think will be the better decision?`;

        button1.innerHTML = `Bribe the Guard`;
        button2.innerHTML = `Pick the Lock`;
        button3.innerHTML = `Give up`;

        button3.disabled = false;

        button1.onclick = bribeGuard;
        button2.onclick = pickLock;
        button3.onclick = giveUp;

    }
}

function giveUp() {
    image.setAttribute("src", "declansImages/giveUp.png");
    header.innerHTML = `Pack it in!`;
    text.innerHTML = `Giving up is for losers... and it looks like you are one!`;

    button1.innerHTML = `Game Over!`;
    button2.innerHTML = ``;
    button3.innerHTML = ``;

    document.getElementById("button1").onclick = function () {
        window.location.href = "gameOver.html";
    }
    button2.disabled = true;
    button3.disabled = true;
}

// function to hide pickLockYes function input bar
function hideInput() {
    const inputField = document.getElementById("playerGuess");
    inputField.classList.add("hidden");
}



hideInput()
cellBreakout()

//add in parameter "playerID" and change VALUES / WHERE TO ${playerID}
//FOR debug purposes, i am using playerID = 1
async function testQuery() {

    let sqlQuery = `SELECT * FROM playerInventory WHERE playerID = 1`;

    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });
        let result = await response.json();


        console.log(JSON.stringify(result));


    } catch (error) {
        console.error("Error in test", error);
    }
}
function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });}