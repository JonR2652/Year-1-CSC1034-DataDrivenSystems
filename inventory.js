//GO OVER ALL OF THIS
//this whole file needs to fetch the playerID from the sessionID


//All following functions take the parameter of playerID to identify which player inventory to target.


//this function gets the playerID from the sessionID via the sessionlog
//it returns the 



async function getPlayerID() {
    let playerID = sessionStorage.getItem("PlayerID"); // Get PlayerID from session storage
    if (playerID) {
        return playerID;
    } else {
        console.error("PlayerID not found in session storage.");
        return null;
    }
}

//inventory not linked










//this function displays the inevntory of the player.
//it grabs playerId from the getPlayerId function and uses it to query the db for the player's inventory
async function displayInventory() {
    const playerID = await getPlayerID();

    if (!playerID){
        console.error("PlayerID not be found.");
        return;
    }
    let sqlQuery = `SELECT * FROM playerInventory 
                    JOIN itemInfo ON playerInventory.ItemID = itemInfo.ItemID
                    WHERE playerID = ${playerID}`;

    dbConfig.set('query', sqlQuery);
    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });
        let result = await response.json();
        console.log(result);
        console.log(JSON.stringify(result));

        console.log("Player Inventory:", result); // Debugging


        let items = document.getElementById("items");

        //if the inventory is empty, tell user
        if (result.length === 0) {
            items.innerHTML += "<p>You have no items.</p>";
            return;
        }

        let itemList = "<ul>";
        result.data.forEach(item => {
            itemList += `<li>${item.ItemName} </li>`;
        });
        itemList += "</ul>";

        items.innerHTML += itemList;
    } catch (error) {
        console.error("Error fetching inventory:", error);
    }


}






//add in parameter "playerID" and change VALUES / WHERE TO ${playerID}
//FOR debug purposes, i am using playerID = 1
// Load inventory and get player id when page loads
document.addEventListener("DOMContentLoaded", () => {
    displayInventory();

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
async function addItemToInventory(itemID) {
   let playerID = await getPlayerID();
    if (!playerID) {
        console.error("PlayerID cannot be found.");
        return;
    }
   
   
    let sqlQuery = `INSERT INTO playerInventory (PlayerID,ItemID) VALUES (${playerID}, ${itemID})`;
   
    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: `POST`,
            body: dbConfig

        });
        let result = await response.json();
        console.log("Item added to inventory:", result); // Debugging
    } catch (error) {
        console.error("Error adding item to inventory:", error)
    }
}

// addItemToInventory(4);









//takes the parameter of playerID to identify which player inventory to target.
//add in parameter "playerID" and change VALUES / WHERE TO ${playerID}
//FOR debug purposes, i am using playerID = 1


async function removeItemFromInventory(itemID) {
    let playerID = await getPlayerID();
    if (!playerID) {
        console.error("PlayerID cannot be found.");
        return;
    }
   
   
    let sqlQuery = `DELETE FROM playerInventory WHERE playerID = ${playerID} AND itemID = ${itemID}`;

    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: `POST`,
            body: dbConfig,
        });
        let result = await response.json();
        console.log("Remove item result:", result);

    } catch (error) {
        console.error("Error removing item from inventory:", error)
    }
}


// this function takes playerid from get player id function and checks if the player has the item in their inventory.
//if the player has te item, it return true. otherwise it returns false. 
async function checkForItem(itemID) {
    let sqlQuery = `SELECT * FROM playerInventory WHERE playerID =
                    ${playerID} AND itemID = ${itemID}`;

    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: 'POST',
            body: dbConfig
        })
        let result = await response.json();
        console.log("Item check result:", result); // Debugging 

        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
            console.log("Item exists in inventory.");
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error("Error checking for item:", error)
        return false;
    }

}

