// With help from generative AI I have been able to create and inhance an interactive pause menu

const pauseButton = document.getElementById('pauseButton'); //These create constant varables for the buttons so they dont change
const pauseMenu = document.getElementById('pauseMenu');
const resumeButton = document.getElementById('resumeButton');
const exitButtton = document.getElementById('exitSaveButton');

pauseButton.addEventListener('click', function () { //This waits for the pause button to be clicked then pause game function is called
    pauseGame();
});

resumeButton.addEventListener('click', function () { //This waits for the resume button to be clicked then resume game function is called
    resumeGame();
});

exitButtton.addEventListener('click', function () { //This waits for the exit and save button to be called and then redirects to home page
    saveGame();

    window.location.href = 'Homepage.html';

    async function saveGame() {
        clearInterval(timer);
        let sqlQuery = `UPDATE sessionInfo
        SET isCompleted = 0, locationId = ${currentlocationID}
        WHERE sessionId = ${sessionId}`;
        console.log(sqlQuery);
        dbConfig.set('query', sqlQuery);
        try {
            let response = await fetch(dbConnectorUrl, {
                method: "POST",
                body: dbConfig
            });
            let result = await response.json();
            if (result.success) {
                console.log("Game saved successfully!");
                window.location.href = "Homepage.html";
            } else {
                console.error("Error saving game.", result);
            }
        } catch (error) {
            console.error("Error saving game:", error);
        }
    }
});

function pauseGame() {
    pauseMenu.classList.remove('hidden'); //When pause button clicked the pause menu appears it is automatically hidden before 
}

function resumeGame() {
    pauseMenu.classList.add('hidden');  //When the resume button is clicked the pause menu is then hidden again
}

