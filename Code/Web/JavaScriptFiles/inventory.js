


//this function grabs the playerID from the session storage and returns it.
//this is to target the correct player when managin inventory
async function getPlayerID() {
    let playerID = sessionStorage.getItem("PlayerID"); // Get PlayerID from session storage
    if (playerID) {
        return playerID; //if found, return
    } else {
        console.error("PlayerID not found in session storage.");
        return null; //if not found, return nothing.
    }
}


async function getSessionID() {
    let sessionID = sessionStorage.getItem("SessionID"); // Get sessionID from session storage
    if (sessionID) {
        return sessionID; //return sessionID
    } else {
        console.error("PlayerID not found in session storage.");
        return null; //if not found, return nothing
    }
}



//stores the last inventory
let lastInventory = "";

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
        if (!items) {
            console.error("Inventory is not found");
            return;

        }

        let newInventory = ""; //stores the new inventory
        //checks if the player has any items, if the player has no items
        //  it displays 'you have no items.'
        //otherwise it lists the items the user has.
        if (!result.success || !Array.isArray(result.data) || result.data.length === 0) {
            newInventory = "You have no items.";
        } else {
            //checks if the player has any items, if the player has no items
            //  it displays 'you have no items.'
            //otherwise it lists the items the user has.
            let itemList = "<ul>";
           //lists the items
            result.data.forEach(item => {
                itemList += `<li>${item.ItemName} </li>`;
            });
            itemList += "</ul>";
            newInventory += itemList;
        }
        //only updates the inventory display if there is a change between old and new inventory
        if (items.innerHTML !== newInventory) {
            items.innerHTML = newInventory;
        }
    }


    catch (error) {
        console.error("Error fetching inventory:", error);
    }


}


//loads the inventory when the page is loaded
//checks every 5s if old inventory=new inventory
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        displayInventory();
        setInterval(displayInventory, 5000);
    }, 200); // slight delay to ensure sessionStorage is ready
});




//debug purposes only, tests connection to database
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

async function addItemToInventory(itemID) {
   
    let sessionID = sessionStorage.getItem("SessionID");
    let playerID = await getPlayerID();
     //check if player exists
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

    //removes item from player inventory
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
    console.log("check for item called")
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
            return true; //return true item is found
        } else {
            return false;
        }

    } catch (error) {
        console.error("Error checking for item:", error)
        return false; //return false if the item is not found inside of the player's inventory
    }

}

async function clearInventory() {
    //check if player exists
    let sessionID = sessionStorage.getItem("SessionID");
    let playerID = await getPlayerID();
    if (!playerID) {
        console.error("PlayerID cannot be found.");
        return; //if no playerid, console log error
    }
    //deletes all inventory items from specific playerId
    let sqlQuery = `DELETE FROM playerInventory WHERE playerID = ${playerID};`

  

    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: `POST`,
            body: dbConfig,
        });
        let result = await response.json();
        console.log("Remove all results:", result);

    } catch (error) {
        console.error("Error clearing inventory:", error)
    }
}
