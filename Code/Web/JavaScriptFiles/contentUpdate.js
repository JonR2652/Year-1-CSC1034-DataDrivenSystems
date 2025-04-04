document.addEventListener('DOMContentLoaded', function () {
    const denyButton = document.getElementById('denyButton');
    const truthButton = document.getElementById('truthButton');
    const makeUpButton = document.getElementById('makeUpButton');

    // Add event listener for the deny button click
    if (denyButton && truthButton && makeUpButton) {
        denyButton.addEventListener('click', function () {
            // Call the function to update the content
            changeContent('deny');
        });

        truthButton.addEventListener('click', function () {
            // Call the function to update the content
            changeContent('truth');
        });

        
        makeUpButton.addEventListener('click', function () {
            // Call the function to update the content
            changeContent('makeUp');
         });
    }

    // Function to change the content based on the action
    function changeContent(action) {
        switch (action) {
            // If this is the case, the content is updated on the current page
            case 'deny':
                document.querySelector('.bottomContent').innerHTML = `
                    <section class="text-content" id="mainText">
                        <div class="banner">
                            Cafeteria
                        </div>
                        <p id="intro">Congratulations, you answered question one correctly, please return to complete question two</p>
                    </section>
    
                    <form id="questionForm">
                        <aside class="sidebar">
                            <h3>Please return to the Cafeteria Section</h3>
                            <button type="button" id="goBackButton">Return to Cafeteria</button>
                        </aside>
                    </form>
                `;
                // Reattach event listener to the 'goBackButton' after content change
                document.getElementById('goBackButton').addEventListener('click', goBackToCafeteria);
                break;
    
            // If this is the case, the content is updated on the current page 
            case 'truth':
                document.querySelector('.bottomContent').innerHTML = `
                    <section class="text-content" id="mainText">
                        <div class="banner">
                            Cafeteria
                        </div>
                        <p id="intro">Unfortunately, that is not the correct answer. You have..... WOW! A food fight has just broken out between the prisoners. Survive the 30 seconds and you will be welcomed back to finish what you started.</p>
                    </section>
            
                    <form id="questionForm">
                        <aside class="sidebar">
                            <h3>Minigame: Food Fight!</h3>
                            <p>Avoid the falling food to survive! You have 5 hits before you're out.</p>
                            <p>Please use the right and left arrow to move</p>
                            <!-- Start Minigame Button -->
                            <button type="button" id="startGameButton">Start Minigame</button>
                        </aside>
                    </form>
                `;

                // Add event listener for the "Start Minigame" button
                document.getElementById('startGameButton').addEventListener('click', () => {
                    window.location.href = "minigame.html";  // Redirect to the minigame page
                });
                break;
    
            // If this is the case, the user is directed to the game over page as they have failed
            case 'makeUp': 
            document.getElementById('makeUpButton').addEventListener('click', () => {
                window.location.href = "Game over.html";  // Redirect to the game over page
            });
            break;
    
            // Default condition
            default:
                break;
        }
    }

    const submitButton =  document.getElementById('submitAnswerButton')
    // Condition if the button is clicked, the submitAnswer function is carried out
    if (submitButton) {
        submitButton.addEventListener('click', submitAnswer);
    }
    
    // Function to check what the user selected, and carry out the corresponding tasks correctly
    function submitAnswer() {
        let selectedOption = document.querySelector('input[name="Q2"]:checked');
    
        // Checks to see if user has selected an option 
        if (!selectedOption) {
            alert("Please select an option before submitting");
            return;
        }
    
        const value = selectedOption.value;
    
        // If answer 1 is selected, the page is updated with this content
        if (value == 1) {
            addItemToInventory(10);
            document.querySelector('.bottomContent').innerHTML = `
            <div class="bottomContent">
                <section class="text-content" id="mainText">
                    <div class="banner">
                        Cafeteria
                    </div>
                    <p id="intro">WOW! I salute your bravery. You have unlocked "Keys" in your inventory and will be able to use them during your breakout journey to help unlock certain doors.</p>
                </section>
    
                <form id="questionForm">
                    <aside class="sidebar">
                        <h3>Please return to the Cafeteria Section</h3>
                        <button type="button" id="goBackButton">Return to Cafeteria</button>
                    </aside>
                </form>
            </div>
         `;
        // Add event listener for the "Go back" button
        document.getElementById('goBackButton').addEventListener('click', goBackToCafeteria);           

        // If answer 2 is selected, user is directed to the game over page
        } else if (value == 2) {
            window.location.href = "Game over.html";  // Redirect to the game over page
           
        // If answer 3 is selected, the page is updated with this content
        } else if (value == 3) {
            document.querySelector('.bottomContent').innerHTML = `
            <div class="bottomContent">
                <section class="text-content" id="mainText">
                    <div class="banner">
                        Cafeteria
                    </div>
                    <p id="intro">Interesting decision! You have chosen to be truthful and gained some trust from the guards, which may become useful later on. However, will you be able to break out without the keys? Continue playing to find out!</p>
                </section>
    
                <form id="questionForm">
                    <aside class="sidebar">
                        <h3>Please return to the Cafeteria Section</h3>
                        <button type="button" id="goBackButton">Return to Cafeteria</button>
                    </aside>
                </form>
            </div>
            `;
        // Add event listener for the "Go back" button
        document.getElementById('goBackButton').addEventListener('click', goBackToCafeteria);
        }
    }
});