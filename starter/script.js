'use strict';

// selecting elements 
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
// fixing the ptoblem of scoping
    let scores , currentScore , activePlayer , playing;
// stariting Conditions
const init = function(){
    score0El.textContent = 0;
    score1El.textContent = 0;
    scores = [0 , 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);
}
init();
// function to switch the player

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener("click", function(){
   if (playing){
        // 1===> generating a random dice roll

        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        // 2 ===> display the dice roll
        diceEl.classList.remove('hidden');

        diceEl.src = `dice-${dice}.png`;
    

        // 3 ===> if dice is 1 then swrich to the next player

        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }else{
            switchPlayer();
        }
   }
})

btnHold.addEventListener('click', function (){
    if (playing){
        // 1 ===> add current score to Active player socre 
        scores[activePlayer] += currentScore;
        console.log(scores[activePlayer]);
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2 ===> check if players score is > 100 
        // if so then finish the game and
        // if not switch to the next player and

        if(scores[activePlayer] > 10 ){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
            diceEl.classList.add('hidden');
        }else{
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init)