let choice = '';
let choice2 = '';
let gameStarted = false;
let attempts = 0;
let firstSelection;
let secondSelection;

starRatingAttempts = document.querySelector('.star-rating');



restart = document.getElementById('restart');


$('.start').on('click', function () {
    //start timer
    // reset all things
    let cardArray = [];
    cardArray = document.querySelectorAll('.card');
    

    let i = 0;

    cardArray.forEach(e => {
        let fillArray = (e) => {

            
            //num = Math.floor(Math.random() * Math.floor(2));
            if (findRandom() % 2) { 
                e.innerHTML = "X";
            }
            else {
                e.innerHTML = "O";
            }

            i++;
        };

        fillArray(e);
    });

    function findRandom() {
        
       let num = Math.floor(Math.random() * Math.floor(cardArray.length));
       
       return num;
    }

    attempts = 0;
    starRatingAttempts.innerHTML = attempts;
    gameStarted = true;
    console.log(gameStarted);
    console.log('game started');
});

// let o = card.innerHTML;

$('.card').on('click', function () {

    if (gameStarted) {
        if (choice.length > 0) {
            secondSelection = this;
            choice2 = this.innerHTML;
            console.log('Second Choice' + choice2)
            checkWinner(secondSelection, firstSelection);
        } else {
            firstSelection = this;
            choice = this.innerHTML;
            console.log('First Choice' + choice);
            return firstSelection;
        }
    }
});

function checkWinner(firstSelection, secondSelection) {
    if (choice === choice2) {
        firstSelection.innerHTML = '';
        secondSelection.innerHTML = '';
        choice = '';
        choice2 = '';
    } else {
        attempts += 1;
        starRatingAttempts.innerHTML = attempts;
        choice = '';
        choice2 = '';
        console.log('resetting cards');
    }

}




restart.addEventListener('click', () => {
    attempts = 0;
    starRatingAttempts.innerHTML = attempts;
    choice = '';
    choice2 = '';
});