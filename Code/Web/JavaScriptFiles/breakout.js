let header = document.getElementById("textHeader"); // Creating variables for each text box so they can be accessed easily for the functions below
let topImage = document.getElementById("topImage"); // variable so the image can be chnaged
let siren = document.getElementById("sirenSound"); // variabble so that siren can be played
let pickLockSound = new Audio("../audio/lockpick.mp3") // variable so that pick lock sound can be played
let unlockSound = new Audio("../audio/unlocked.mp3") // variable so that unlock sound can be played
let suspicion = 0; // suspicion initialised to 0
let suspicionLevel = document.getElementById("suspicionLevel") // variable to count up the suspicion level
let text = document.getElementById("text"); // variable to change the text
let sidebar = document.querySelector(".sidebar"); // variable to change content in the sidebar
let inventory = document.getElementById("items"); // variable to control inventory
let button1 = document.getElementById("button1"); // variables for all the buttons so buttons can be changed according to oprions selected
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let option1 = document.getElementById("remove1"); // variables so that certain buttons can be removed where and when needed
let option2 = document.getElementById("remove2");
let option3 = document.getElementById("remove3");

// checkLogin();





part1();

//After research on W3Schools and debugging using chatGPT I came to the conclusion of chnaging all my event listeners to onclick. 
//I done this as the event listeners were all stacking up and leading to button behaviours that I did not want and mean't my game didnt flow well.
// So changing them to onclicks meant that it prevented dupliucate event listeners.

// inner.html changes the text in the html file to the text that is stated in this js file without having to change the actual html file
//This allows us to change anything such as the header, buttons, textbox, sidebar etc. However this only works if I create the varialbes above.
function part1() {
    header.innerHTML = `The Courtyard`;
    text.innerHTML = `You have entered the courtyard and you try and look for opportunities to escape. 
    You can go look around the guards hut to find items but there is a guard stood outside the door. 
    Or there is the gate however, you will have to make your way past cameras and risk getting detected.`;

    button1.innerHTML = `Look near gate`;
    button2.innerHTML = `Look around guard's hut`;
    button3.innerHTML = `Pick up stone`;

    button1.onclick = cameras;
    button2.onclick = guardHut;
    button3.onclick = pickUpStone;
}

function pickUpStone() {
    text.innerHTML = `You picked up a stone. It has been added to your inventory.`; // Need to add this to the inventory database
    addItemToInventory(8);
}

function cameras() {
    text.innerHTML = `You decided to go to gate. However there are cameras that are covering the entire courtyard you put on your cap to stay undetected.`;
    button1.innerHTML = `Find black spot near the wall`;
    button2.innerHTML = `Throw stone at camera`;
    button3.style.display = "none";
    option3.style.display = "none";

    button1.onclick = gate;
    button2.onclick = removeItemFromInventory(8)
    button2.onclick = gate;
}

function gate() {
    increaseSuspicion(40)
    header.innerHTML = `Gate`;
    text.innerHTML = `You made it to the gate however the guard is a bit suspicious! You have some skills of picking locks however this one is tricky. 
    Or you can take the other route which is a bit more risky.`;

    button1.innerHTML = `Pick Lock`;
    button2.innerHTML = `Climb Fence`;
    button3.style.display = "none";
    option3.style.display = "none";

    button1.onclick = pickLock;
    button2.onclick = climb;
}

function climb() {
    increaseSuspicion(60)

    topImage.src = "../images/arrested.jpg"
    header.innerHTML = `Climbing Fence`;
    text.innerHTML = `You start climbing the fence and you hear <b>"HEY! Get Down"</b>.
    They release the dogs and they catch your leg and pull you down. They arrest you and put you in handcuffs and drag you away
    back to your cell.`;

    flashEffect(text); // Flashes text for urgency

    // These are block because we want to use them again further on in other functions. 
    // If they were none we would run into issues that the buttons would be hidden and would need to be rest to show them again.
    // So using block means that they are only hidden temporarily and can be shown again in other functions without having to reset the styling

    button1.style.display = "none";
    option1.style.display = "none";
    button2.style.display = "none";
    option2.style.display = "none";
    button3.style.display = "none";
    option3.style.display = "none";
}

