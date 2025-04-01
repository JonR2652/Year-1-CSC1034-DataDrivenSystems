document.addEventListener("DOMContentLoaded", function () { // creates session variables 
    printSessionStorage();

    checkLogin();

    document.getElementById('loginUser').textContent =
        sessionStorage.getItem('PlayerForename');


    document.getElementById('loginUser').style.fontWeight = "bold";
    document.getElementById('loginUser').style.color = "Orange";

    document.getElementById("newGameButton").addEventListener("click", startGame);
});



let startTime;
let sessionID = sessionStorage.getItem("SessionID"); // Get session ID from sessionStorage

// Start timer when New Game button is clicked
document.getElementById("newGameButton").addEventListener("click", function () {
    startGame();
});

function startGame() {
    startTime = Date.now(); // Start timer
    sessionStorage.setItem("startTime", startTime); // Store start time in sessionStorage
    console.log("Game started at:", new Date(startTime).toLocaleTimeString());
    console.log("before clear inventory called")
    clearInventory()
    console.log("after function called")
}