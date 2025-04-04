checkLogin();
let header = document.getElementById("textHeader");
let text = document.getElementById("text");

let subHeader = document.getElementById("subHeader");
let subText = document.getElementById("subText");

const sidebar = document.querySelector(".sidebar");

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

let image = document.getElementById("image");

let checkedAreas = new Set()
let alreadyRedirecting = false;





function lookAround() {     // Function to display the text and buttons for the first set of selections
    image.setAttribute("src", "../images/prisonCell.jpg");
    header.innerHTML = `The Cell`;
    text.innerHTML = `ROLL CALL! You are in your cell before lunch, have a look around... See if you find anything... interesting.`;

    subHeader.innerHTML = `What would you like to do?`;
    subText.innerHTML = `Choose a location to search...`;

    button1.innerHTML = `Under the bed`;
    button2.innerHTML = `Behind the toilet and sink`;
    button3.innerHTML = `Under the table`;

    button1.onclick = underBed;
    button2.onclick = behindToilet;
    button3.onclick = underTable;
}

function underBed() {       // Function to display the text after user selects to check uner the bed
    image.setAttribute("src", "../images/cashStack.png");
    header.innerHTML = `Under the bed`;
    text.innerHTML = `Your secret stash of cash you got from your friends on the outside! This might come in handy later...`;

    subHeader.innerHTML = `You've found your stash of cash!`;
    subText.innerHTML = `It's not much, but it might be useful... would you like to hold on to it?`;

    button1.innerHTML = `Yes`;
    button2.innerHTML = `No`;
    button3.innerHTML = ``;

    button1.onclick = async function () {
        await addItemToInventory(2);  // Assumes item ID 2 is for the cash stack
        checkedAreas.add("bed");
        bedDone();
    }

    button2.onclick = async function () {
        checkedAreas.add("bed");
        bedDone();
    }

    button3.disabled = true;

    console.log("underBed function");
}

function behindToilet() {       //Function to display the text after user selects to check behind the toilet and sink
    image.setAttribute("src", "../images/greyHat.png");
    header.innerHTML = `Behind the toilet and sink`;
    text.innerHTML = `You've found your old hat! It's covered in dust and cobwebs, but it's still in one piece...`;
    
    subHeader.innerHTML = `Your hat!`;
    subText.innerHTML = `You've been looking for this! Would you like to keep it?`;

    button1.innerHTML = `Yes`;
    button2.innerHTML = `No`;
    button3.innerHTML = ``;

    button1.onclick = async function () {
        await addItemToInventory(1);  // Assumes item ID 2 is for the cash stack
        checkedAreas.add("toilet");
        toiletDone();
    }

    button2.onclick = async function () {
        checkedAreas.add("toilet");
        toiletDone();
    }

    button3.disabled = true;

    console.log("behindToilet function");
}

function underTable() {     // Function to display the text after user selects to check under the table
    image.setAttribute("src", "../images/paperClip.png");
    header.innerHTML = `Under the table`;
    text.innerHTML = `Oh Interesting! It's a paperclip! This could come in handy later...`;
    
    subHeader.innerHTML = `You've found a paperclip!`;
    subText.innerHTML = `This could definitely come in handy later... would you like to keep it?`;

    button1.innerHTML = `Yes`;
    button2.innerHTML = `No`;
    button3.innerHTML = ``;

    button1.onclick = async function () {
        await addItemToInventory(3);  // Assumes item ID 2 is for the cash stack
        checkedAreas.add("table");
        tableDone();
    }
    
    button2.onclick = async function () {
        checkedAreas.add("table");
        tableDone();
    }

    button3.disabled = true;

    console.log("underTable function");
}

function bedDone() {
    image.setAttribute("src", "../images/prisonCell.jpg");
    header.innerHTML = `The Cell`;
    text.innerHTML = `You've had a look under the bed and found you secret stash... would you like to check anywhere else?`;
    

    subHeader.innerHTML = `You've found your stash of cash!`;
    subText.innerHTML = `Now that you have found your money, try looking somewhere else...`;

    button1.innerHTML = `Under the bed`;
    button2.innerHTML = `Behind the toilet and sink`;
    button3.innerHTML = `Under the table`;

    button1.onclick = underBed;

    button2.onclick = behindToilet;

    button3.disabled = false;
    button3.onclick = underTable;
    
    console.log("bedDone function");
    checkAllAreas();
}

function toiletDone() {
    image.setAttribute("src", "../images/prisonCell.jpg");
    header.innerHTML = `The Cell`;
    text.innerHTML = `You've had a look behind the toilet and found your long lost hat... would you like to check anywhere else?`;
   

    button1.innerHTML = `Under the bed`;
    button2.innerHTML = `Behind the toilet and sink`;
    button3.innerHTML = `Under the table`;

    button1.onclick = underBed;
    

    button2.onclick = behindToilet;

    button3.disabled = false;
    button3.onclick = underTable;

    console.log("toiletDone function");
    checkAllAreas();
}

function tableDone() {
    image.setAttribute("src", "../images/prisonCell.jpg");
    header.innerHTML = `The Cell`;
    text.innerHTML = `You've had a look under the table and found a paper clip... have you checked everywhere?`;
    

    button1.innerHTML = `Under the bed`;
    button2.innerHTML = `Behind the toilet and sink`;
    button3.innerHTML = `Under the table`;

    button1.onclick = underBed;

    button2.onclick = behindToilet;

    button3.disabled = false;
    button3.onclick = underTable;

    console.log("tableDone function");
    checkAllAreas();
}



function checkAllAreas() {
    if (
        checkedAreas.has("bed") &&
        checkedAreas.has("toilet") &&
        checkedAreas.has("table")
        
    ) {
        header.innerHTML = `Time to move on...`;
        text.innerHTML = `You've searched the cell thoroughly. Let's head to the cafeteria.`;

        subHeader.innerHTML = ``;
        subText.innerHTML = ``;

        button1.innerHTML = ``;
        button2.innerHTML = ``;
        button3.innerHTML = ``;

        button1.disabled = true;
        button2.disabled = true;
        button3.disabled = true;

        setTimeout(() => {
            window.location.href = "cafeteriaSection4.html";
        }, 3000);
    }
}

lookAround()
// 3 options: check under bed, check nehind toilet and sink, check under the table

// Check under bed: find _____ ---> add to inventory
// Check behind toilet and sink: find _____ ---> add to inventory
// Check under the table: find _____ ---> add to inventory

//1 is hat
//2 is money
//3 is paperclip

// write me a sql script to add 'item 1' and 'item 2' to a table called 'item info' with the attributes 'itemID' 'itemName' where 'itemID' is a primary key