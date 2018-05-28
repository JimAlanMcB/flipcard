// TODO:: make sure x's and o's are even -- done
// add imgs instead of letters -- done
// edit css to make pretty
// fix star rating to reflect attempts correctly not just after 2 misses. 
// shuffle cards randomly


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
    currentMoves.innerHTML = 'Correct Flips: ' + moves;
    starRatingAttempts.innerHTML = 'Incorrect Flips: ' + attempts;
    gameStarted = true;
}

$('.card').on('click', function (e) {


    if (gameStarted) {


        if ($(e.target).css('transform').length > 10) {

            $(e.target).css('transform', '');
            $(e.target).prev().css('transform', '');
        } else
            flipCards(e.target);
        if (choice.length > 0) {
            secondSelection = this.lastElementChild;
            choice2 = this.lastElementChild.innerHTML;
            console.log('Second Choice ' + choice2)
            checkWinner(secondSelection, firstSelection);
        } else {
            firstSelection = this.lastElementChild;
            choice = this.lastElementChild.innerHTML;
            console.log('First Choice ' + choice);
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
        clearChoices();
        return;
    }
    if (choice === choice2) {
        //setTimeout(clearSelections, 1000);
        clearSelections();
        clearChoices();
        moves += 1;
        currentMoves.innerHTML = 'Correct Flips: ' + moves;
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
        choice = '';
        choice2 = '';
        setTimeout(clearChoices, 1000);
        starRatingAttempts.innerHTML = 'Incorrect Flips: ' + attempts;
        adjustStarRating(attempts);
    }

}

function clearSelections() {
    $(firstSelection).prev().hide();
    $(secondSelection).prev().hide();
    firstSelection.innerHTML = '';
    secondSelection.innerHTML = '';
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
            totalTimeView.innerHTML = minutes + ":" + seconds;
        }

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

    $('.front').show();

    let iconArray = ['&#xf1b9;', '&#xf206;', '&#xf0fb;', '&#xf1e3;', '&#xf0eb;', '&#xf1b0;', '&#xf135;', '&#xf2dc;']

    let cardIconArray = [];
    let schuffleArray = [];

    cardArray.forEach(e => {
        schuffleArray.push(e);
    });

    schuffleArray.forEach(e => {


        let fillArray = (e) => {

            num = findRandom();
            cardIconArray.push(iconArray[num]);
            cardIconArray.push(iconArray[num]);

        };
        fillArray(e);

    });
    //Fisher-Yates Shuffle - bost.ocks.org/mike/shuffle
    function shuffle(array) {
        let m = array.length,
            t, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }
    shuffle(schuffleArray);
    for (let i = 0; i < schuffleArray.length; i++) {
        schuffleArray[i].innerHTML = cardIconArray[i];
    }

    function findRandom() {
        let num = Math.floor(Math.random() * Math.floor(iconArray.length));
        return num;
    }

}