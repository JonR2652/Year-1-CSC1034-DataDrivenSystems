


//this function grabs the playerID from the session storage and returns it.
//this is to target the correct player when managin inventory
async function getPlayerID() {
    let playerID = sessionStorage.getItem("PlayerID"); // Get PlayerID from session storage
    if (playerID) {
        return playerID;
    } else {
        console.error("PlayerID not found in session storage.");
        return null;
    }
}


async function getSessionID() {
    let sessionID = sessionStorage.getItem("SessionID"); // Get PlayerID from session storage
    if (sessionID) {
        return sessionID;
    } else {
        console.error("PlayerID not found in session storage.");
        return null;
    }
}




//this function displays the players inventory
async function displayInventory() {
    //calls getPlayerID to get the playerID and display the correct inventory
    const playerID = await getPlayerID();
    const sessionID = await getSessionID();
    //if the playerID is not found, push error message
    if (!playerID) {
        console.error("PlayerID not be found.");
        return;
    }
    //query the databse for all the items in the current player's inventory
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
        //update the item list with item.itemName. Iterates over the inventory to do this
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






// Load inventory when the page loads. This grabs the playerID from session storage in the displayInventory function
document.addEventListener("DOMContentLoaded", () => {
    displayInventory();

});







//debug purposes only, tests connection to db
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







//this function is to add items into a player's inventory
//takes a parameter itemID to choose which item to add
// example call; addItemToInventory(1);
async function addItemToInventory(itemID) {
    //check if player exists
    let sessionID = sessionStorage.getItem("SessionID");
    let playerID = await getPlayerID();
    if (!playerID) {
        console.error("PlayerID cannot be found.");
        return;
    }

    //inserts the item into the current player's inventory
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











//this function is to remove items from a player's inventory
//takes a parameter itemID to choose which item to remove
// example call; removeItemFromInventory(1);
async function removeItemFromInventory(itemID) {
    //check if player exists
    let sessionID = sessionStorage.getItem("SessionID");
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

//function to check if a player has the desired item.
//uses the parameter itemID to check for the desired item
//if the player has the item, it return true. otherwise it returns false. 
async function checkForItem(itemID) {
    //check if player exists
    let playerID = await getPlayerID();
    if (!playerID) {
        console.error("PlayerID cannot be found.");
        return;
    }
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

