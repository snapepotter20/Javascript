/*
Game function:
-Player must guess a number a min and max
-Player gets a certain aamount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if loose
-Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningnum = getrandomnum(min, max),
  guessesleft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minnum = document.querySelector(".min-num"),
  maxnum = document.querySelector(".max-num"),
  guessbtn = document.querySelector("#guess-btn"),
  guessinput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minnum.textContent = min;
maxnum.textContent = max;

// Play again event listener
game.addEventListener('mousedown',function(e){
   if(e.target.className === 'play-again'){
     window.location.reload();
   }
})

// Listen for guess
guessbtn.addEventListener("click", function () {
  let guess = parseInt(guessinput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, `red`);
  }

  // Check if won
  if (guess === winningnum) {
    // Game over- won
     gameover(true, `${winningnum} is correct, YOU WIN!`);
  } else {

    // Wrong number
    guessesleft -= 1;

    if (guessesleft === 0) {
      // Game over- lost
      gameover(false,`Game over,you lost. The correct number was ${winningnum}`, `red`);
    } else {
      // Game continues - answer wrong

      // Change border color
      guessinput.style.borderColor = "red";

      // Clear input
      guessinput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesleft} guesses left`,`red`);
    }
  }
});

// Game over
function gameover(won,msg){
   let color;
   won === true ? color = 'green' : color = 'red';

  // Disable input
  guessinput.disabled = true;
  
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again
  guessbtn.value = 'Play Again';
  guessbtn.className += 'play-again';
}

// Get winning number
function getrandomnum(min,max){
   return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
