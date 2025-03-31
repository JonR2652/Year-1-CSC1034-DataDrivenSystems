document.addEventListener("DOMContentLoaded", function () { // creates session variables 
    printSessionStorage();

    checkLogin();

    document.getElementById('loginUser').textContent =
        sessionStorage.getItem('PlayerForename');


    document.getElementById('loginUser').style.fontWeight = "bold";
    document.getElementById('loginUser').style.color = "Orange";
});