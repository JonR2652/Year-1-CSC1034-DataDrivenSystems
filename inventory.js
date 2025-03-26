//GO OVER ALL OF THIS
//this whole file needs to fetch the playerID from the sessionID


//All following functions take the parameter of playerID to identify which player inventory to target.

async function displayInventory() {

    let sqlQuery = `SELECT * FROM playerInventory WHERE playerID = 1`;

    dbConfig.set('query', sqlQuery);
    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });
        let result = await response.json();
        console.log(JSON.stringify(result));

        console.log("Player Inventory:", inventory); // Debugging

        let inventoryDiv = document.getElementById("inventoryDisplay");
        inventoryDiv.innerHTML = "<h3>Your Inventory:</h3>";

        if (inventory.length === 0) {
            inventoryDiv.innerHTML += "<p>You have no items.</p>";
            return;
        }

        let itemList = "<ul>";
        inventory.forEach(item => {
            itemList += `<li>${item.ItemName} )</li>`;
        });
        itemList += "</ul>";

        inventoryDiv.innerHTML += itemList;
    } catch (error) {
        console.error("Error fetching inventory:", error);
    }


}






//add in parameter "playerID" and change VALUES / WHERE TO ${playerID}
//FOR debug purposes, i am using playerID = 1
// Load inventory when page loads
document.addEventListener("DOMContentLoaded", () => {
    let playerID = 1; // Replace with the actual player ID
    displayInventory(playerID);
});







//add in parameter "playerID" and change VALUES / WHERE TO ${playerID}
//FOR debug purposes, i am using playerID = 1
async function testQuery() {


   
    let sqlQuery = `SELECT * FROM playerInventory WHERE playerID = 1`;

    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });
        let result = await response.json();


        console.log(JSON.stringify(result));


    } catch (error) {
        console.error("Error  in test", error);
    }
}








//add in parameter "playerID" and change VALUES / WHERE TO ${playerID}
//FOR debug purposes, i am using playerID = 1
async function addItemToInventory() {
    let sqlQuery = `INSERT INTO playerInventory VALUES (1,4)`

    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: `POST`,
            body: dbConfig

        });
        let result = await response.json();
    } catch (error) {
        console.error("Error adding item to inventory:", error)
    }
}










//takes the parameter of playerID to identify which player inventory to target.
//add in parameter "playerID" and change VALUES / WHERE TO ${playerID}
//FOR debug purposes, i am using playerID = 1
//NOT WORKING
async function removeItemFromInventory() {
    let sqlQuery = `REMOVE FROM playerInventory VALUES (1,4)`

    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: `POST`,
            body: dbConfig,
        });
        let result = await response.json();

    } catch (error) {
        console.error("Error removing item from inventory:", error)
    }
}