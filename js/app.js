//shuffles cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//declards global variables
let cardsArray = [];
let deck = $('.card');
let open = [];
let matched = [];
let count = 0;
let start;
let end;
let formattedTime;
let stars = 3;

//starts a new game
function newGame() {
    //sets default values
    shuffle(deck);
    $('.deck').empty();
    count = 0;
    $('.moves').text(count);
    open = [];
    cardsArray = [];
    matched = [];
    stars = 3;
    $('.modal').css('display', 'none');
    $('.score-panel .fa-star-o').attr('class', 'fa fa-star');
    clearInterval(runtime);
    $('.clock').text('00:00');

    //creates a new game board
    $(deck).each(function(card){
        $(deck[card]).attr('class', 'card');
        $('.deck').append(deck[card]);
        cardsArray.push(deck[card]);
    });

    //assigns a click listener to cards that have not been matched
    $('.card').not(".match").click(function() {
        clicker($(this));
    });

    //making game responsive
    let width = $('.deck').width();
    let pad = width*.04848;
    let cardWidth = $('.deck .card').width();
    $('.deck .card').height(cardWidth);
    $('.deck').height(width);
    $('.deck').css('padding', pad+'px');
}

//defines what happens when a card is clicked
function clicker(card) {
    card.toggleClass('open show');
    if (open.length == 0) {
        card.off();
        open.push(card);
        if (count == 0) {
            start = new Date();
            clock();
        }
    }else {
        $('.card').off();
        open.push(card);
        setTimeout(function() {
            checkMatch();
            $('.card').not(".match").click(function() {
            clicker($(this));
            });
        }, 500)
    }
}

let runtime = 0;

//basic timer functionality
function clock(){
    runtime = setInterval(function(){
        let now = new Date();
        let distance = now - start;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        seconds = seconds < 10 ? '0'+seconds : seconds;
        formattedTime = minutes+':'+seconds;
        $('.clock').text(formattedTime);
    }, 1000)
}

//dynamically displays modal when player wins game
function displayModal() {

    if ($('.deck').width() < 660) {
        $('.modal').width($('.deck').width());
    }

    $('.modal').css('display', 'block');
    $('.endMoves').text(count);
    $('.endTime').text(formattedTime);
    $('.endStars').empty().append($('.stars').clone());
}

//updates star rating and click count
function increaseScore(){
    count++;
    $('.moves').text(count);
    if (count == 13) {
        $('.score-panel .fa-star').last().attr('class', 'fa fa-star-o');
        stars--;
    }
    if (count == 17) {
        $('.score-panel .fa-star').last().attr('class', 'fa fa-star-o');
        stars--;
    }
}

//checks to see if the cards match and if game is complete
function checkMatch(){
    increaseScore();
    if (open[0][0].innerHTML == open[1][0].innerHTML) {
        matched.push(open[0], open[1]);

        for (let i in open) {
            $(open[i]).toggleClass('open show match');
        }

        if (matched.length == cardsArray.length) {
            end = new Date();
            clearInterval(runtime);
            displayModal();
        }
        open.length = 0;
    }else {
        open[0].toggleClass('open show');
        open[1].toggleClass('open show');
        open.length = 0;
    }
}

//makes game responsive
$(window).resize(function() {
    let width = $('.deck').width();
    let pad = width*.04848;
    let cardWidth = $('.deck .card').width();
    $('.deck').height(width);
    $('.deck').css('padding', pad+'px');
    $('.deck .card').height(cardWidth);
})

//modal reset button
$('#reset-button').click(function(){
    newGame();
})

//reset button
$('.restart').click(function() {
    newGame();
})

//runs game
newGame();