function pickLock() {
    increaseSuspicion(20) // when pick lock function selected it increases guard suspicion by 20
    topImage.src = "Tims Images/lock.jpg" //image is changed to an image of a lock
    header.innerHTML = `Picking Lock...`;

    let timeLimit = 5000; //time limit for mini game set to 5s
    let timeLeft = timeLimit / 1000; // this is the countdown 
    let clicks = 0; // initialises clicks to 0 so it can count how many clicks
    let requiredClicks = 5; // this is how many clicks are required to pick the lock
    let isLockPickActive = true; //If picking lock is being run then it is true 

    flashEffect(text); // Flashes text for urgency

    let countdown = setInterval(() => {
        timeLeft--;
        text.innerHTML = `Quickly click the button to pick the lock before the guard catches you! <br> (${timeLeft}s left)`; //this shows the time left at the bottom of the text
        if (timeLeft <= 0) clearInterval(countdown); // clears the countdown if the timeleft has reached 0
    }, 1000); // counts down every 1s

    button1.innerHTML = `Pick Lock (0/5)`; //shows how many clicks there needs to be 
    button3.style.display = "none";
    option3.style.display = "none";




    button1.onclick = function () {
        if (!isLockPickActive) return; //if pick lock function has been selected

        clicks++; // clicks are incremented and added to the clicks that were initialised as 0
        pickLockSound.play(); // sound played when clicking pick lock
        button1.innerHTML = `Picking lock (${clicks}/5)`; //displays how many times the button has been clicked keeping track 

        button1.style.transform = "scale(0.9)";
        setTimeout(() => button1.style.transform = "scale(1)", 100); // this is for button animation allowing for a more visual viewing when pressing button

        if (clicks >= requiredClicks) { // if the required clicks is reached
            isLockPickActive = false; // pick lock is ended 
            clearInterval(countdown); // countdown has been cleared
            successPickLock(); // and successPickLock function is called 
        }
    };

    setTimeout(() => {
        if (clicks < requiredClicks) { // if the required clicks is not reached during the time limit
            isLockPickActive = false; // pick lock is ended
            clearInterval(countdown); // countdown is cleared
            failPickLock(); // fsilPickLock function is called
        }
    }, timeLimit);
}

function successPickLock() {
    unlockSound.play(); // unclocked sound played when success
    text.innerHTML = `Success! You picked the lock and can now escape.`;
    button1.innerHTML = `Run!`;
    button1.onclick = run; // you can now try to escape
}

function failPickLock() {
    increaseSuspicion(40) // when failed the suspicion increases and should be added up to 100 so that it is gameover
    text.innerHTML = `You ran out of time and got caught by the guard!`;
}

function run() {
    siren.play(); //siren is played as prisoner escapes

    flashEffect(text);

    topImage.src = "../images/prisoner running.jpg" //Image is changed when run function selected
    header.innerHTML = `Running...`;
    sidebar.innerHTML = `<span style="font-size: 25px; font-weight: bold;">You are now escaping!</span>`;

    button1.innerHTML = `Run!`;
    button2.style.display = "block";
    option2.style.display = "block";
    button3.style.display = "none";
    option3.style.display = "none";

    setTimeout(function () {
        window.location.href = "Escaped.html"; //redirects to the escaped page after 5s
    }, 5000);
}

function guardHut() {
    header.innerHTML = `Guard's Hut`;
    text.innerHTML = `You decided to look around at the guard's hut. Whilst walking over you notice the guard. He isn't looking.`;

    button1.innerHTML = `Throw Stone to distract and sneak Past the Guard`;
    button2.innerHTML = `Wait till their back is turned`;
    button3.style.display = "none";
    option3.style.display = "none";

    button1.onclick = removeItemFromInventory(8)
    button1.onclick = sneak;
    button2.onclick = wait;

}

