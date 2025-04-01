
document.getElementById("button1").addEventListener("click", function Beginner() {
    document.getElementById("textHeader").innerHTML = "Difficulty: Beginner";
    document.getElementById("boxtext").innerHTML = "You have chosen beginner now here are  some options for your starting items.";
    document.getElementById("button1").innerHTML = "Rusted Scalpel";
    document.getElementById("button2").innerHTML = "Knuckle Dusters";
    this.id = "newbutton1";
    let button2 = document.getElementById("button2")
    button2.id = "newbutton2"

    /*document.addEventListener("DOMContentLoaded", () => {
        checkLogin();
    
    
    });*/

    setTimeout(() => {
        document.getElementById("newbutton1").addEventListener("click", function RustedScalpel() {
            addItemToInventory(4)
            document.getElementById("textHeader").innerHTML = "Good choice!!";
            document.getElementById("boxtext").innerHTML = "You have made your choice, lets hope your rusted scalpel will benifit you at a point in the story. Once you decide you will automaticlly be transfered to the start of your escape in 3...2...1.. ENJOY!!"
            newbutton1.disabled = true
            newbutton2.disabled = true
            console.log("Redirecting to theCell. PlayerID:", sessionStorage.getItem("PlayerID"));
            setTimeout (()=> {
                window.location.href = "../htmlFiles/theCell.html"
            }, 10000);
        });

        document.getElementById("newbutton2").addEventListener("click", function KnuckleDusters(){
            addItemToInventory(5)
            document.getElementById("textHeader").innerHTML= "Good choice!!";
            document.getElementById("boxtext").innerHTML = "You have made your choice, lets hope your knuckle dusters will benifit you at a point in the story. Once you decide you will automaticlly be transfered to the start of your escape in 3...2...1.. ENJOY!!"
            newbutton1.disabled = true
            newbutton2.disabled = true
            setTimeout (()=> {
                window.location.href = "../htmlFiles/theCell.html"
            }, 10000);
        });
 },10);
});

document.getElementById("button2").addEventListener("click" , function Experienced(){
    document.getElementById("textHeader").innerHTML = "Difficulty: Experienced"
    document.getElementById("boxtext").innerHTML = "You have chosen Experienced now here are  some options for your starting items.";
    
    document.getElementById("button1").innerHTML = "Toothbrush";
    document.getElementById("button2").innerHTML = "Family Photo";

    document.getElementById("button1").id = "new_button1";
    document.getElementById("button2").id = "new_button2";

    setTimeout(() => {
        document.getElementById("new_button1").addEventListener("click", function Toothbrush() {
            addItemToInventory(6)
            document.getElementById("textHeader").innerHTML = "Good choice!!";
            document.getElementById("boxtext").innerHTML = "You have made your choice, lets hope your Toothbrush will benifit you at a point in the story. Once you decide you will automaticlly be transfered to the start of your escape in 3...2...1 ENJOY!!"
            new_button1.disabled = true
            new_button2.disabled = true
            setTimeout (()=> {
                window.location.href = "../htmlFiles/theCell.html"
            }, 10000);
        });

        document.getElementById("new_button2").addEventListener("click", function FamilyPhoto(){
            addItemToInventory(7)
            document.getElementById("textHeader").innerHTML= "Good choice!!";
            document.getElementById("boxtext").innerHTML = "You have made your choice, You can carry your family photo with you now as a reminder of why you want out of this place. Once you decide you will automaticlly be transfered to the start of your escape in 3...2...1 ENJOY!!"
             new_button1.disabled = true
             new_button2.disabled = true
             setTimeout (()=> {
                window.location.href = "../htmlFiles/theCell.html"
            }, 10000);

            });
     },10);
});

