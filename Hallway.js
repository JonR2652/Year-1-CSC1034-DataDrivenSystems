
                    //these define our functions and change the text in the narrative box 
                    //depending on the users choice

                    //sniff hand tracker for end of game- how many times u sniffed ur bum hand
                    //ponder is for the amount of times you questioned your decisions
                    ponder =0;
                    sniff = 0;
                    pHolder = 1;
                    function overseer(button) {


                        switch (button) {
                            //this first case is to identify which button was clicked
                            //case 1 is the hide action
                            case 'buttonOne':
                                //run through hide options


                                //after pressing button 1 aka "hide";
                                switch (pHolder) {
                                    case 1:
                                        //displays the new text and new options for choosing to hide
                                        document.getElementById("choice").innerHTML = "You dip inside a cleaner closet, and you hear the guard pause outside...";
                                        document.getElementById("buttonOne").innerHTML = "Wait..";
                                        document.getElementById("buttonTwo").innerHTML = "Attack!";
                                        document.getElementById("buttonThree").innerHTML = "Scratch bum";
                                        //pHolder updates and is now at a value of 2
                                        pHolder = 2;


                                        break;


                                    case 2:
                                        //this is the outcome of choosing to "wait"
                                        document.getElementById("choice").innerHTML = "You hear the guard walk off into the distance!";
                                        document.getElementById("buttonOne").innerHTML = "Continue to the courtyard";
                                        document.getElementById("buttonTwo").innerHTML = "Celebrate and continue!";
                                        document.getElementById("buttonThree").innerHTML = "Sniff hand";
                                        pHolder = 3;

                                        break;

                                    case 3:
                                        //this is the outcome of choosing to continue to courtyard
                                        //escpae to next area

                                        break;

                                    case 4:
                                        //this is for the outcome of charming the guard, button 1 ('compliment baton')

                                        document.getElementById('choice').innerHTML = "You compliment the guard on his baton, and he looks at you with a confused expression."
                                        document.getElementById("buttonOne").innerHTML = "option1";
                                        document.getElementById("buttonTwo").innerHTML = "option2";
                                        document.getElementById("buttonThree").innerHTML = "option3";
                                        break;

                                    case 5:
                                        //alternate escape after sniffing hand
                                    break;
                            

                                }




                                break;


                            //case 2 is the attack option
                            case 'buttonTwo':
                                //run through attack minigame
                                switch (pHolder) {
                                    //this is now the attacking minigame!
                                    case 1:
                                        document.getElementById("choice").innerHTML = "Minigame instance 1";
                                        //call minigame function
                                        break;


                                    case 2:
                                        document.getElementById("choice").innerHTML = "Minigame instance 2";
                                        //call minigame function
                                        break;

                                    case 3:
                                        //escpape to next area
                                        break;

                                    case 4:
                                        //outcome for charm, lie about why you are out
                                        document.getElementById("choice").innerHTML = "Don't lie to me, back to your cell.";
                                        document.getElementById("buttonOne").innerHTML = "Argue";
                                        document.getElementById("buttonTwo").innerHTML = "Co-operate";
                                        document.getElementById("buttonThree").innerHTML = "Attack";
                                        break;

                                    case 5:
                                    //alternate escape after sniffing hand


                                        break;





                                }
                                break;
                            //this is our charm 
                            case 'buttonThree':
                                //run through charm options
                                switch (pHolder) {
                                    case 1:
                                        //charm
                                        document.getElementById("choice").innerHTML = "The guard rounds the corner and looks stunned at an inmate out of his cell, and takes out his baton...";
                                        document.getElementById("buttonOne").innerHTML = "Compliment his baton"; //ends in loss, gets beat
                                        document.getElementById("buttonTwo").innerHTML = "Lie about why you are out"; //end in more dialogue options
                                        document.getElementById("buttonThree").innerHTML = "Lie about fight in dining hall"; //ends in more dialogue options
                                        //pHolder updates and is now at a value of 4
                                        pHolder = 4;


                                        break;

                                    case 2:
                                        //scratch bum
                                        document.getElementById("choice").innerHTML = "Disgusting. You hear the guard walk off into the distance!";
                                        document.getElementById("buttonOne").innerHTML = "Continue to the courtyard";
                                        document.getElementById("buttonTwo").innerHTML = "Celebrate and continue!";
                                        document.getElementById("buttonThree").innerHTML = "Sniff hand";
                                        pHolder = 5;
                                        break;

                                    case 3:
                                        //sniff
                                        document.getElementById("choice").innerHTML = "Why did you sniff your hand? You haven't done anything?";
                                        document.getElementById("buttonOne").innerHTML = "Continue to the courtyard";
                                        document.getElementById("buttonTwo").innerHTML = "Celebrate and continue!";
                                        document.getElementById("buttonThree").innerHTML = "Ponder...";
                                        ponder++;
                                        pHolder = 5;
                                       

                                        break;

                                    case 4:
                                        //outcome for lying about a fight in the dining hall
                                        document.getElementById("choice").innerHTML = "The guard rushes off, 'You better not be lying!'";
                                        document.getElementById("buttonOne").innerHTML = "option1";
                                        document.getElementById("buttonTwo").innerHTML = "option2";
                                        document.getElementById("buttonThree").innerHTML = "option3";
                                        break;

                                    case 5:
                                        //outcome for charm, lie about fight in dining hall
                                        document.getElementById("choice").innerHTML = "Really? You hear the guard walk off into the distance! YOU SHOULD LEAVE";
                                        document.getElementById("buttonOne").innerHTML = "Continue to the courtyard";
                                        document.getElementById("buttonTwo").innerHTML = "Celebrate and continue!";
                                        document.getElementById("buttonThree").innerHTML = "Sniff hand";
                                        sniff++;
                                        pHolder = 5;
                                        console.log(sniff);
                                        



                                        break;
                                    

                                }break;
                        }



                    }
                    //attack minigame. Needs to have a chance to proc after avoiding guard 1
















        