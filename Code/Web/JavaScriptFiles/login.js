sessionStorage.clear();

document.getElementById("userLogin").addEventListener("submit", async function (event) {
    event.preventDefault();

    //creates variables for username and password by retrieving them from the fields when entered 
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    //the next query checks the database for a matching username and password
    let sqlQuery =
        `select PlayerID, Email, PlayerForename FROM playerInfo
    WHERE Email = '${username}' and Password = '${password}' `

    dbConfig.set('query', sqlQuery);  //stores sql query inside dbconfig under 'query' so that it can be accessed later

    //error handling this will print an error to the console
    try {

    } catch (error) {
        console.error("Error when completing login:", error);
    }
    //sending an http request to our server which is processed and communicates with the database to return the response we want
    let response = await fetch(dbConnectorUrl, { // fetch sends the SELECT query to the server which it allows it to check for the fields needed
        method: "POST", //The response is stored in the variable response
        body: dbConfig //This sends the query through the dbconfig  
    });
    let result = await response.json(); //the response will contain json and so this is stored in result 
    console.log("Login Response", result);
    // and thus is used for checking if the user details are entered correctly
    // await pauses execution until the fetch request is complete

    //the code below works out if we have a valid login
    if (result.success && Array.isArray(result.data) && result.data.length > 0) { // This checks if result.success is true and if result.data contains items greater than 0 i.e more than one item
        console.log("Valid result, logging user data...");
        let user = result.data[0];// If this returns true we know the query was processed and that a matching username and password was found in the database meaning a successful login attempt
        //This creates session variables to be able to use later
        sessionStorage.setItem("PlayerID", user.PlayerID); //This stores playerID
        sessionStorage.setItem("Email", user.Email); // stores their email in a session variable to use later on the summary page for example
        sessionStorage.setItem("PlayerForename", user.PlayerForename); //stores their name in a session variable for use later 
        sessionStorage.setItem("SessionID", user.sessionID)
        let insertSessionQuery = `INSERT INTO sessionInfo (PlayerID) VALUES ('${user.PlayerID}')`; //this is the sql query to insert a new sessionID into sessionInfo table when the user is logged in
        dbConfig.set('query', insertSessionQuery);

        let sessionResponse = await fetch(dbConnectorUrl, {  // sends a request to the sessionInfo Table
            method: "POST", //The response is stored in the variable response
            body: dbConfig //This sends the query through the dbconfig  
        });
        let sessionResult = await sessionResponse.json();

        if (sessionResult.success) {
            console.log("Session created successfully, fetching sessionID..."); //Testing it works as was having issues with redirection
            let getSessionQuery = `SELECT SessionID FROM sessionInfo WHERE PlayerID = '${user.PlayerID}' ORDER BY SessionID DESC LIMIT 1`; // this is the query to retrieve the latest session ID for said user
            dbConfig.set('query', getSessionQuery);

            let getSessionResponse = await fetch(dbConnectorUrl, { //this sends the request to get session id
                method: "POST",
                body: dbConfig
            });
            let getSessionResult = await getSessionResponse.json(); //This gets the response

            if (getSessionResult.success && getSessionResult.data.length > 0) { //If a session ID is available then it is stored in sessionStorage
                let sessionID = getSessionResult.data[0].SessionID; //this gets the sessionID from the result
                sessionStorage.setItem("SessionID", sessionID); //This stores said sessionID in session storage
                console.log("SessionID:", sessionID); //for testing to make sure it's working as it should

                console.log("Redirecting to Homepage...");
                window.location.href = "Homepage.html";//After successful login we are redirected to the homepage.
            }
        }
    } else {
        console.log("Login failed or no matching result.");
        document.getElementById("loginMessage").textContent = "The Username and Password entered is incorrect."; // if no matching login details are found the following error message shows.
    }

});


//field validation. The code below makes sure that the passwords entered in both fields match

document.getElementById("registration").addEventListener("submit", async function (event) {

    event.preventDefault(); //prevents form from submitting 

    let firstname = document.getElementById("firstName").value;
    let surname = document.getElementById("surname").value;
    let username = document.getElementById("regUsername").value;
    let password = document.getElementById("regPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    /*The IF statement will check if the password entered in the password field matches the confirm
    password field and if it doesn't it returns a client-side error saying password do not match.
    There is then an empty return statement which allows the system to abandon the registration */

    if (password !== confirmPassword) { // this is a strict inequality operator which means not equal or not equal type
        document.getElementById("registerMessage").textContent = "Passwords do not match.";
        return;
    }

    /* The code below checks to see if the username already exists in the database. To prevent duplicate username creation */

    let selectQuery = `SELECT PlayerID from playerInfo WHERE Email = '${username}'`; // this retrieves player id from playerInfo database where the email matches the username entered
    dbConfig.set('query', selectQuery);

    //sending an http request to our server which is processed and communicates with the database to return the response we want
    try {
        let checkResponse = await fetch(dbConnectorUrl, { // fetch sends the SELECT query to the server which it allows it to check for the fields needed
            method: "POST", //The response is stored in the variable checkResponse
            body: dbConfig
        });
        let checkResult = await checkResponse.json(); //the response will contain json and so this is stored in checkResult
        // This is used for checking if the user details don't already exist
        // await pauses execution until the fetch request is complete

        if (checkResult.success && checkResult.data.length > 0) {
            document.getElementById("registerMessage").textContent = "Email already exists."; //will display an error message if the result comes back as true 
            return;
        }

        // error handling printing an error to the console
    } catch (error) {
        console.error("Error when checking database for existing usernames:", error);
    }

    // The code below is a query which adds the new player to the database
    let insertQuery = `INSERT INTO playerInfo (PlayerForename, PlayerSurname, Email, Password) 
    VALUES ('${firstname}', '${surname}', '${username}', '${password}')`;

    dbConfig.set('query', insertQuery);

    //Comments to explain this are similar to the ones above 
    try {
        let insertResponse = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });
        let insertResult = await insertResponse.json();
        if (insertResult.success) {
            document.getElementById("registerMessage").textContent = "Registration successful please login to play!";
            document.getElementById("registration").reset(); //Resets the form and empties it if successful
        } else {
            document.getElementById("registerMessage").textContent = "Error when registering player"
        }
        //Error Handling
    } catch (error) {
        console.error("Error occurred when registering user:", error);
    }
});
