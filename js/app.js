//to do: Reset Button.
//        put the tile back to inital when no mathced pairs
// if matched, make them stay opened
//check challenge descruption.

$(document).ready(function() {
    var tiles = [];
    for(var i = 1; i <= 32; i++) {
        tiles.push({
            tileNum: i,
            src: 'img/tile' + i + '.jpg',
            clicked: false
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


    $('#resetButton').hide();

    $('#startButton').click(function() {

        var matchedPairs = 0;
        var wrongPairs = 0;
        var remainingPairs = 0;
        var keyToCheck;

        $('#matches').text('Matched: ' + matchedPairs);
        $('#mistakes').text('Mistakes: ' + wrongPairs);
        $('#remaining').text('Remaining: ' + remainingPairs);

        $('#resetButton').show();
        $('#startButton').hide();
        var startTime = _.now();

        timer = window.setInterval(function() {
            var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
            if(elapsedSeconds > 100) {
                window.clearInterval(timer);
            }
            $('#elapsedSeconds').text('Elapsed Time: ' + elapsedSeconds);


        }, 1000);

        var past;

        $('#game-board img').click(function() {
            var img = $(this);
            var tile = img.data('tile');
            console.log(tile.clicked); // chck if it is clicked
            img.fadeIn(100, function() {
                if(tile.clicked == false) {
                    img.attr('src', tile.src);
//                    tile.clicked = true;
                }

            }); //fade effects


            if(!past) {
                past = img;
            }



            //THIS NEEDS MORE DEBUGGING!
            else if (past[0] != img[0]) {
                console.log(tile.clicked);
                if((past[0].src == img[0].src) && (tile.clicked == false)) { // NEED HELP IN THIS!
                    matchedPairs += 1;
                    $('#matches').text('Matched: ' + matchedPairs);
                } //match found

                else {

                    console.log('WRONG!');
                    var prev = past;

                    prev.fadeOut(100, function() {
                        prev.attr('src', 'img/tile-back.png');
                        prev.clicked = false;
                    });
                    prev.fadeIn(100);

                    img.fadeOut(100, function() {
                        img.attr('src', 'img/tile-back.png');
                        tile.clicked = false;
                    });
                    img.fadeIn(100);

                } //wrong pair

                past = null;
            }

//

            tile.clicked = true;




        }); //when Images are clicked




    });

    $('#resetButton').click(function() {
        resetTimer(); //reset the timer
        //reset the images? how?!
    }); //when reset button is clicked

    function resetTimer() {
        window.clearInterval(timer);
        var startTime = _.now();
        timer = window.setInterval(function () {
            var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
            if (elapsedSeconds > 10) {
                window.clearInterval(timer);
            }
            $('#elapsedSeconds').text('Elapsed Time: ' + elapsedSeconds);
        }, 1000);
    }

});


var timer; //global variable to set the timer back to 0 again.