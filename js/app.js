let choice = '';
let choice2 = '';
let gameStarted = false;
let running = false;
let attempts = 0;
let moves = 0;
let firstSelection;
let secondSelection;

let cardArray = [];
cardArray = document.querySelectorAll('.back');


let currentMoves = document.querySelector('.moves');
let starRatingAttempts = document.querySelector('.attempts');
let restart = document.querySelector('#restart');



$('.start').on('click', function () {

    checkTimer();
    fillStars();
    randomizeCards();
    startGame();

});

function startGame() {
    attempts = 0;
    moves = 0;
    clearChoices();
    currentMoves.innerHTML = 'Current Moves: ' + moves;
    starRatingAttempts.innerHTML = 'Attempts: ' + attempts;
    gameStarted = true;
}

// $('.front').on('click', function (e){
//     flipCards(e.target);
// });

$('.card').on('click', function (e) {
    console.log(e.target);

    if (gameStarted) {
        if ($(e.target).css('transform').length > 10) {
            
            $(e.target).css('transform', '');
            $(e.target).prev().css('transform', '');
        } else
            flipCards(e.target);
        if (choice.length > 0) {
            secondSelection = this.lastElementChild;
            choice2 = this.lastElementChild.innerHTML;
            console.log('Second Choice' + choice2)
            checkWinner(secondSelection, firstSelection);
        } else {
            firstSelection = this.lastElementChild;
            choice = this.lastElementChild.innerHTML;
            console.log('First Choice' + choice);
            return firstSelection;
        }
    } else {
        alert('start the game first');
    }
});

function flipCards(e) {

    $(e).css('transform', 'rotateY(180deg)');
    $(e.nextElementSibling).css('transform', 'rotateY(360deg)');
}

function checkWinner(firstSelection, secondSelection) {
    if (firstSelection == secondSelection) {
        setTimeout(clearChoices, 1000);
        return;
    }
    if (choice === choice2) {
        firstSelection.innerHTML = '';
        secondSelection.innerHTML = '';
        console.log(firstSelection + 'first selection div');
        setTimeout(clearChoices, 1000);
        moves += 1;
        currentMoves.innerHTML = 'Current Moves: ' + moves;
        if (moves === cardArray.length / 2) {
            console.log('winner');
            alert('winner winner chicken dinner');
            running = false;
            clearTimer();
            return;
            // stop timer
            // show stars
            // ask to restart game
        }

    } else {
        attempts += 1;
        setTimeout(clearChoices, 1000);
        starRatingAttempts.innerHTML = 'Attempts: ' + attempts;
        adjustStarRating(attempts);
    }

}

function clearChoices() {

    $('.back').css('transform', '');
    $('.front').css('transform', '');
    choice = '';
    choice2 = '';
}

function adjustStarRating(attempts) {
    let stars = document.querySelector('.star-filled');
    if (attempts > 2) {
        stars.remove();
        // need to add multiple checks instead of just one. 
    }
}

function fillStars() {
    for (var x = 0; x < 3; x++) {
        $('.star-filled').remove();
    }
    for (var i = 0; i < 3; i++) {
        $('.star-rating').append('<span class="fa fa-star star-filled"></span>');
        console.log('test');
    }
}


function startTimer(duration, display) {
    running = true;
    let totalTimeView = document.querySelector('.timer');
    var timer = duration * 0,
        minutes,
        seconds;

    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        if (minutes > 0) {
            seconds = seconds < 10 ? "0" + seconds : seconds;
        }
        if (minutes < 1) {
            totalTimeView.innerHTML = seconds;
        } else {
            totalTimeView.innerHTML = minutes + ":" + seconds; //showTimeView
        } //debugger;

        if (running == false) {
            clearTimer();
            return;
        } else {
            if (timer++ < 0) {
                timer = duration;
            }

        }
    }, 1000);

}

function clearTimer() {
    for (var i = 1; i < 999999; i++) clearInterval(i);
}

function checkTimer() {
    if (running) {
        running = false;
        clearTimer();
    }
    startTimer(60);
};


function randomizeCards() {
    let i = 0;

    cardArray.forEach(e => {
        let fillArray = (e) => {

            if (findRandom() % 2) {
                e.innerHTML = "X";
            } else {
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
}