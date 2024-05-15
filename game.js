gamePattern = [];
buttonColors = ["red" , "blue" , "green" , "yellow"];
userClickedPattern = [];
level = 0;
started = false;

function nextSequance(){
    userClickedPattern = [];

    level++;

    randomNumber = Math.floor( Math.random() * 4 );

    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);

    $("h1").text("Level " + level);

    
}

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function playSound(name){

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);

}

$(document).keypress(function(){

    if(!started){

        nextSequance();

        $("h1").text("Level " + level);

        started = true;
    }

});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if(gamePattern.length === userClickedPattern.length){

            setTimeout(function(){
                nextSequance();
            },1000);
        }
    }else{
        console.log("Wrong!");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function startOver(){

    level = 0;

    gamePattern = [];

    started = false;

}

