//TO DO: check line 114
// add feedbacks or rules or instruction.
// if users win? Give sort of a congratulation message, but still show the start over button.

$(document).ready(startGame);
function startGame() {

    var tiles = [];
    for (var i = 1; i <= 32; i++) {
        tiles.push({
            tileNum: i,
            src: 'img/tile' + i + '.jpg',
            clicked: false,
            matched: false // new property
        });
    }

    var shuffledTiles = _.shuffle(tiles);

    var selectedTiles = shuffledTiles.slice(0, 8);
    var pairedTiles = [];

    _.forEach(selectedTiles, function (tile) {
        pairedTiles.push(_.clone(tile));
        pairedTiles.push(_.clone(tile));
    });

    pairedTiles = _.shuffle(pairedTiles);

    var gameBoard = $('#game-board');

    var row = $(document.createElement('div'));
    var img;

    _.forEach(pairedTiles, function (tile, elemIndex) {
        if (elemIndex > 0 && 0 == elemIndex % 4) {
            gameBoard.append(row);
            row = $(document.createElement('div'));
        }
        img = $(document.createElement('img'));
        img.attr({
            src: 'img/tile-back.png',
            alt: 'image of tile ' + tile.tileNum
        });
        img.data('tile', tile);
        row.append(img);
    });

    gameBoard.append(row);

    $('#resetButton').hide();

    $('#startButton').click(onClick);

    $('#resetButton').click(function () {

        $('#game-board').empty();

        matchedPairs = 0;
        wrongPairs = 0;
        remainingPairs = 8;

        $('#remaining').text('Remaining: ' + remainingPairs);
        $('#mistakes').text('Mistakes: ' + wrongPairs);
        $('#matches').text('Matched: ' + matchedPairs);
        window.clearInterval(timer);
        startGame();
        $('#resetButton').show();
        onClick();

    }); //when reset button is clicked
}


function onClick() {

    $('#matches').text('Matched: ' + matchedPairs);
    $('#mistakes').text('Mistakes: ' + wrongPairs);
    $('#remaining').text('Remaining: ' + remainingPairs);

    $('#resetButton').show();
    $('#startButton').hide();
    var startTime = _.now();

    timer = window.setInterval(function () {
        elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
        $('#elapsedSeconds').text('Elapsed Time: ' + elapsedSeconds);


    }, 1000);

    var past;

    $('#game-board img').click(function () {

//        if (flipping == true) {
//            alert();
//        }

        var img = $(this);
        var tile = img.data('tile');
        img.fadeIn(100, function () {
            if (tile.clicked == false) {
                img.attr('src', tile.src);
                tile.clicked = true;
            }
        }); //fade effects

        if (tile.matched == true) {
            return;
        }

        if (!past) {
            past = img;
        }

        //THIS NEEDS MORE DEBUGGING!
        else if (past[0] != img[0]) {
            var prev = past;
            var prevTile = prev.data('tile');

            if (past[0].src == img[0].src) {

                matchedPairs++;
                $('#matches').text('Matched: ' + matchedPairs);
                remainingPairs = 8 - matchedPairs;
                if(remainingPairs == 0 || matchedPairs == 8) {
                    window.clearInterval(timer);
                }
                prevTile.matched = true;
                tile.matched = true;

            } //match found

            else {

                setTimeout(function() {
//                    flipping = true;
                    prev.fadeOut(100, function () {
                        prev.attr('src', 'img/tile-back.png');
                        prevTile.clicked = false;
                    });
                    prev.fadeIn(100);

                    img.fadeOut(100, function () {
                        img.attr('src', 'img/tile-back.png');
                        tile.clicked = false;
                    });
                    img.fadeIn(100);

                }, 1000);

//                flipping = false;
                wrongPairs++;
                $('#mistakes').text('Mistakes: ' + wrongPairs);

            } //wrong pair

            $('#remaining').text('Remaining: ' + remainingPairs);
            past = null;

        }

    }); //when Images are clicked
}


//var flipping = false;
var matchedPairs = 0;
var wrongPairs = 0;
var remainingPairs = 8;
var timer; //global variable to set the timer back to 0 again.
var elapsedSeconds;