//GO OVER ALL OF THIS
async function fetchPlayerInventory(playerID) {
    try {
        // Use the helper function from config.js to construct the URL
        let response = await fetch(getDbUrl("getInventory", { playerID }));
        let inventory = await response.json();

        if (inventory.error) {
            console.error("Error fetching inventory:", inventory.error);
            document.getElementById("inventoryDisplay").innerHTML = "Error loading inventory.";
            return;
        }

        console.log("Player Inventory:", inventory); // Debugging

        // Display inventory
        let inventoryDiv = document.getElementById("inventoryDisplay");
        inventoryDiv.innerHTML = "<h3>Your Inventory:</h3>";

        if (inventory.length === 0) {
            inventoryDiv.innerHTML += "<p>You have no items.</p>";
            return;
        }

        let itemList = "<ul>";
        inventory.forEach(item => {
            itemList += `<li>${item.ItemName} (Quantity: ${item.ItemQuantity})</li>`;
        });
        itemList += "</ul>";

        inventoryDiv.innerHTML += itemList;

    } catch (error) {
        console.error("Error fetching inventory:", error);
        document.getElementById("inventoryDisplay").innerHTML = "Failed to load inventory.";
    }
}

// Load inventory when page loads
document.addEventListener("DOMContentLoaded", () => {
    let playerID = 1; // Replace with the actual player ID
    fetchPlayerInventory(playerID);
});


// this function is to run our queries
async function runQuery(rawSQL) {
    try {
        const response = await fetch(dbConnectorUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `query=${encodeURIComponent(rawSQL)}`
        });

        const result = await response.json();

        if (result.error) {
            console.error("SQL error:", result.error);
        } else {
            console.log("Query result:", result);
        }

        return result;
    } catch (error) {
        console.error("Fetch error:", error);
    }

}
    //this is our function to add items to the inventory
    async function addItemToInventory(playerID, itemID) {
        const query = `
            INSERT INTO playerInventory (PlayerID, ItemID)
            VALUES (${playerID}, ${itemID})
        `;
    
        await runQuery(query);
    }

    async function removeItemFromInventory(playerID, itemID) {
        const query = `
            DELETE FROM playerInventory
            WHERE PlayerID = ${playerID} AND ItemID = ${itemID}
        `;
        await runQuery(query);
    }

    //async function giveKeycard() {
      //  const playerID = 1;
        //const itemID = 5;
        //await addItemToInventory(playerID, itemID);
        //await fetchPlayerInventory(playerID);
    //}

    // example addItemToInventory(1, 7);
    