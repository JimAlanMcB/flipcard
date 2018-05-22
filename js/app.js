let choice = '';
let choice2 = '';
let gameStarted = false;
let attempts = 0;

starRatingAttempts = document.querySelector('.star-rating');

restart = document.getElementById('restart');
$('.start').on('click', function () {
    //start timer
    // reset all things
    gameStarted = true;
    console.log(gameStarted);
    console.log('game started');
});

// let o = card.innerHTML;

$('.card').on('click', function () {
    if (gameStarted) {
        if (choice.length > 0) {
            choice2 = this.innerHTML;
            console.log('Second Choice' + choice2)
            checkWinner();
        } else {
            choice = this.innerHTML;
            console.log('First Choice' + choice);

        }
    }
});

function checkWinner() {
    if (choice === choice2) {
        alert('You Win!');
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
    choice = '';
    choice2 = '';
});