const fetchDataUrl = "https://rmullan31.webhost1.eeecs.qub.ac.uk/fetchData.php";

async function fetchUserData() {
    try {
        let response = await fetch(fetchDataUrl);
        let data = await response.json();
        console.log("Fetched Data:", data);

        // Display in HTML
        let output = "<h2>User List</h2><ul>";
        data.forEach(user => {
            output += `<li>${user.name} - ${user.email}</li>`;
        });
        output += "</ul>";

        document.getElementById("userList").innerHTML = output;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchUserData();
