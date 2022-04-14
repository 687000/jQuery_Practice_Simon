var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=0;
function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level+=1;
    $("h1").text("level "+level);
}
$(".btn").click(function(event){
    if(started==0){
        return;
    }
    var userChosenColour=event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    },100);
}
$(document).on('keypress',function(event){
    if(started==0){
        started=1;
        nextSequence();
        $("h1").text("level "+level);
    }
    else{
        return;
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]!=userClickedPattern[currentLevel]){
            console.log("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            },200);
            $("h1").text("Game Over, Press Any Key to Restart"); 
            var audio = new Audio("./sounds/wrong.mp3");
            audio.play();
            startOver();
            return;
        }
    else if(currentLevel==gamePattern.length-1){
        console.log("enought");
        setTimeout(function() {nextSequence();
        },1000);
        userClickedPattern=[];
        return;
    }
}
function startOver(){
    level=0;
    userClickedPattern=[];
    gamePattern=[];
    started=0;
}