function sneak() {
    increaseSuspicion(30) // Increases suspicion of the guard by 30
    header.innerHTML = `Sneak Past Guard`;
    text.innerHTML = `You decided to throw the stone. The guard is now distracted 
    however thinks something suspicious is happening. You need to look around the hut quickly.
    You find bolt cutters but they are big do you want to pick them up?`;

    button1.innerHTML = `Pick up bolt cutters`;
    button2.innerHTML = `Leave the bolt cutters and just go to the gate`;
    button3.style.display = "none";
    option3.style.display = "none";

    
    button1.onclick = cutters;
    button1.onclick = addItemToInventory(9)
    button2.onclick = gate;
}

function wait() {
    header.innerHTML = `Waiting for guard to turn around`;
    text.innerHTML = `The guard is now distracted and you need to look around the hut quickly. 
    You find bolt cutters but they are big do you want to pick them up?`;

    button1.innerHTML = `Pick up bolt cutters`; // need added to the inventory database
    button2.innerHTML = `Leave the bolt cutters and just go to the gate`;
    button3.style.display = "none";
    option3.style.display = "none";


    button1.onclick = cutters,
    button1.onclick = addItemToInventory(9);
        button2.onclick = gate;
}

function cutters() {
    increaseSuspicion(60) //increases suspicion of guard by 60
    header.innerHTML = `Guard's Hut`;
    text.innerHTML = `You picked up the bolt cutters. However the guard heard a noise and is coming towards you!`;

    button1.innerHTML = `Knock him out!`;
    button2.innerHTML = `Try and hide`;
    button3.style.display = "none";
    option3.style.display = "none";

    button1.onclick = punch;
    button2.onclick = hide;
}

function punch() {
    header.innerHTML = `Knocked out`;
    text.innerHTML = `You knocked the guard out, you need to hide the guard!`;

    button1.innerHTML = `Hide guard and go to fence`;
    button2.innerHTML = `Run to fence`;
    option2.style.display = "";
    button3.style.display = "none";
    option3.style.display = "none";

    button1.onclick = cutFence;
    button2.onclick = fence;
}

function fence() {
    topImage.src = "../images/prison fence.jpg" //changes the image when the fence option is selected
    header.innerHTML = `Fence`;
    text.innerHTML = `You made it to the fence without getting caught, now try escape by cutting the fence.`;

    button1.innerHTML = `Cut fence and run!`;
    button2.innerHTML = `Climb fence and run!`;
    button3.style.display = "none";
    option3.style.display = "none";

    button1.onclick = cutFence;
    button2.onclick = climb;
}

function cutFence() {
    header.innerHTML = `Escaping...`;
    text.innerHTML = `Cutting Fence, when cut run!`;

    button1.innerHTML = `Run!`;
    button2.style.display = "none";
    option2.style.display = "none";
    button3.style.display = "none";
    option3.style.display = "none";

    button1.onclick = run;
}

function hide() {
    increaseSuspicion(100) //increases suspicion by 100

    header.innerHTML = `Hiding...`;
    text.innerHTML = `You try and hide, however you sneezed and the guard catches you.`;

    flashEffect(text); // Flashes text for urgency


    button1.style.display = "none";
    option1.style.display = "none";
    button2.style.display = "none";
    option2.style.display = "none";
    button3.style.display = "none";
    option3.style.display = "none";

}

// The code below is for increasing suspicion of guards when certain options are selected
function increaseSuspicion(amount) {
    suspicion += amount; // suspicion will increase by set amount under the option function selected
    suspicionLevel.innerHTML = `Guard Suspicion level: ${suspicion}`; // This displays the suspicion level of the guard in the sidebar
    if (suspicion >= 100) { // maximum suspicion level for guards is 100
        siren.play(); // when suspicion level of 100 is reached the siren will be played as it is game over
        button1.style.display = "none";
        option1.style.display = "none";
        button2.style.display = "none";
        option2.style.display = "none";
        button3.style.display = "none";
        option3.style.display = "none";

        text.innerHTML = "You've been caught!";
        setTimeout(() => { window.location.href = "Game over.html" }, 10000) // when suspicion level of 100 is reached it will play siren and redirect to the game over page after 10s
    }
}

//Generative AI helped me with my work and help to get it working and enhance my work
function flashEffect(element) { // this is the function that allows the text to flash
    element.classList.add("flash");
}