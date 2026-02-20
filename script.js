let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses : 0,
  ties :0
};


/*
if (score === null){
  score = {
    wins : 0,
    losses : 0,
    ties :0
  }
}

*/

updateScore();

let autoPlaying = false;
let intervalID;


function autoPlay(){
  if(!autoPlaying){
      intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    autoPlaying = true;
  }else {
    clearInterval(intervalID);
    autoPlaying = false;
  }
  
}

document.querySelector('.js-rock-button').addEventListener('click',() =>{playGame('rock')});
document.querySelector('.js-paper-button').addEventListener('click',() =>{playGame('paper')});
document.querySelector('.js-scissor-button').addEventListener('click',() =>{playGame('scissors')});

document.body.addEventListener('keydown', (event) => {
  if(event.key==='r')
    playGame('rock');
  else if(event.key==='p')
          playGame('paper');
        else if(event.key==='s')
                playGame('scissors')
});


function playGame(playerMove){
  const computerMove = pickComputerMove();

  let result = '';
  
  if(playerMove === 'rock'){
    if(computerMove === 'rock')
      result = 'tie.';
    if(computerMove === 'paper')
      result = 'you lose.'
    if (computerMove === 'scissors')
      result = 'you win.'
  }else if(playerMove === 'paper'){
            if(computerMove === 'rock')
              result = 'you win.';
            if(computerMove === 'paper')
              result = 'tie.'
            if (computerMove === 'scissors')
              result = 'you lose.'
        }else if(playerMove === 'scissors'){
                if(computerMove === 'rock')
                  result = 'you lose.';
                if(computerMove === 'paper')
                  result = 'you win.';
                if (computerMove === 'scissors')
                  result = 'tie.';
              }
  if(result === 'you win.'){
    score.wins += 1 ;
  }
  if(result === 'you lose.'){
    score.losses += 1 ;
  }
  if(result === 'tie.'){
    score.ties += 1 ;
  }


  localStorage.setItem('score', JSON.stringify(score));
  
  updateScore();

  document.querySelector('.js-result').innerHTML = result;

  
  document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon">    <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer `;

  
 /* alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}.
wins : ${score.wins}, losses : ${score.losses}, tie : ${score.tie}`);
*/
  
}

function updateScore() {
  document.querySelector('.js-score').innerHTML = `wins : ${score.wins}, losses : ${score.losses},  ties : ${score.ties}`;
  
}


function pickComputerMove(){
  const randomNumber = Math.random();
  if(randomNumber >=0 && randomNumber < 1/3)
    return 'rock';
  if(randomNumber >=1/3 && randomNumber < 2/3)
    return 'paper';
  if(randomNumber >=2/3 && randomNumber <=3)
    return 'scissors';
}



