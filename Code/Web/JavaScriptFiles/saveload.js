// Function to save game once save button is clicked
async function saveGame() {
    // Stops timer before progress is saved
    clearInterval(timer);

    // SQL query to update sessionInfo
    let sqlQuery = `UPDATE sessionInfo
    SET isCompleted = 0, locationId = ${currentlocationID}
    WHERE sessionId = ${sessionId}`;
    console.log(sqlQuery); // debugging

    // Stores query to send to database
    dbConfig.set('query', sqlQuery);

    try {
        // POST request sent to database
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });

        // Parse JSON response; converts response into JS object
        let result = await response.json();

        // Check for successful query
        if (result.success) {
            console.log("Game saved successfully!"); // debugging
            window.location.href = "Homepage.html"; // Redirection after saving
        } else {
            console.error("Error saving game.", result);
        }
    } catch (error) { // catch errors and log during fetch
        console.error("Error saving game:", error);
    }
}

// Function to load game once load button is clicked
async function loadGameSession() {

    // When the button is clicked, the loadGameSession() function is executed 
    document.getElementById("loadGameBtn").addEventListener("click", loadGameSession);

    // SQL query to retrieve previously saved, imcomplete game progress
    let sqlQuery = `SELECT sessionId, locationID, 
    FROM sessionInfo
    WHERE userId = ${userId} AND isCompleted = 0
    ORDER BY startedAt DESC LIMIT 1`;
    console.log(sqlQuery); // debugging

    // Stores query to send to database
    dbConfig.set('query', sqlQuery);

    try {
        // POST request sent to database
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });

        // Parse JSON response; converts response into JS object
        let result = await response.json();

        // Check session exists
        if (result.success && result.data.length > 0) {

            // Extract session data from JSON response
            let sessionData = result.data[0];
            sessionId = sessionData.sessionId; // Retrieve session ID
            currentQuestionIndex = sessionData.lastQuestionIndex;

            // sessionsStorage stores data for later use
            sessionStorage.setItem('sessionId', sessionId);
            sessionStorage.setItem('currentlocationID', currentlocationID);
            console.log("Loaded existing session:", sessionData); // debugging

            // Loads previously saved questions
            await loadSavedQuestions();

        } else {
            console.error("No saved session found."); // catch errors and log during fetch

            // Creates new session if none exist
            await createNewSession();
        }
    } catch (error) {
        console.error("Error loading session:", error); // catch errors and log during fetch
    }
}

