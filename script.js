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

document.querySelector('.js-rock-button').addEventListener('click',() =>{playGame('Rock')});
document.querySelector('.js-paper-button').addEventListener('click',() =>{playGame('Paper')});
document.querySelector('.js-scissor-button').addEventListener('click',() =>{playGame('Scissors')});

document.body.addEventListener('keydown', (event) => {
  if(event.key==='r')
    playGame('Rock');
  else if(event.key==='p')
          playGame('Paper');
        else if(event.key==='s')
                playGame('Scissors')
});


function playGame(playerMove){
  const computerMove = pickComputerMove();

  let result = '';
  
  if(playerMove === 'Rock'){
    if(computerMove === 'Rock')
      result = 'tie.';
    if(computerMove === 'Paper')
      result = 'you lose.'
    if (computerMove === 'Scissors')
      result = 'you win.'
  }else if(playerMove === 'Paper'){
            if(computerMove === 'Rock')
              result = 'you win.';
            if(computerMove === 'Paper')
              result = 'tie.'
            if (computerMove === 'Scissors')
              result = 'you lose.'
        }else if(playerMove === 'Scissors'){
                if(computerMove === 'Rock')
                  result = 'you lose.';
                if(computerMove === 'Paper')
                  result = 'you win.';
                if (computerMove === 'Scissors')
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

  
  document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.PNG" class="move-icon">    <img src="images/${computerMove}-emoji.PNG" class="move-icon"> Computer `;

  
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
    return 'Rock';
  if(randomNumber >=1/3 && randomNumber < 2/3)
    return 'Paper';
  if(randomNumber >=2/3 && randomNumber <=3)
    return 'Scissors';
}



