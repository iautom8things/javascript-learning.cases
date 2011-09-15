/*globals $, console, alert*/
var BOGGLE = BOGGLE || {};

BOGGLE.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = BOGGLE,
        i;
    
    // strip redundant leading global
    if (parts[0] === "BOGGLE") {
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

BOGGLE.namespace('BOGGLE.intro');
BOGGLE.namespace('BOGGLE.generateBoard');
BOGGLE.intro = "Before starting any of the lessons, please familiarize yourself with the game of Boggle! Tips on how to play are provided below the board, if you do not know how to play.<br><br>The objective of each lesson is to break the game in a particular way. It will be your job to figure out what is broken. At any time during a lesson, you may return to the Original Game to compare.";

// Generates a board with the given size and an action to bind an action to clicked
BOGGLE.generateBoard = function (size, action) {
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

BOGGLE.namespace("BOGGLE.clicked");
BOGGLE.namespace("BOGGLE.game");
BOGGLE.namespace("BOGGLE.css.button.def");
BOGGLE.namespace("BOGGLE.css.button.hilight");
BOGGLE.namespace("BOGGLE.css.button.sel");
BOGGLE.namespace("BOGGLE.css.border.left");
BOGGLE.namespace("BOGGLE.css.border.def");
BOGGLE.namespace("BOGGLE.css.border.bottom");
BOGGLE.namespace("BOGGLE.size");
BOGGLE.namespace("BOGGLE.refreshBoard");
BOGGLE.namespace("BOGGLE.updateWord");

BOGGLE.size = 4; // Size of board: N x N squares
BOGGLE.css.button.sel = {
    'background-color' : '#dde'
};
BOGGLE.css.button.hilight = {
    'background-color' : '#fc9'
};
BOGGLE.css.button.X = {
    'background-color' : '#f9b'
};
BOGGLE.css.button.O = {
    'background-color' : '#9cf'
};
BOGGLE.css.button.def = {
    'background-color' : '#9ff', // Sky blue
    'width' : '22.5%',
    'height' : '75px',
    'float' : 'left',
    'clear' : 'none',
    'border' : '1px solid black'
};
BOGGLE.updateWord = function () {
    var word = BOGGLE.game.word();
    
    $('#word').html('<p>"' + word + '"</p>');
};
BOGGLE.clicked = function (r, c, id) {
    var lastPlayed = BOGGLE.game.lastPlay();
    if (BOGGLE.game.playCube(id)) {
        if (lastPlayed !== undefined) {
            
            $('#' + lastPlayed).css(BOGGLE.css.button.hilight);
        }
        $('#' + id).css(BOGGLE.css.button.sel);
    }
    
    BOGGLE.updateWord();
    
};

BOGGLE.refreshBoard = function () {
    var x, y, id, score;
    
    for (x = 0; x < BOGGLE.size; x += 1) {
        for (y = 0; y < BOGGLE.size; y += 1) {
            id = BOGGLE.game.cellID(x, y);
            $('#' + id).html('<p>' + BOGGLE.game.tray[id].top() + '</p>').css(BOGGLE.css.button.def);
        }
    }
    score = BOGGLE.game.score();
    $('#score').html('<p>Score: ' + score + '</p>');
    BOGGLE.updateWord();
};

BOGGLE.game = (function () {
    var tray = [],
        score = 0,
        word = "",
        playedWords = {},
        playPath = [],
        playedCubes = {},
        lastPlay,
        original_code = {
            submit : function () {
                var result = 0,
                    len = word.length;
                // If the word is a real word, and hasn't been played
                if (BOGGLE.dict.isWord(word.toLowerCase()) && !playedWords.hasOwnProperty(word)) {
                    
                    if (len < 5) {
                        result = 1;
                    }
                    else if (len === 5) {
                        result = 2;
                    }
                    else if (len === 6) {
                        result = 3;
                    }
                    else if (len === 7) {
                        result = 5;
                    }
                    else {
                        result = 11;
                    }
                    
                    playedWords[word] = true;
                }
                score += result;
            } //end submit function

        },
        broken_switch = {
            
            // Broken switch statement / Fall-through
            //
            // Switch statements really shouldn't be abused!  If you use a switch statement, then
            // EVERY case should have a break!!  It's so easy to want to use a terse switch statement 
            // as opposed to the more verbose if/elses, and sometimes you can get really tricky by 
            // taking advantage of the fall-through affect, but missing a 'break' where one is needed
            // will end up being VERY difficult to debug when the problem pops up at a latter time.
            
            submit : function () {
                var result = 0,
                    len = word.length;
                // If the word is a real word, and hasn't been played
                if (BOGGLE.dict.isWord(word.toLowerCase()) && !playedWords.hasOwnProperty(word)) {
            
                    switch (len) {
                       case 3: 
                       case 4: score++; // This is BAD!!!!
                       case 5: score += 2;break;
                       case 6: score += 3;break;
                       case 7: score += 5;break;
                       default: score += 11;break;
                    }
            
                    playedWords[word] = true;
                }
                score += result;
            } //end submit function
        },
        broken_CSprot = {
            
            // Broken Client/Server Protocol - 
            //
            // Word Contains the concatenation of the played cubes, which are capitalized letters.
            // Example: 'START'
            // The dictionary's client/server protocol requires that a query to use all lowercase letters.
            // So the proper line should read: 
            //
            // if (BOGGLE.dict.isWord(word.toLowerCase()) && !playedWords.hasOwnProperty(word)) {
                
            submit : function () {
                var result = 0,
                    len = word.length;
                // If the word is a real word, and hasn't been played
                if (BOGGLE.dict.isWord(word) && !playedWords.hasOwnProperty(word)) {
                    
                    if (len < 5) {
                        result = 1;
                    }
                    else if (len === 5) {
                        result = 2;
                    }
                    else if (len === 6) {
                        result = 3;
                    }
                    else if (len === 7) {
                        result = 5;
                    }
                    else {
                        result = 11;
                    }
                    
                    playedWords[word] = true;
                }
                score += result;
            }
        },
        submitMethod = original_code.submit; // set the correct submit function as the default function
        
        function Cube(sides) {
            // If Constructor was not called with 'new', call it with 'new'
            if (!(this instanceof Cube)) {
                return new Cube(sides);
            }

            var faces = sides,
                top = "";
            
            function roll () {
                var len = faces.length;
                
                top = faces[Math.floor(Math.random() * len)];
            }
            
            // Do an initial roll
            roll();
            
            return {
                // API for Cube
                top : function () {
                    return top;
                },
                roll : roll
            };
        }
        
        function cellID (x, y) {
            return (x * BOGGLE.size) + y;
        }
        
        function onBoard (x, y) {
            return x >= 0 && y >= 0 && x < BOGGLE.size && y < BOGGLE.size;
        }
        
        function adjacentsOf (x, y) {
            var results = {};
            
            //North
            if (onBoard(x - 1, y)) {
                results[cellID(x - 1, y)] = true;
            }
            //Northeast
            if (onBoard(x - 1, y + 1)) {
                results[cellID(x - 1, y + 1)] = true;
            }
            //East
            if (onBoard(x, y + 1)) {
                results[cellID(x, y + 1)] = true;
            }
            //Southeast
            if (onBoard(x + 1, y + 1)) {
                results[cellID(x + 1, y + 1)] = true;
            }
            //South
            if (onBoard(x + 1, y)) {
                results[cellID(x + 1, y)] = true;
            }
            //Southwest
            if (onBoard(x + 1, y - 1)) {
                results[cellID(x + 1, y - 1)] = true;
            }
            //West
            if (onBoard(x, y - 1)) {
                results[cellID(x, y - 1)] = true;
            }
            //Northwest
            if (onBoard(x - 1, y - 1)) {
                results[cellID(x - 1, y - 1)] = true;
            }
            
            return results;
        }
        
        function resetScore () {
            score = 0;
        }
        
        function clearPath () {
            playPath = [];
            playedCubes = {};
            word = "";
            lastPlay = undefined;
        }
        
        function shakeTray () {
            var tmp, current, i, 
                top = tray.length, 
                len = tray.length;
            
            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = tray[current];
                    tray[current] = tray[top];
                    tray[top] = tmp;
                }
            }
            
            for (i = 0; i < len; i += 1) {
                tray[i].roll();
            }
        }
        
        function newGame () {
            playedWords = {};
            score = 0;
            word = "";
            playPath = [];
            playedCubes = {};
            shakeTray();
            lastPlay = undefined;
        }
        
        function playCube (id) {
            var result = false,
                len = playPath.length,
                lastPlayed = playPath[len - 1],
                x = Math.floor(lastPlayed / BOGGLE.size), 
                y = lastPlayed % BOGGLE.size,
                adjs;
            if (len === 0) {
                word += tray[id].top();
                playPath.push(id);
                playedCubes[id] = true;
                result = true;
                lastPlay = id;
            }
            else if (!playedCubes.hasOwnProperty(id)) {
                adjs = adjacentsOf(x,y);
                if (adjs.hasOwnProperty(id)) {
                    word += tray[id].top();
                    playPath.push(id);
                    playedCubes[id] = true;
                    result = true;
                    lastPlay = id;
                }
            }
            if (result) {
                console.log(word);
            }
            return result;
        }
        
        tray = [Cube(["A", "A", "E", "E", "G", "N"]),
                Cube(["H", "I", "M", "N", "Qu", "U"]),
                Cube(["A", "C", "H", "P", "O", "S"]),
                Cube(["A", "F", "F", "K", "P", "S"]),
                Cube(["H", "L", "N", "N", "R", "Z"]),
                Cube(["D", "E", "L", "V", "R", "Y"]),
                Cube(["E", "E", "I", "N", "S", "U"]),
                Cube(["D", "E", "I", "L", "R", "X"]),
                Cube(["E", "I", "O", "S", "S", "T"]),
                Cube(["A", "O", "O", "T", "T", "W"]),
                Cube(["E", "E", "G", "H", "N", "W"]),
                Cube(["E", "L", "R", "T", "T", "Y"]),
                Cube(["C", "I", "M", "O", "T", "U"]),
                Cube(["E", "H", "R", "T", "V", "W"]),
                Cube(["D", "I", "S", "T", "T", "Y"]),
                Cube(["A", "B", "B", "J", "O", "O"])
        ];
        
        
    return {
        // api
        newGame : newGame,
        tray : tray,
        submit : submitMethod,
        clearPath : clearPath,
        playCube : playCube,
        shake : shakeTray,
        adjacentsOf : adjacentsOf,
        cellID : cellID,
        score : function () {return score;},
        word : function () {return word;},
        lastPlay : function() {return lastPlay;},
        setCodeAs : function (code) {
            var ret = '';
            if (code === 'broken_protocol') {
                submitMethod = broken_CSprot.submit;
            }
            else if (code === 'broken_switch') {
                submitMethod = broken_switch.submit;
            }
            else {
                submitMethod = original_code.submit;
            }
            this.submit = submitMethod;
        }
    };
}());
// create the board with a callback to be saved for each button
$(function () {
    var b = BOGGLE.generateBoard(BOGGLE.size, function (r, c, id) {
        return function() {
            var row_str = '#row_' + r,
                button_str = '<div id="' + id + '" col="' + c + '"></div>';
                
            $(button_str).css(BOGGLE.css.button.def).appendTo(row_str);

            $('#' + id).click(function(){
                BOGGLE.clicked(r, c, id);
            });
        };
    });
});


