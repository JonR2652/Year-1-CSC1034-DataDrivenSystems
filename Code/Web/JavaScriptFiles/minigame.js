// Game Variables
let player = document.getElementById('player');
let foodArray = [];
let hits = 0;
let timer = 30;
const hitLimit = 5;  
let gameInterval;
let timerInterval;

// Set up movement controls (with help from generative AI)
document.addEventListener('keydown', function (event) {
    let playerLeft = parseInt(player.style.left || 375); // Get player's current position (default to 375 if undefined
    if (event.key === 'ArrowLeft' && playerLeft > 0) {
        player.style.left = (playerLeft - 20) + 'px';
    } else if (event.key === 'ArrowRight' && playerLeft < 750) {
        player.style.left = (playerLeft + 20) + 'px';
    }
});

// Function to spawn food (falling objects)
function spawnFood() {
    let food = document.createElement('div');
    food.classList.add('food');
    food.style.left = Math.floor(Math.random() * 770) + 'px'; // Random X position
    food.style.top = '0px'; // Start from the top
    document.querySelector('.game-area').appendChild(food); // Append food to the game area
    foodArray.push(food);
}

// Function to check collisions with the player
function checkCollision(food) {
    let foodRect = food.getBoundingClientRect(); // Get food element's position and size
    let playerRect = player.getBoundingClientRect(); // Get player element's position and size

    // Check if food intersects with player (collision detection)
    if (foodRect.top + foodRect.height >= playerRect.top && 
        foodRect.left + foodRect.width >= playerRect.left && 
        foodRect.left <= playerRect.left + playerRect.width) {
        hits++;
        // Check if the player has exceeded the hit limit
        document.getElementById('hits').textContent = hits;
        if (hits >= hitLimit) {
            gameOver(); // End the game if the player is hit too many times
        }
    }
}

// Timer countdown function
function startTimer() {
    timerInterval = setInterval(function () {
        timer--;
        document.getElementById('timer').textContent = timer;
        // If the timer runs out, end the game and declare victory
        if (timer <= 0) {
            clearInterval(gameInterval);
            winGame()
        }
    }, 1000); // Run every 1000ms (1 second)
}

// Game Loop to spawn food and check for collisions (with help from generative AI)
function startGame() {
    gameInterval = setInterval(function () {
        spawnFood(); 
        // Move each piece of food down the screen and check for collisions
        foodArray.forEach(food => {
            let foodTop = parseInt(food.style.top || 0); // Get current Y position of food
            food.style.top = (foodTop + 5) + 'px'; // Move food down by 5px
            checkCollision(food); 
            // If food reaches the bottom of the screen, remove it
            if (foodTop >= 400) {
                food.remove(); 
            }
        });
    }, 1000); 
    startTimer();
}

// Function to handle win scenario
function winGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval); // Stop the timer
    alert('You survived the food fight! Please return and complete Question 2');
    // Redirect to main page after win
    setTimeout(function() {
        window.location.href = "cafeteriaSection4.html"; 
    }); 
}

// Function to handle game over scenario
function gameOver() {
    clearInterval(gameInterval);
    clearInterval(timerInterval); // Stop the timer
    alert('You have been hit too many times! Game Over!');
    // Redirect to main page after game over
    setTimeout(function() {
        window.location.href = "Game over.html"; 
    }); 
}

// Add an event listener to the start button to begin the game
document.getElementById('startButton').addEventListener('click', function () {
    document.getElementById('startButton').style.display = 'none';  // Hide the button after it's clicked
    startGame();  // Start the game
});  