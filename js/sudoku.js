/*globals $ console alert */

var SUDOKU = SUDOKU || {};

SUDOKU.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = SUDOKU,
        i;
    
    // strip redundant leading global
    if (parts[0] === "SUDOKU") {
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

// Define namespaces
SUDOKU.namespace("SUDOKU.game");
SUDOKU.namespace("SUDOKU.generateBoard");
SUDOKU.namespace("SUDOKU.focusCell");
SUDOKU.namespace("SUDOKU.keydown");
SUDOKU.namespace("SUDOKU.square");
SUDOKU.namespace("SUDOKU.updateBoard");
SUDOKU.namespace("SUDOKU.css.button.def");
SUDOKU.namespace("SUDOKU.css.button.hilight");
SUDOKU.namespace("SUDOKU.css.button.sel");
SUDOKU.namespace("SUDOKU.css.border.left");
SUDOKU.namespace("SUDOKU.css.border.def");
SUDOKU.namespace("SUDOKU.css.border.bottom");
SUDOKU.namespace("SUDOKU.size");
SUDOKU.namespace("SUDOKU.tip");
SUDOKU.namespace("SUDOKU.intro");

// Tips
SUDOKU.tip = "The objective of the game is to fill all of the blank cells with the correct numbers. There are three very simple constraints to follow.\n\n  Every row of 9 cells must include all digits 1 through 9 in ANY order.\n  Every column of 9 cells must include all digits 1 through 9 in ANY order.\n  Every square of 3 x 3 cells must include all digits 1 through 9 in ANY order.\n\nWhen you click on a cell the row, column, and square that contains it becomes hi-lighted. A number may be played in a given cell if, and only if, it has not been played in any cell that is also hi-lighted.\n\nIf the current cell you are trying to play has zero possible plays, then you have made an error in one of your previous plays; try playing a different number for one of your previous plays.";

SUDOKU.intro = "Before starting any of the lessons, please familiarize yourself with the game of Sudoku! Tips on how to play are provided below the board, if you do not know how to play. \n\nThe objective of each lesson is to break the game in a particular way. It will be your job to figure out what is broken. At any time during a lesson, you may return to the Original Game to compare.";


// Size of board: N x N squares
SUDOKU.size = 9;

// CSS Variables
SUDOKU.css.button.sel = { 'background-color' : '#9e9' };
SUDOKU.css.button.hilight = { 'background-color' : '#fda' };
SUDOKU.css.border.def = { 'border' : '1px solid black' };
SUDOKU.css.border.bottom = { 'border-bottom' : '5px solid black' };
SUDOKU.css.border.left = { 'border-left' : '5px solid black' };
SUDOKU.css.button.def = {
    'background-color' : '#adf', // Sky blue #9ff #ffa yello
    'width' : '10%',
    'height' : '35px',
    'float' : 'left',
    'clear' : 'none'
};

// Functions
SUDOKU.generateBoard = function (size, action) {
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
SUDOKU.square = function (r, c) {
    var square;

    if (r === 0 || r === 1 || r === 2) {
        if (c === 0 || c === 1 || c === 2) { square = 0; } 
        else if (c === 3 || c === 4 || c === 5) { square = 1; }
        else { square = 2; }
    }
    else if (r === 3 || r === 4 || r === 5) {
        if (c === 0 || c === 1 || c === 2) { square = 3; } 
        else if (c === 3 || c === 4 || c === 5) { square = 4; }
        else { square = 5; }
    }
    else if (c === 0 || c === 1 || c === 2) { square = 6; }
    else if (c === 3 || c === 4 || c === 5) { square = 7; }
    else { square = 8; }

    return square;
};
SUDOKU.focusCell = function (r, c, id) {
    var sqr = SUDOKU.square(r, c, id),
        cells_str = '#row_' + r + ' div',   // ex: #row_5
        col_str = 'div[col="' + c + '"]',   // ex: div[col="4"]
        sqr_str = 'div[sqr="' + sqr + '"]', // ex: div[sqr="3"]
        undo_sqr_str, undo_sqr, undo_col_str, undo_cells_str, undo_r ,undo_c, undo_id = SUDOKU.focusCell.last;
    
    // Undo the row, column, square of previous clicked
    if (undo_id !== undefined) {
        undo_r = parseInt(undo_id / SUDOKU.size, 10);
        undo_c = undo_id % SUDOKU.size;
        undo_sqr = SUDOKU.square(undo_r, undo_c, undo_id);
        undo_cells_str = '#row_' + undo_r + ' div';     // ex: #row_5
        undo_col_str = 'div[col="' + undo_c + '"]';     // ex: div[col="4"]
        undo_sqr_str = 'div[sqr="' + undo_sqr + '"]';   // ex: div[sqr="3"]
        
        $(undo_cells_str).each(function () {
           $(this).css(SUDOKU.css.button.def); 
        });
        $(undo_col_str).each(function () {
           $(this).css(SUDOKU.css.button.def);
        });
        $(undo_sqr_str).each(function () {
           $(this).css(SUDOKU.css.button.def);
        });
    }
    
    // Highlight row, column, square of clicked
    $(cells_str).each(function () {
       $(this).css(SUDOKU.css.button.hilight); 
    });
    $(col_str).each(function () {
       $(this).css(SUDOKU.css.button.hilight);
    });
    $(sqr_str).each(function () {
       $(this).css(SUDOKU.css.button.hilight);
    });
    $("#" + id).css(SUDOKU.css.button.sel);
    
    SUDOKU.focusCell.last = id;
};
SUDOKU.keydown = function (r, c, id, num) {
    if (SUDOKU.game.board[id].setNumber(num)){
        $("#" + id).html('<p>' + num +'</p>');
    }
};
SUDOKU.updateBoard = function() {
    var i;
    for (i = 0; i < 81; i += 1) {
        SUDOKU.updateCell(i);
    }
};
SUDOKU.updateCell = function(id) {
    var i, num, str;
    num = SUDOKU.game.getNumber(id);
    if ((num !== 0 || SUDOKU.game.isBroken()) && num !== -1) {
        str = "<p>"+ num +"</p>";
    }
    else {
        str = "";
    }
    $('#' + id).html(str);
};
// Game API
SUDOKU.game = (function () {
    var primes = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23],
        COMPLETE = 223092870, // Result of: primes.reduce(product)
        board = [],
        rows = [],
        columns = [],
        squares = [],
        i, row, col, sqr, cell,
        original_code = {
            // Determine if board is Solved
            isGameOver : function isGameOver() {
                var i = 0, result = true, iterResult = true;
                while (result && i < 9) {
                    iterResult = rows[i].isComplete() && 
                            columns[i].isComplete() && 
                            squares[i].isComplete();
                    result = result && iterResult;
                    i += 1;
                }
                return result;
            },
            getNumber : function getNumber(id) {
                return board[id].getNumber();
            }
        },
        broken_code = {
            // Only checks if 9th row, 9th column and 9th square is complete
            isGameOver : function isGameOver() {
                var result = true,
                    i = 0;

                while (i < 9) { // While loop SHOULD stop after first incomplete CellGroup
                    result = rows[i].isComplete() && 
                            columns[i].isComplete() &&
                            squares[i].isComplete();
                    i += 1;
                }
                return result;
            },
            getNumber_random : function getNumber(id) {
                return board[id].getNumber() - 1;
            },
            getNumber_id : function getNumber(id) {
                return id;
            }
            
        },
        brokenNumbers = false,
        gameOverMethod = original_code.isGameOver,
        getNumberMethod = original_code.getNumber;
    
    // Calculate the product of all elements in an array
    // This should be Depricated    
    function product(prev, curr) {
        return prev * curr;
    }
    
    // Constructor for CellGroup
    function CellGroup() {
        // If Constructor was not called with 'new', call it with 'new'
        if (!(this instanceof CellGroup)) {
            return new CellGroup();
        }

        var cells = [],
            contents = 1;

        return {
            // CellGroup Public API

            register : function (cell) {
                cells.push(cell);
                cell.addGroup(this);
            },
            contains : function (number) {
                return contents % primes[number] === 0;
            },
            update : function (oldNum, newNum) {
                contents /= oldNum;
                contents *= newNum;
            },
            isComplete : function () {
                return contents === COMPLETE;
            }
        };
    }
    
    // Constructor for Cells
    function Cell(idNum) {
        // If Constructor was not called with 'new', call it with 'new'
        if (!(this instanceof Cell)) {
            return new Cell(idNum);
        }
    
        var id = idNum,
            number = 0,
            groups = [],
            editable = false,
            iterateGroups = function (cb) {
                var i, len, results = [];
                len = groups.length;
                for (i = 0; i < len; i += 1){
                    results.push(cb(groups[i]));
                }
                return results;
            };
    
        return {
            // API for Cells
            getGroups : function () {
                return groups;
            },
            getNumber : function () {
                return number;
            },
            getPrimeValue : function () {
                return primes[number];
            },
            getPlayables : function () {
                var i, j, 
                    results, 
                    ret = [], 
                    len, canPlay,
                    func = function (i) {
                        return function (grp) {
                            return grp.contains(i);
                        };
                    };
                    
                for (i = 1; i <= 9; i += 1) {
                    results = iterateGroups(func(i));
                    len = results.length;
                    canPlay = true;
                    for (j = 0; j < len; j += 1) {
                        canPlay = canPlay && !results[j];
                    }
                    if (canPlay) {
                        ret.push(i);
                    }
                }
                return ret;
            },
            getID : function () {
                return id;
            },
            isEditable : function () {
                return editable;
            },
            isEmpty : function () {
                return number === 0;
            },
            setNumber : function (num) {
                var i, len, results, prev_played, success = false;
                
                results = iterateGroups(function (grp) {
                    return grp.contains(num);
                });
                len = results.length;
                
                for (i = 0; i < len; i += 1) {
                    prev_played = prev_played || results[i];
                }
                
                // setNumber if cell is editable AND (number is playable or 0, to clear)
                if ( editable && ((num > 0 && num <= 9 && !prev_played) || num === 0 ) ) {
                    iterateGroups(function (grp) {
                        grp.update(primes[number], primes[num]);
                    });
                    number = num;
                    success = true;
                }
                
                return success;
            },
            setEditable : function (bool) {
                editable = bool;
            },
            clear : function () {
                this.setNumber(0);
            },
            reset : function () {
                editable = true;
                this.setNumber(0);
            },
            addGroup : function (grp) {
                if (groups.length < 3) {
                    groups.push(grp);
                }
            }
        };
    }
    
    // Backtrack
    function solve(empties) {
        var result = false, unplayed,
            len, plen, random, cellToPlay,
            playables, numToPlay;
            
        if (gameOverMethod()) {
            result = true;
        }
        else if (empties.length === 0) {
            result = false;
        }
        else {
            unplayed = empties.slice(); // make copy of parameter (list of empties)
            len = unplayed.length;
            cellToPlay = (function () {
                // Determine which of the unplayed cells has the least amount of possible plays
                var index = 0,
                    leastPlays = 9,
                    curr_least, j;
                
                for (j = 0; j < len; j += 1) {
                    curr_least = unplayed[j].getPlayables().length;
                    if (curr_least < leastPlays) {
                        index = j;
                        leastPlays = curr_least;
                    }
                    if (leastPlays === 1) {
                        break;
                    }
                }
                
                return unplayed.splice(index, 1)[0];
            }());
            playables = cellToPlay.getPlayables();
            plen = playables.length; // reuse len
            
            while (plen > 0 && !result) {
                random = Math.floor(Math.random()*plen);
                numToPlay = playables.splice(random, 1)[0];
                cellToPlay.setNumber(numToPlay);
                cellToPlay.setEditable(false);
                result = solve(unplayed);
                plen = playables.length;
                if (!result) {
                    cellToPlay.reset();
                }
            } 
        }
        
        return result;
    }
    
    // Solve board with backtracking
    function findSolution () {
        var i, len, emptyCells = [];
        len = board.length;
        for (i = 0; i < len; i += 1) {
            if (board[i].isEmpty()) {
                emptyCells.push(board[i]);
            }
        }
        return solve(emptyCells);
    }
    
    // reset the board
    function resetBoard () {
        var i;
        for (i = 0; i < 81; i += 1) {
            board[i].reset();
        }
    }
    // generate a solved puzzle and remove given number of cells, for playing
    function startGame (difficulty) {
        var i, random, list = [];
        
        resetBoard();
        findSolution();
        for (i = 0; i < difficulty; i += 1) {
            random = Math.floor(Math.random()*81);
            board[random].reset();
            list.push(random);
        }
        SUDOKU.updateBoard();
        return list;
    }
    
    // Create the 27 CellGroups
    for (i = 0; i < 9; i += 1) {
        rows.push(CellGroup());
        columns.push(CellGroup());
        squares.push(CellGroup());
    }
    
    // Create the 81 Cells and assign to proper CellGroups
    for (i = 0; i < 81; i += 1) {
        row = Math.floor(i / 9);
        col = i % 9;
        sqr = SUDOKU.square(row, col);
        
        cell = Cell(i);
        rows[row].register(cell);
        columns[col].register(cell);
        squares[sqr].register(cell);
        board.push(cell);
    }
    
    return {
        // public API of game
        board : board,
        startGame : startGame,
        gameOver : gameOverMethod,
        getNumber : getNumberMethod,
        findSolution : findSolution,
        isBroken : function () {
            return brokenNumbers;
        },
        set_code_as : function (type) {
            if (type === "broken_gameover") {
                gameOverMethod = broken_code.isGameOver;
                getNumberMethod = original_code.getNumber;
                brokenNumbers = false;
            }
            else if (type === "broken_random") {
                gameOverMethod = original_code.isGameOver;
                getNumberMethod = broken_code.getNumber_random;
                brokenNumbers = true;
            }
            else if (type === "broken_id") {
                gameOverMethod = original_code.isGameOver;
                getNumberMethod = broken_code.getNumber_id;
                brokenNumbers = true;
            }
            else {
                gameOverMethod = original_code.isGameOver;
                getNumberMethod = original_code.getNumber;
                brokenNumbers = false;
            }
            this.gameOver = gameOverMethod;
            this.getNumber = getNumberMethod;
            SUDOKU.updateBoard();
        }
    };
}());

// create the board with a callback to be saved for each button
$(function () {
    var board = SUDOKU.generateBoard(SUDOKU.size, function (r, c, id) {
        return function() {
            var sqr = SUDOKU.square(r, c, id),
                row_str = '#row_' + r,
                button_str = '<div id="' + id + '" col="' + c + '" sqr="' + sqr + '" tabindex="' + id + '"></div>';
                
            $(row_str).append( $(button_str).css(SUDOKU.css.button.def).css(SUDOKU.css.border.def));
            if (r === 2 || r === 5) {
                $('#' + id).css(SUDOKU.css.border.bottom);
            }
            if (c === 3 || c === 6) {
                $('#' + id).css(SUDOKU.css.border.left);
            }
            $('#' + id).click(function () {
                SUDOKU.focusCell(r, c, id);
            });
            $('#' + id).keydown(function (event) {
                var nextFocusID,
                    nextR, nextC,
                    key = event.which,
                    i, num;
                
                // Number 1-9 pressed, to play
                if (key >= 49 && key <= 57) { 
                    SUDOKU.keydown(r, c, id, key-48);
                    if (SUDOKU.game.gameOver()) {
                        alert("Game Over!");
                    }
                }
                
                // left arrow >> move left
                else if (key === 37) {
                    if (id !== 0) {
                        nextFocusID = id - 1;
                    }
                    else {
                        nextFocusID = SUDOKU.size * SUDOKU.size - 1;
                    }
                    
                    nextR = Math.floor(nextFocusID/SUDOKU.size);
                    nextC = nextFocusID % SUDOKU.size;
                    $('#' + nextFocusID).focus();
                    SUDOKU.focusCell(nextR, nextC, nextFocusID);
                }
                
                // up arrow >> move up
                else if (key === 38) { 
                    if (r !== 0) {
                        nextR = r - 1;
                    }
                    else {
                        nextR = SUDOKU.size - 1;
                    }
                    nextFocusID = (nextR * SUDOKU.size) + c;
                    $('#' + nextFocusID).focus();
                    SUDOKU.focusCell(nextR, c, nextFocusID);
                }
                
                // right arrow >> move left
                else if (key === 39) {
                    if (id === (SUDOKU.size * SUDOKU.size) - 1) {
                        nextFocusID = 0;
                        nextR = 0;
                        nextC = 0;
                    }
                    else {
                        nextFocusID = id + 1;
                        nextR = Math.floor(nextFocusID/SUDOKU.size);
                        nextC = nextFocusID % SUDOKU.size;
                    }
                    $('#' + nextFocusID).focus();
                    SUDOKU.focusCell(nextR, nextC, nextFocusID);
                }
                
                // down arrow >> move up
                else if (key === 40) {
                    if (r !== SUDOKU.size - 1) {
                        nextR = r + 1;
                    }
                    else {
                        nextR = 0;
                    }
                    nextFocusID = (nextR * SUDOKU.size) + c;
                    $('#' + nextFocusID).focus();
                    SUDOKU.focusCell(nextR, c, nextFocusID);
                }
                
                // backspace or 0 == clear cell
                else if (key === 8 || key === 48){
                    SUDOKU.game.board[id].clear();
                    SUDOKU.updateCell(id);
                }
                else if (key === 191){
                    SUDOKU.updateBoard();
                }
            });
        };
    });
});