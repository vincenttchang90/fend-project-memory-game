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

let cardsArray = [];
let deck = $('.card');
let open = [];
let matched = [];
let count = 0;
let start;
let end;
let formattedTime;
let stars = 3;

function newGame() {
    shuffle(deck);
    $('.deck').empty();
    count = 0;
    $('.moves').text(count);
    open = [];
    stars = 3;
    $('.modal').css('display', 'none');
    $('.score-panel .fa-star-o').attr('class', 'fa fa-star');
    clearInterval(runtime);
    $('.clock').text('00:00');
    
    $(deck).each(function(card){
        $(deck[card]).attr('class', 'card');
        $('.deck').append(deck[card]);
        cardsArray.push(deck[card]);
    });

    $('.card').not(".match").click(function() {
        clicker($(this));
    });
}

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

function displayModal() {
    $('.modal').css('display', 'block');
    $('.endMoves').text(count);
    $('.endTime').text(formattedTime);
    $('.endStars').empty().append($('.stars').clone());
}

function increaseScore(){
    count++;
    $('.moves').text(count);
    if (count == 11) {
        $('.score-panel .fa-star').last().attr('class', 'fa fa-star-o');
        stars--;
    }
    if (count == 17) {
        $('.score-panel .fa-star').last().attr('class', 'fa fa-star-o');
        stars--;
    }
}

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

$('#reset-button').click(function(){
    newGame();
})

$('.restart').click(function() {
    newGame();
})

newGame();