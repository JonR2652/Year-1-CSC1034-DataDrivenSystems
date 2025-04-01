const dbConnectorUrl = 'https://jroberts15.webhosting1.eeecs.qub.ac.uk/dbConnector.php';
let dbConfig = new URLSearchParams({
    hostname: 'localhost',
    username: 'jroberts15',
    password: 'wG4mlN7TtsbrBPbm',
    database: 'CSC1034_CW_40',
});

//ASK ABOUT ALL THIS

//in login.js stores the playerID email forename surname etc 


function printSessionStorage() {
    console.log("Session Storage Items:");
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        console.log(`${key}: ${value}`);
    }
}

//this needs to return the sessionid
// where session id = printSessionStorage
//return player id;

function checkLogin() {
    if (!sessionStorage.getItem('PlayerID')) {
        window.location.href = 'login.html';
        return;
    }
}
