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
let count;
let start;
let end;

function newGame() {
    shuffle(deck);
    $('.deck').empty();
    count = 0;
    $('.moves').text(count);
    open = [];

    $('.stars').empty();
    $('.stars').append('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');

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
    card.toggleClass('match');
    if (open.length == 0) {
        card.off();
        open.push(card);
        if (count == 0) {
            start = new Date();
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

function increaseScore(){
    count++;
    $('.moves').text(count);
    if (count == 10) {
        $('.fa-star').first().remove();
    }
    if (count == 16) {
        $('.fa-star').first().remove();
    }
}

function checkMatch(){
    increaseScore();
    if (open[0][0].innerHTML == open[1][0].innerHTML) {
        matched.push(open[0], open[1]);

        for (i in matched.length) {
            $(matched[i]).toggleClass('match');
        }

        if (matched.length == cardsArray.length) {
            end = new Date();
            console.log('CONGRATS YOU WON IN '+ count + ' MOVES! IT TOOK '+(end-start)/1000+" seconds");
        }
        open.length = 0;
    }else {
        open[0].toggleClass('match');
        open[1].toggleClass('match');
        open.length = 0;
    }
}

$('.restart').click(function() {
    newGame();
})

newGame();