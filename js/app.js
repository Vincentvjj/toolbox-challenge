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
    console.log(pairedTiles);

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

    // I think i should put this in the click function

    var startTime = _.now();
    var timer = window.setInterval(function() {
        var elapsedSeconds = Math.floor((_.now() - startTime)/ 1000);
        $('#elapsedSeconds').text(elapsedSeconds);
        if(elapsedSeconds >= 10) {
            window.clearInterval(timer)
        }
    }, 1000);


});