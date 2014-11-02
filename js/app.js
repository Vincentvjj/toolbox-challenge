/*
Author: Vincent Jonany
Date: 11/1/2014
Description: memory game challenge info 343
*/

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
    row.css('width', '100%');
    var img;

    _.forEach(pairedTiles, function (tile, elemIndex) {
        if (elemIndex > 0 && 0 == elemIndex % 4) {
            gameBoard.append(row);
            row = $(document.createElement('div'));
            row.css('width', '100%');

        }
        img = $(document.createElement('img'));
        img.css('width', '10%');
        img.css('height', '10%');
        img.attr({
            src: 'img/tile-back.png',
            alt: 'image of tile ' + tile.tileNum
        });
        img.data('tile', tile);
        row.append(img);
    });

    gameBoard.append(row);

    $('#startButton').click(onClick);

    $('#resetButton').click(function () {
        $('#win-screen').fadeOut(100);
        $('#resetButton').fadeOut(100);
        $('#game-board').css('opacity', '1');
        $('#info').css('opacity', '1');
        $('#game-board').empty();
        $('#game-board').hide();

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
    $('#game-board').fadeIn(300);
    $('#instructions').hide();
    $('#background').css('background-image', 'url(img/background.jpg)');
    $('#matches').text('Matched: ' + matchedPairs);
    $('#mistakes').text('Mistakes: ' + wrongPairs);
    $('#remaining').text('Remaining: ' + remainingPairs);
    $('#startButton').hide();

    var startTime = _.now();

    timer = window.setInterval(function () {
        elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
        $('#elapsedSeconds').text('Elapsed Time: ' + elapsedSeconds + 's');
    }, 1000);

    var past;
    var resetting;

    $('#game-board img').click(function () {

        if(resetting) {
            return;
        }

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
        else if (past[0] != img[0]) {

            var prev = past;
            var prevTile = prev.data('tile');

            if (past[0].src == img[0].src) {

                matchedPairs++;
                $('#matches').text('Matched: ' + matchedPairs);
                remainingPairs = 8 - matchedPairs;
                if(remainingPairs == 0 || matchedPairs == 8) {
                    window.clearInterval(timer);

                    $('#game-board').css('opacity', '0.4');
                    $('#info').css('opacity', '0.4');
                    $('#timeMsg').text('Elapsed Time: ' + elapsedSeconds + 's');
                    $('#win-screen').fadeIn(300);
                    $('#resetButton').fadeIn(300);
                    $('#audio')[0].play();
                } //game won
                prevTile.matched = true;
                tile.matched = true;
            } //match found

            else {
                resetting = true;
                setTimeout(function() {
                    prev.fadeOut(100, function () {
                        prev.attr('src', 'img/tile-back.png');
                        prevTile.clicked = false;
                        prev.fadeIn(100);
                    });

                    img.fadeOut(100, function () {
                        img.attr('src', 'img/tile-back.png');
                        tile.clicked = false;
                        img.fadeIn(100);
                    });
                    resetting = false;
                }, 1000);

                wrongPairs++;
                $('#mistakes').text('Mistakes: ' + wrongPairs);
            } //wrong pair

            $('#remaining').text('Remaining: ' + remainingPairs);
            past = null;
        }
    }); //when Images are clicked
}

var matchedPairs = 0;
var wrongPairs = 0;
var remainingPairs = 8;
var timer; //global variable to set the timer back to 0 again.
var elapsedSeconds;