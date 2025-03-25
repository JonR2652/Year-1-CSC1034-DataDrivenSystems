const dbConnectorUrl = 'https://jroberts15.webhosting1.eeecs.qub.ac.uk/dbConnector.php';
let dbConfig = new URLSearchParams({
    hostname: 'localhost',
    username: 'jroberts15',
    password: 'wG4mlN7TtsbrBPbm',
    database: 'jroberts15',
});

//ASK ABOUT ALL THIS

// Function to generate API request URLs
function getDbUrl(action, params = {}) {
    let url = `${dbConnectorUrl}?action=${action}`;
    Object.keys(params).forEach(key => {
        url += `&${key}=${params[key]}`;
    });
    return url;
}



