// TODO::  

// USE CONST WHERE POSSIBLY (MAYBE)
// STOP TIMER BUTTON -- NEED TO ADJUST
// FLIP CARDS FIRST TO SHOW ALL
// EASY MODE / HARD MODE  
// STORE DATA / LEADER BOARD
// FANCY UP MORE
let cardFlipSound = new Audio("sounds/cardflip.wav");
cardFlipSound.preload = "auto";
let winAudio = new Audio("sounds/win.wav");
winAudio.preload = "auto";
let popAway = new Audio("sounds/popaway.wav");
popAway.preload = "auto";
let bgMusic = new Audio("sounds/Toys.mp3");
bgMusic.preload = "auto";
let totalWinCount = 0;
let choice2 = '';
let gameStarted = false;
let running = false;
let attempts = 0;
let moves = 0;
let firstSelection;
let secondSelection;
// let cardAmount = 8;
// let gameMode = ''; FOR GAME MODES

let cardArray = [];
cardArray = document.querySelectorAll('.back');


let currentMoves = document.querySelector('.moves');
let starRatingAttempts = document.querySelector('.attempts');
let restart = document.querySelector('#restart');
let pause = document.querySelector('.pause');
let winPopUp = document.querySelector('.winPopUp');
let winText = document.querySelector('.winText');

fillStars();

//fillCards(); // FOR GAME MODES


// START GAME ON CLICK
// REMOVE POP UP
// CHECK IF TIMER IS RUNNING, FILL NEW STARS, RANDOM CARDS, START THE GAME
$('.start').on('click', function () {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic.play();
    winPopUp.style.display = "none";
    checkTimer();
    fillStars();
    randomizeCards();
    startGame();

});

// FOR PAUSE BUTTON
// $('.stop').on('click', function () {
//    clearTimer();   
//    $('.card').css('pointer-events', 'none');
// });

// RESET ALL AND START GAME
function startGame() {

    attempts = 0;
    moves = 0;
    clearChoices();
    currentMoves.innerHTML = 'Correct Flips: ' + moves;
    starRatingAttempts.innerHTML = 'Incorrect Flips: ' + attempts;
    gameStarted = true;
}

// EACH CARD CLICK - 
// APPLY THE CSS TRANSFORM FOR FLIP ANIMATION
// AND DETERMINE IF IT'S A WINNER OR NOT
$('.card').on('click', function (e) {
    cardFlipSound.pause();
    if (gameStarted) {
        cardFlipSound.play();

        if ($(e.target).css('-webkit-transform').length > 10) {

            $(e.target).css('-webkit-transform', '');
            $(e.target).prev().css('-webkit-transform', '');
        } else
            flipCards(e.target);
        if (choice.length > 0) {
            secondSelection = this.lastElementChild;
            choice2 = this.lastElementChild.innerHTML;
            checkWinner(secondSelection, firstSelection);
        } else {
            firstSelection = this.lastElementChild;
            choice = this.lastElementChild.innerHTML;
            return firstSelection;
        }
    } else {
        // pass
    }
});

function flipCards(e) {

    $(e).css('-webkit-transform', 'rotateY(179deg)');
    $(e.nextElementSibling).css('-webkit-transform', 'rotateY(359deg)');
}

function checkWinner(firstSelection, secondSelection) {
    if (firstSelection == secondSelection) {
        clearChoices();
        return;
    }
    if (choice === choice2) {

        setTimeout(() => {
            popAway.play();
            clearSelections();
            clearChoices();
        }, 500);

        moves += 1;
        currentMoves.innerHTML = 'Correct Flips: ' + moves;
        if (moves === cardArray.length / 2) {

            // ADD TOTAL WIN COUNT
            // TIMER RUNNING FALSE
            // STOP TIMER
            // CLEAR CHOICES AND SELECTIONS
            // SEND WINNING MESSAGE
            winAudio.play();
            totalWinCount += 1;
            running = false;
            clearTimer();
            clearChoices();
            clearSelections();
            displayWinMessage();
            return;

        }

    } else {
        attempts += 1;
        clearClicks();
        setTimeout(clearChoices, 1000);
        starRatingAttempts.innerHTML = 'Incorrect Flips: ' + attempts;
        adjustStarRating(attempts);
    }

}

