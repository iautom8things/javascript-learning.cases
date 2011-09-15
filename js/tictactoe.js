/*globals $, console, alert*/
var TTT = TTT || {};

TTT.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = TTT,
        i;
    
    // strip redundant leading global
    if (parts[0] === "TTT") {
        parts = parts.slice(1);
    }
    
    for (i = 0; i < parts.length; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        
        parent = parent[parts[i]];
    }
    return parent;
};

TTT.namespace('TTT.intro');
TTT.namespace('TTT.generateBoard')
TTT.intro = "Before starting any of the lessons, please familiarize yourself with the game of Tic-Tac-Toe! Tips on how to play are provided below the board, if you do not know how to play. \n\nThe objective of each lesson is to break the game in a particular way. It will be your job to figure out what is broken. At any time during a lesson, you may return to the Original Game to compare.";
// Generates a board with the given size and an action to bind an action to clicked
TTT.generateBoard = function (size, action) {
    var i, j, id,
        board = [],
        row_str, 
        row_css = {
            'float' : 'left',
            'clear' : 'left'
        };
    
    for (i = 0; i < size; i += 1) {
        row_str = '<div id="row_' + i +'" class="row"></div>';
        $('#board').append($(row_str).css(row_css));
        for (j = 0; j < size; j += 1) {
            // create a button
            id = i*size+j;
            
            if (action){
                action(i, j, id)();
            }
            board.push({
                    // the button
                    row: i,
                    col: j,
                    id: id
                });
        }
    }
    
    return board;
};

TTT.namespace("TTT.clicked");
TTT.namespace("TTT.square");
TTT.namespace("TTT.game");
TTT.namespace("TTT.css.button.def");
TTT.namespace("TTT.css.button.hilight");
TTT.namespace("TTT.css.button.sel");
TTT.namespace("TTT.css.border.left");
TTT.namespace("TTT.css.border.def");
TTT.namespace("TTT.css.border.bottom");
TTT.namespace("TTT.size");

TTT.size = 3; // Size of board: N x N squares
TTT.css.button.sel = {
    'background-color' : '#dde'
};
TTT.css.button.hilight = {
    'background-color' : '#fc9'
};
TTT.css.button.X = {
    'background-color' : '#f9b'
};
TTT.css.button.O = {
    'background-color' : '#9cf'
};
TTT.css.button.def = {
    'background-color' : '#9ff', // Sky blue
    'width' : '30%',
    'height' : '100px',
    'float' : 'left',
    'clear' : 'none',
    'border' : '1px solid black'
};

TTT.clicked = function (r, c, id) {
    var last_player, css, winner;
    
    if (!TTT.game.gameOver()) {
        if (TTT.game.takeTurn(id)) {
            last_player = TTT.game.last_player();
            if (last_player === 'X') {
                css = TTT.css.button.X;
            }
            else {
                css = TTT.css.button.O;
            }
            if (TTT.game.isBroken()) {
                id = (c * TTT.size) + r;
            }
            $('#' + id).css(css).html('<p>' + last_player + '</p>');
        }
        if (TTT.game.gameOver()) {
            winner = TTT.game.winner();
            alert('Game Over!\nWon by: ' + winner + '!');
        }
    }
};

TTT.game = (function () {
    var board = [], turnsTaken,theWinner,
        gameOver, evaluateBoard, broken = false,
        players = ['X', 'O'],
        original_code = {
            takeTurn : function takeTurn (square) {
                var result = false;
                if (!gameOver && board[square] === '' && square >= 0 && square < 9) {
                    board[square] = players[turnsTaken % 2];
                    turnsTaken += 1;
                    result = true;
                    evaluateBoard(square);
                }
                return result;
            }
        },
        broken_code = {
            takeTurn : function takeTurn (square) {
                // If we had split the board into a 2D array, we'd use x, y to get the cell to play
                // That is, if we divide the cell number by the number of cells in a row, we get
                // the row number.  And if we use modulus, we get the column number.  Since tic-tac-tow
                // is such a small game, I decided to just use a flat array.  So here, I'm mimicking
                // the 2D array, and mixing up the operators: Row should be x, Column should be y...
                var x = Math.floor(square / 3),
                    y = square % 3,
                    row = y,
                    col = x,
                    cell = row*3 + col,
                    result = false;
                    
                if (!gameOver && board[cell] === '' && square >= 0 && square < 9) {
                    board[cell] = players[turnsTaken % 2];
                    turnsTaken += 1;
                    result = true;
                    evaluateBoard(cell);
                }
                return result;
            }
        },
        takeTurnMethod = original_code.takeTurn;
        
    
    function resetBoard () {
        var i;
        for (i = 0; i < 9; i += 1) {
            board[i] = '';
        }
        turnsTaken = 0;
        theWinner = -1;
        gameOver = false;
    }
    
    evaluateBoard = function (square) {
        var result = false, 
            player = board[square],
            row = Math.floor(square / TTT.size),
            i = row * TTT.size,
            j = square % TTT.size, // column
            L2R = 0, R2L = 2; // Diagnols
        
        if (turnsTaken >= 5) { // The fewest number of turns for a 'win'
            result = true;
            //check if row is now completed
            while (Math.floor(i/3) === row && result) {
                result = player === board[i];
                i += 1;
            }
            
            // if not a winning combo on the row, check the column
            if (!result) {
                result = true;
                while (j<9 && result) {
                    result = player === board[j];
                    j += TTT.size;
                }
            }
            // if still not a winning play, check if we're on the L2R diag, and check if play is a win
            if (!result && square % 4 === 0) { // square is on left to right diagnol
                result = true;
                while (L2R < 9 && result) {
                    result = player === board[L2R];
                    L2R += 4;
                }
            }
            if (!result && (square === 2 || square === 4 || square === 6)) {
                result = true;
                while (R2L < 7 && result) {
                    result = player === board[R2L];
                    R2L += 2;
                }
            }
        }
        if (result) {
            theWinner = (turnsTaken - 1) % 2;
        }
        
        gameOver = result;
        return result;
    };
    
    function winner () {
        var result = 'Noone';
        if (gameOver) {
            if (theWinner >= 0) {
                result = players[theWinner];
            }
        }
        return result;
    }
    resetBoard();
    
    return {
        // api
        newGame : resetBoard,
        gameOver : function () {return gameOver || turnsTaken > 8;},
        board : board,
        takeTurn : takeTurnMethod,
        winner : winner,
        isBroken : function () {
            return broken;
        },
        last_player : function() {
            return players[(turnsTaken - 1) % 2];
        },
        setCodeAs : function (code) {
            var ret = '';
            if (code === 'broken_takeTurn') {
                takeTurnMethod = broken_code.takeTurn;
                ret = 'broken';
                broken = true;
            }
            else {
                takeTurnMethod = original_code.takeTurn;
                ret = 'orig';
                broken = false;
            }
            this.takeTurn = takeTurnMethod;
            return ret;
        }
    };
}());
// create the board with a callback to be saved for each button
$(function () {
    var b = TTT.generateBoard(TTT.size, function (r, c, id) {
        return function() {
            var row_str = '#row_' + r,
                button_str = '<div id="' + id + '" col="' + c + '"></div>';
                
            $(button_str).css(TTT.css.button.def).appendTo(row_str);

            $('#' + id).click(function(){
                TTT.clicked(r, c, id);
            });
        };
    });
});


