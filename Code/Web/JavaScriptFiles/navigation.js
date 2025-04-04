// Get the button element for Question 1
const question1Button = document.getElementById('Q1');

// Check if the button exists on the page
if (question1Button) {
    // Add an event listener to the button that listnes for a 'click' function
    question1Button.addEventListener('click', function () {
        // When clicked, redirect the user to 'cafeteriaQ1.html'
        window.location.href = 'cafeteriaQ1.html';
    });
}

// Get the button element for Question 2
const question2Button = document.getElementById('Q2');

// Check if the button exists on the page
if (question2Button) {
        // Add an event listener to the button that listnes for a 'click' function
        question2Button.addEventListener('click', function () {
            // When clicked, redirect the user to 'cafeteriaQ2.html'
            window.location.href = 'cafeteriaQ2.html';
    });
} 

// Function to navigate back to the cafeteria page
function goBackToCafeteria() {
    // When called, this will redirect the user to 'cafeteriaSection4.html'
    window.location.href = "cafeteriaSection4.html";
}