function displayWinMessage() {

    // POP UP DISPLAY MESSAGE
    // GATHER USEFUL DATA FROM GAME TO DISPLAY
    let totalStars = document.querySelectorAll('.star-filled');
    let totalTimeView = document.querySelector('.timer');
    let getSecOrMin = totalTimeView.innerHTML.length;
    let starOrStars = '';
    let secOrMin = '';
    let timeOrTimes = '';

    if (getSecOrMin < 3) {
        secOrMin = ' seconds';
    } else {
        secOrMin = ' minutes';
    }
    if (totalStars.length === 1) {
        starOrStars = ' star';
    } else {
        starOrStars = ' stars';
    }
    if (totalWinCount === 1) {
        timeOrTimes = ' time';
    } else {
        timeOrTimes = ' times';
    }

    winPopUp.style.display = "block";
    winText.innerHTML = '<h2>YOU WON!</h2>' + 'It took you ' + attempts + ' guesses to win, ' +
        'You recieved ' + totalStars.length + '' + starOrStars + ' , and it took you ' + totalTimeView.innerHTML + ' ' + secOrMin + ' to win!' +
        '<br>You have won a total of ' + totalWinCount + '' + timeOrTimes;

}
let winPopUpSpan = document.getElementsByClassName("close")[0];

winPopUpSpan.onclick = function () {
    winPopUp.style.display = "none";
}

window.onclick = function (e) {
    if (e.target == winPopUp) {
        winPopUp.style.display = "none";
    }
}

function clearClicks() {
    firstSelection = '';
    secondSelection = '';
    choice = '';
    choice2 = '';
}

function clearSelections() {
    $(firstSelection).prev().hide();
    $(secondSelection).prev().hide();
    firstSelection.innerHTML = '';
    secondSelection.innerHTML = '';
}

function clearChoices() {

    $('.back').css('-webkit-transform', '');
    $('.front').css('-webkit-transform', '');
    choice = '';
    choice2 = '';
}

function adjustStarRating(attempts) {
    let currentAttempts = attempts;
    let stars = document.querySelector('.star-filled');
    if (currentAttempts == 7) {
        stars.remove();
    } else if (currentAttempts == 12) {
        stars.remove();
    } else if (currentAttempts == 18) {
        stars.remove();
    }
}

function fillStars() {
    for (var x = 0; x < 3; x++) {
        $('.star-filled').remove();
    }
    for (var i = 0; i < 3; i++) {
        $('.star-rating').append('<span class="fa fa-star star-filled"></span>');

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

// TAKE THE CARDARRAY(ALL OF THE HTML CARDS), AND PUT THEM INTO A NEW ARRAY
// TAKE A RANDOM INDEX FROM ICON ARRAY AND PUSH TWICE TO NEW ARRAY
// SHUFFLE THE ARRAY TO BE FAIR
function randomizeCards() {

    $('.front').show();

    let iconArray = ['&#xf1b9;', '&#xf206;', '&#xf0fb;', '&#xf1e3;', '&#xf0eb;', '&#xf1b0;', '&#xf135;', '&#xf2dc;']

    let cardIconArray = [];
    let shuffleArray = [];

    cardArray.forEach(e => {
        shuffleArray.push(e);
    });

    shuffleArray.forEach(e => {

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
    shuffle(shuffleArray);
    for (let i = 0; i < shuffleArray.length; i++) {
        shuffleArray[i].innerHTML = cardIconArray[i];
    }

    function findRandom() {
        let num = Math.floor(Math.random() * Math.floor(iconArray.length));
        return num;
    }

}
// ------------------------FOR GAME MODES
// function fillCards(){


//     if(gameMode = 'med'){
//         cardAmount = 10;
//     }
//     else if(gameMode = 'hard'){
//         cardAmount = 20;
//     }

//     for(i = 0; i < cardAmount; i++){
//         $('.board').append(` <div class="card">
//         <div class="front"></div>
//         <div class="back fa">X</div>
//         </div>`);
//     }
// }