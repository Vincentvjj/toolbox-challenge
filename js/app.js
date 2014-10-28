$(document).ready(function() {
    var tiles = [];
    for(var i = 1; i <= 32; i++) {
        tiles.push({
            tileNum: i,
            src: 'img/tile' + i + '.jpg'
        });
    }

    var shuffledTiles = _.shuffle(tiles);

    var selectedTiles = shuffledTiles.slice(0, 8);
    var pairedTiles = [];
    _.forEach(selectedTiles, function(tile) {
        pairedTiles.push(_.clone(tile));
        pairedTiles.push(_.clone(tile));
    });

    pairedTiles = _.shuffle(pairedTiles);

    var gameBoard = $('#game-board');
    var row = $(document.createElement('div'));
    var img;
    _.forEach(pairedTiles, function(tile, elemIndex) {
        if(elemIndex > 0 && 0 == elemIndex % 4) {
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


    $('#resetButton').hide()

    $('#startButton').click(startFunction);


    function startFunction() {
        window.clearInterval(timer);
        $('#resetButton').show()
        $('#startButton').hide();
        var startTime = _.now();

        timer = window.setInterval(function () {
            var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
            if (elapsedSeconds > 10) {
                window.clearInterval(timer);
            }
            $('#elapsedSeconds').text('Elapsed Time: ' + elapsedSeconds);


        }, 1000);


        $('#game-board img').click(function () {
            var img = $(this);
            var tile = img.data('tile');
            img.fadeOut(100, function() {
                if(tile.clicked) {
                    img.attr('src', 'img/tile-back.png');
                }
                else {
                    img.attr('src', tile.src);
                }
                tile.clicked = !tile.clicked;
                img.fadeIn(100);
            }); //fade effects
        }); //when Images are clicked



        var matchedPairs = 0; // make these functions then return number of pairs
        var wrongPairs = 0;
        var remainingPairs = 0;


        $('#matches').text('Matched: ' + matchedPairs);
        $('#mistakes').text('Mistakes: ' + wrongPairs);
        $('#remaining').text('Remaining: ' + remainingPairs);

    }

    $('#resetButton').click(function() {
        resetTiles();
        startFunction();


    }); //when reset button is clicked




});

function resetTiles() {
    //HOW TO RESET THE TILE :(((
    $('#game-board img').replaceWith('img/tile-back.png'); //YEAH IDK ABOUT THIS

}

var timer; //global variable to set the timer back to 0 again.