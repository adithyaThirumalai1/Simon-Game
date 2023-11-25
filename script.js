let buttonColours=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let level=0;

// Start the game
// We have to detect any key click
// Only the first key is considered
let gameStarted=false;
document.addEventListener("keydown",function(){
    if(gameStarted==false){
        gameStarted=true;
        nextSequence();
    }
})

// generating the next color in the game
function nextSequence(){
    let randomNumber=Math.floor(Math.random()*4); // random color number
    let randomChosenColour=buttonColours[randomNumber]; // Current colour
    gamePattern.push(randomChosenColour); // putting in the pattern

    // Adding a sound of the colour
    playSound(randomChosenColour);

    // Adding the flash animation
    let color=document.getElementById(randomChosenColour);

    color.style.opacity=0;

    setTimeout(function(){
        color.style.opacity=1;
    },100)

    // Increasing the level and displaying it
    level++;
    document.querySelector("h1").innerText="Level "+level;
}

// add event listener to all the buttons
let buttons=document.querySelectorAll(".btn");
for(var i=0;i<4;i++){
    let userChosenColour=buttons[i].id;
    buttons[i].addEventListener("click",function(){
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                userClickedPattern=[];
                nextSequence();
            },1000);
        }
    });
}

// Function to play music when button event is triggered
function playSound(chosenColour){
    let audio=new Audio(`sounds/${chosenColour}.mp3`);
    audio.play();
}

// Animation of button clicked
function animatePress(currentColour){
    let color=document.getElementById(currentColour);
    color.classList.add("pressed")
    setTimeout(function(){
        color.classList.remove("pressed")
    },100);
}


// Function to restart the game
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    gameStarted=false;
}

// Function to check if the user is correct
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]!=userClickedPattern[currentLevel]){
        // Play the wrong answer music
        let audio=new Audio("sounds/wrong.mp3");
        audio.play();

        // red flash effect
        document.querySelector("body").classList.add("game-over");
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
            startOver();
        },300);

        // Game over message
        document.querySelector("h1").innerText="Game Over, Press Any Key to Restart";

    }
}