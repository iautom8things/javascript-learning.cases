/*globals $, console, alert*/
var MINEFIELD = MINEFIELD || {};

MINEFIELD.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = MINEFIELD,
        i;
    
    // strip redundant leading global
    if (parts[0] === "MINEFIELD") {
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

MINEFIELD.namespace('MINEFIELD.intro');
MINEFIELD.namespace('MINEFIELD.generateBoard');
MINEFIELD.intro = '';

// Generates a board with the given size and an action to bind an action to clicked
MINEFIELD.generateBoard = function (size, action) {
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

MINEFIELD.namespace("MINEFIELD.clicked");
MINEFIELD.namespace("MINEFIELD.game");
MINEFIELD.namespace("MINEFIELD.css.button.def");
MINEFIELD.namespace("MINEFIELD.css.button.hilight");
MINEFIELD.namespace("MINEFIELD.css.button.sel");
MINEFIELD.namespace("MINEFIELD.css.border.left");
MINEFIELD.namespace("MINEFIELD.css.border.def");
MINEFIELD.namespace("MINEFIELD.css.border.bottom");
MINEFIELD.namespace("MINEFIELD.size");
MINEFIELD.namespace("MINEFIELD.numOfMines");


MINEFIELD.size = 16; // Size of board: N x N squares
MINEFIELD.numOfMines = 40;

MINEFIELD.css.button.sel = {
    'background-color' : '#dde'
};
MINEFIELD.css.button.hilight = {
    'background-color' : '#fc9'
};
MINEFIELD.css.button.X = {
    'background-color' : '#f9b'
};
MINEFIELD.css.button.O = {
    'background-color' : '#9cf'
};
MINEFIELD.css.button.def = {
    'background-color' : '#9ff', // Sky blue
    'width' : '5%',
    'height' : '20px',
    'float' : 'left',
    'clear' : 'none',
    'border' : '1px solid black'
};
MINEFIELD.clicked = function (r, c, id) {
    var lastPlayed;
    
};

MINEFIELD.game = (function () {
    var board = [], i, j, c,
        gameOver = false,
        original_code = {
            placeMines : function () {
                var minesLeft = MINEFIELD.numOfMines,
                    cell, randomCell;
                while (minesLeft > 0) {
                    randomCell = Math.floor(Math.random()*MINEFIELD.size*MINEFIELD.size);
                    cell = board[randomCell];
                    if (!cell.hasMine()) {
                        cell.placeMine();
                        minesLeft -= 1;
                    }
                }
            }
        },
        broken_notify = {
            placeMines : function () {
                
            }
        },
        broken_placement = {
            placeMines : function () {
                
            }
        },
        placeMinesMethod = original_code.placeMines; // set the correct submit function as the default function
    function cellID (x, y) {
        return (x * MINEFIELD.size) + y;
    }
    
    function onBoard (x, y) {
        return x >= 0 && y >= 0 && x < MINEFIELD.size && y < MINEFIELD.size;
    }
    
    function adjacentsOf (id) {
        var results = [],
            x = Math.floor(id / MINEFIELD.size),
            y = id % MINEFIELD.size;
        
        //North
        if (onBoard(x - 1, y)) {
            results.push(cellID(x - 1, y));
        }
        //Northeast
        if (onBoard(x - 1, y + 1)) {
            results.push(cellID(x - 1, y + 1));
        }
        //East
        if (onBoard(x, y + 1)) {
            results.push(cellID(x, y + 1));
        }
        //Southeast
        if (onBoard(x + 1, y + 1)) {
            results.push(cellID(x + 1, y + 1));
        }
        //South
        if (onBoard(x + 1, y)) {
            results.push(cellID(x + 1, y));
        }
        //Southwest
        if (onBoard(x + 1, y - 1)) {
            results.push(cellID(x + 1, y - 1));
        }
        //West
        if (onBoard(x, y - 1)) {
            results.push(cellID(x, y - 1));
        }
        //Northwest
        if (onBoard(x - 1, y - 1)) {
            results.push(cellID(x - 1, y - 1));
        }
    
        return results;
    }
    
    function Cell (id) {
        if (!(this instanceof Cell)) {
            return new Cell(id);
        }
        var x = Math.floor(id / MINEFIELD.size),
            y = id % MINEFIELD.size,
            adjacentMines = 0,
            hasMine = false,
            revealed = false,
            flagged = false;
        
        function getContent () {
            var content;
            
            if (hasMine) {
                content = 'X';
            }
            else if (adjacentMines > 0) {
                content = adjacentMines;
            }
            else {
                content = ' ';
            }
            
            return content;
        }
        
        function reset () {
            hasMine = false;
            revealed = false;
            flagged = false;
            adjacentMines = 0;
        }
        
        function toggleFlag () {
            if (!revealed) {
                flagged = !flagged;
            }
        }
        
        function placeMine () {
            var adjacents = adjacentsOf(id),
                len = adjacents.length, 
                i, c;
                
            hasMine = true;
            
            for (i = 0; i < len; i += 1) {
                c = adjacents[i];
                board[c].notify();
            }
        }
        
        return {
          // Cell API  
          getContent : getContent,
          reset : reset,
          placeMine : placeMine,
          reveal : function () { revealed = true; },
          isFlagged : function () { return flagged; },
          isRevealed : function () { return revealed; },
          hasMine : function () { return hasMine; },
          notify : function () { adjacentMines += 1; },
          numAdjacents : function () { return adjacentMines; }
          
        };
    
    }
    
    function newGame () {
        var i, len = board.length;
        
        for (i = 0; i < len; i += 1) {
            board[i].reset();
        }
    }
    
    function revealAll () {
        var i, len = board.length,
            result = [];
        
        for (i = 0; i < len; i += 1) {
            board[i].reveal();
            result.push(i);
        }
        
        return result;
    }
    
    function revealAdjacents (id) {
        var adjacents = adjacentsOf(id),
            i, len = adjacents.length,
            cell, results = [];
            
        for (i = 0; i < len; i += 1) {
            cell = adjacents[i];
            results = results.concat(revealCell(cell));
        }
        
        return results;
    }
    
    function revealCell (id) {
        var results = [];
        
        // The cell hasn't been revealed, yet
        if (!board[id].isRevealed()) {
            board[id].reveal();
            results.push(id);
            // There are no adjacent mines, then reveal adjacents
            if (board[id].numAdjacents() === 0) {
                results = results.concat(revealAdjacents(id));
            }
        }
        return results;
    }
        
    function playCell (id) {
        var results = [];
        if (!gameOver) {
            if (board[id].hasMine()) {
                results = revealAll();
                gameOver = true;
            }
            else {
                results = revealCell(id);
            }
        }
        
        return results;
    }
    
    for (i = 0; i < MINEFIELD.size; i += 1) {
        for (j = 0; j < MINEFIELD.size; j += 1) {
            c = cellID(i, j);
            board[c] = Cell(c);
        }
    }
    
    return {
        // api
        newGame : newGame,
        revealAll : revealAll,
        revealAdjacents : revealAdjacents,
        playCell : playCell,
        placeMines : placeMinesMethod,
        board : board,
        setCodeAs : function (code) {
            var ret = '';
            if (code === 'broken_notify') {
                placeMinesMethod = broken_notify.placeMines;
            }
            else if (code === 'broken_placement') {
                placeMinesMethod = broken_placement.placeMines;
            }
            else {
                placeMinesMethod = original_code.placeMines;
            }
            this.placeMines = placeMinesMethod;
        },
        printBoard : function () {
              var i, j, line, c;
              
              for (i = 0; i < MINEFIELD.size ; i += 1) {
                  line = '[';
                  for (j = 0; j < MINEFIELD.size; j += 1) {
                      c = cellID(i, j);
                      line += board[c].getContent();
                  }
                  line += ']';
                  console.log(line);
              }
          }
    };
}());
// create the board with a callback to be saved for each button
$(function () {
    var b = MINEFIELD.generateBoard(MINEFIELD.size, function (r, c, id) {
        return function() {
            var row_str = '#row_' + r,
                button_str = '<div id="' + id + '" col="' + c + '"></div>';
                
            $(button_str).css(MINEFIELD.css.button.def).appendTo(row_str);

            $('#' + id).click(function(){
                MINEFIELD.clicked(r, c, id);
            });
        };
    });
});


