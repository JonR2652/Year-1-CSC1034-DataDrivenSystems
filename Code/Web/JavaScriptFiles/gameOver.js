document.addEventListener("DOMContentLoaded", function () {
    endGame(); // Call the endGame function when the page loads
});

let sessionID = sessionStorage.getItem("SessionID");
let timeCompleted = sessionStorage.getItem("timeComplted")

async function endGame() {
    let startTime = parseInt(sessionStorage.getItem("startTime")); // Get start time from sessionStorage

    let sqlQuery =
        `select SessionID, timeCompleted FROM sessionInfo
    WHERE SessionID = '${sessionID}' and timeCompleted = '${timeCompleted}' `

    dbConfig.set('query', sqlQuery);  //stores sql query inside dbconfig under 'query' so that it can be accessed later

    if (!sessionID || !startTime) {
        console.error("Missing SessionID or startTime. Please make sure the game started properly.");
        return;
    }

    // Calculate elapsed time in seconds
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    console.log(`Session ${sessionID} ended. Time played: ${elapsedTime} seconds`);
    // Send the time data to the server to save it to the database
    try {
        let response = await fetch(dbConnectorUrl, {
            method: 'POST',
            body: dbConfig,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionID: sessionID,  // Send the session ID
                timePlayed: elapsedTime // Send the time played
            })
        });

        let result = await response.json();
        if (result.success) {
            console.log("Time saved successfully:", result);
            // Optionally, redirect to another page if needed, for example:
            // window.location.href = 'gameOver.html'; // Redirect to the game over page
        } else {
            console.error("Error saving time:", result.error);
        }
    } catch (error) {
        console.error("Error saving time:", error);
    }
}

