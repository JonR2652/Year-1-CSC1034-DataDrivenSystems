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
    window.location.href = 'Homepage.html';
});

function pauseGame() {
    pauseMenu.classList.remove('hidden'); //When pause button clicked the pause menu appears it is automatically hidden before 
}

function resumeGame() {
    pauseMenu.classList.add('hidden');  //When the resume button is clicked the pause menu is then hidden again
}