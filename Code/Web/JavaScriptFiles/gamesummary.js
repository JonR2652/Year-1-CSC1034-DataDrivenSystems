document.addEventListener("DOMContentLoaded", function () {
  const bannerText = document.getElementById("bannerText");

  // Function to start or reset the animation for the moving banner
  function startBannerAnimation() {
      bannerText.style.animation = 'none';
      bannerText.offsetHeight;  // Trigger reflow
      bannerText.style.animation = 'moveBanner 10s linear infinite'; // Restart the animation
  }

  async function getPlayerID() {
    let playerID = sessionStorage.getItem("PlayerID"); // Get PlayerID from session storage

    if (!playerID) {
        console.warn("PlayerID not found in session storage.");
        
        // Generate a new PlayerID (you can replace this with an actual ID retrieval method)
        playerID = "player_" + Date.now();

        // Store it in sessionStorage
        sessionStorage.setItem("PlayerID", playerID);
    }

    return playerID;
  }

  // Usage example
  getPlayerID().then(id => console.log("Retrieved PlayerID:", id));

  async function getSessionID() {
    let sessionID = sessionStorage.getItem("SessionID");

    if (!sessionID) {
        console.warn("SessionID not found in session storage. Generating a new one...");
        
        // Generate a new SessionID
        sessionID = "session_" + Date.now();

        // Store it in sessionStorage
        sessionStorage.setItem("SessionID", sessionID);
    }

    console.log("Retrieved SessionID:", sessionID);
    return sessionID;
  }

  // Function to fetch and display achievements & stats
  async function displayAchievements() {
      const playerID = await getPlayerID();
      const sessionID = await getSessionID();

      // If the playerID is not found, stop execution
      if (!playerID || !sessionID) {
          console.error("Missing PlayerID or SessionID. Cannot fetch achievements.");
          return;
      }

      // Construct SQL query to fetch player data
      let sqlQuery = `SELECT * FROM gamesummary WHERE playerID='${playerID}'`;
      dbConfig.set('query',sqlQuery);
      try {
          let response = await fetch(dbConnectorUrl, {
              method: "POST",
              // headers: {
              //     "Content-Type": "application/json"
              // },
              body: dbConfig,
              // body: JSON.stringify({ query: sqlQuery, values: [playerID] }) // Properly send the SQL query
          });

          let result = await response.json();
          console.log("Game Summary Result:", result);
          
          if (!result.data || result.data.length === 0) {
            console.warn("No game data found for PlayerID:", playerID);
            return;
        }

          // Get references to HTML elements
          let elements = {
              playerName: document.getElementById("playerName"),
              date: document.getElementById("dateOfCompletion"),
              completionTime: document.getElementById("completionTime"),
              attempts: document.getElementById("numberOfAttempts"),
              difficulty: document.getElementById("difficultySelected"),
              bumScratches: document.getElementById("bumScratches"),
              levelsCompleted: document.getElementById("levelsCompleted"),
              itemsCollected: document.getElementById("itemsCollected"),
              moneySpent: document.getElementById("moneySpent")
          };

          // Ensure elements exist before updating them
          Object.keys(elements).forEach(key => {
              if (!elements[key]) {
                  console.warn(`Missing HTML element for ${key}`);
              }
          });

          // Populate the player stats dynamically
          const gameData = result.data[0];

          if (elements.playerName) elements.playerName.innerHTML = `<strong>Player's Name:</strong> ${gameData.PlayerName || "N/A"}`;
          if (elements.date) elements.date.innerHTML = `<strong>Date of Completion:</strong> ${gameData.DateOfCompletion || "N/A"}`;
          if (elements.completionTime) elements.completionTime.innerHTML = `<strong>Completion Time:</strong> ${gameData.CompletionTime || "N/A"}`;
          if (elements.attempts) elements.attempts.innerHTML = `<strong>Attempts:</strong> ${gameData.Attempts || "N/A"}`;
          if (elements.difficulty) elements.difficulty.innerHTML = gameData.DifficultySelected || "N/A";
          if (elements.bumScratches) elements.bumScratches.innerHTML = gameData.BumScratches || "N/A";
          if (elements.levelsCompleted) elements.levelsCompleted.innerHTML = gameData.LevelsCompleted || "N/A";
          if (elements.itemsCollected) elements.itemsCollected.innerHTML = gameData.ItemsCollected || "N/A";
          if (elements.moneySpent) elements.moneySpent.innerHTML = gameData.MoneySpent !== null ? `$${gameData.MoneySpent.toFixed(2)}` : "N/A";

      } catch (error) {
          console.error("Error fetching game summary data:", error);
      }
  }

  // Run function to display player achievements on page load
  displayAchievements();  // This is outside the try/catch block and will execute after function definition is closed.
});







