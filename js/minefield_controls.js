/*globals $, console, alert, MINEFIELD*/

$(function () {
    
    // Update the callback to be bound to each answer's button.
    function answer (l, q, bool, ans) {
        var func;
        if (bool) {
            func = function () {
                console.log('Correct!');
                if ( q+1 < MINEFIELD.lessons[l].len) {
                    display_question(l, q+1);
                }
                else {
                    $('#text').html(MINEFIELD.lessons[l].outro);
                    $('#q_and_a').fadeOut(1000);
                }
            };
        }
        else {
            func = function () {
                console.log('Sorry, try again.');
            };
        }
        $('#a' + ans).unbind().click(func);
    }
    
    function display_question (l, q) {
        var lesson = MINEFIELD.lessons[l],
            question = lesson.Qs[q], i;
        
        $('#text').html('<h1>' + lesson.title + '</h1>' + question.statement + '</br><h2>' + question.question + '</h2>');
        
        for (i = 0; i < 3; i += 1) {
            $('#q' + i).html('<p>' + question.answers[i] + '</p>');
            answer(l,q,question.isCorrect(i), i);
        }
    }
    
    // Put intro of game as default text
    $('#text').html('<p>'+ MINEFIELD.intro +'</p>');
    
    // Setup the 'New Game' button.  When clicked:
    $('#newgame').append('<p>New Game</p>').click(function () {
        var i;
        // some function goes here that happens when clicked
        TTT.game.newGame();
        for (i = 0; i < 9; i += 1) {
            $('#' + i).css(TTT.css.button.def).html('');
        }
    }).hover(function(){
            $("#newgame").css({'background-color' : '#faa'});
        }, function() { 
            $("#newgame").css({'background-color' : '#fbb'});
        });
        
    // Setup the 'Original Game' button.  When clicked:
    $('#original').append('<p>Original Game</p>').click(function () {
        // some function goes here that happens when clicked
        MINEFIELD.game.setCodeAs('original');
        $('#text').html('<p>' + MINEFIELD.intro + '</p>');
        $('#q_and_a').fadeOut(1000);
    }).hover(function(){
            $("#original").css({'background-color' : '#faa'});
        }, function() {
            $("#original").css({'background-color' : '#fbb'});
        });
    
    // Setup the 'Lesson 1' button.  When clicked:
    $('#lesson1').append('<p>Lesson 1</p>').click(function () {
        // some function goes here that happens when clicked
        MINEFIELD.game.setCodeAs('broken_switch');
        display_question(0,0);
        $('#q_and_a').fadeIn(1000);
    }).hover(function(){
            $("#lesson1").css({'background-color' : '#faa'});
        }, function() {
            $("#lesson1").css({'background-color' : '#fbb'});
        });

    $('#lesson2').append('<p>Lesson 2</p>').click(function () {
        // some function goes here that happens when clicked
        MINEFIELD.game.setCodeAs('broken_protocol');
        display_question(1,0);
        $('#q_and_a').fadeIn(1000);
    }).hover(function(){
            $("#lesson2").css({'background-color' : '#faa'});
        }, function() {
            $("#lesson2").css({'background-color' : '#fbb'});
        });
    $('#shake').append('<p>Shake!</p>').click(function () {
        // some function goes here that happens when clicked
        MINEFIELD.game.shake();
        MINEFIELD.refreshBoard();
        MINEFIELD.game.clearPath();
    }).hover(function(){
            $("#shake").css({'background-color' : '#bbf'});
        }, function() {
            $("#shake").css({'background-color' : '#dbf'});
        });

    $('#clear').append('<p>Clear!</p>').click(function () {
        // some function goes here that happens when clicked
        MINEFIELD.game.clearPath();
        MINEFIELD.refreshBoard();
    }).hover(function(){
            $("#clear").css({'background-color' : '#bbf'});
        }, function() {
            $("#clear").css({'background-color' : '#dbf'});
        });
    $('#submit').append('<p>Submit!</p>').click(function () {
        // some function goes here that happens when clicked
        MINEFIELD.game.submit();
        MINEFIELD.game.clearPath();
        MINEFIELD.refreshBoard();
        console.log(MINEFIELD.game.score());
    }).hover(function(){
            $("#submit").css({'background-color' : '#bbf'});
        }, function() {
            $("#submit").css({'background-color' : '#dbf'});
        });  
        
    // Illuminate answers
    $('#ans_buttons .answers').illuminate();
});