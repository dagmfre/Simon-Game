let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;


// CALLING THE F ONCE, CHANGE THE LEVEL, 
$(document).keydown(function () {
   if (!started){
   nextSequence();
   started = true;
  }
})

// nextSequence, RANDOMAZATION, EFFECT, PLAY SOUND, PUSHING TO GAMEPATTERN
function nextSequence() {
  userClickedPattern = [];
  level++;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).addClass(randomChosenColour[0] + randomChosenColour);
  setTimeout(function () {
  $("#" + randomChosenColour).removeClass(randomChosenColour[0] + randomChosenColour);
  }, 500);
  $("#level-title").text("Level " + level);
  playSound(randomChosenColour);
}

// BUTTON CLICK
$(".btn").click(function (e) {
  let userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});

function checkAnswer() {
  if ((gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1])) {
     if (gamePattern.length === userClickedPattern.length) {
      
      setTimeout(function () {
          nextSequence();
        }, 1000);

      $(".flex-cont").addClass("win");

      setTimeout(function(){
        $(".flex-cont").removeClass("win");
      }, 500)

      $(".sim").css("color", "rgb(156, 150, 150)")
      setTimeout(function(){
        $(".sim").css("color", "rgb(106, 102, 102)")
      }, 500)

     }
  }
  else {
    console.log("wrong");
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// PALYING AUDIO
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// ANIMATION
function animatePress(currentColour) {
  $("#" + currentColour).addClass(currentColour);

  setTimeout(function () {
    $("#" + currentColour).removeClass(currentColour);
  }, 500);
}