/*globals $, console, alert, SUDOKU*/

$(function () {
    var unplayed = [];
    
    // Update the callback to be bound to each answer's button.
    function answer (l, q, bool, ans) {
        var func;
        if (bool) {
            func = function () {
                console.log('Correct!');
                if ( q+1 < SUDOKU.lessons[l].len) {
                    display_question(l, q+1);
                }
                else {
                    $('#text').html('<p>' + SUDOKU.lessons[l].outro + '</p>');
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
    
    // Given a Lesson and question number, display the question/answers for that question
    function display_question (l, q) {
        var lesson = SUDOKU.lessons[l],
            question = lesson.Qs[q], i;
        
        $('#text').html('<h1>' + lesson.title + '</h1><p>' + question.statement + '</p></br><h2>' + question.question + '</h2>');
        
        for (i = 0; i < 3; i += 1) {
            $('#q' + i).html('<p>' + question.answers[i] + '</p>');
            answer(l,q,question.isCorrect(i), i);
        }
    }
    
    // Put intro of game as default text
    $('#text').html('<p>'+ SUDOKU.intro +'</p>');
    
    // Setup the 'New Game' button.  When clicked:
    $('#newgame').append('<p>New Game</p>').click(function () {
        var new_unplayeds, len, i;
        len = unplayed.length;
        for (i = 0; i < len; i += 1) {
            $('#' + unplayed[i]).css({'color' : 'black'});
        }
        new_unplayeds = SUDOKU.game.startGame($('input:radio:checked').val());
        len = new_unplayeds.length;
        for (i = 0; i < len; i += 1) {
            $('#' + new_unplayeds[i]).css({'color':'red'});
        }
        unplayed = new_unplayeds;
    }).hover(function(){
            $("#newgame").css({'background-color' : '#faa'});
        }, function() { 
        	$("#newgame").css({'background-color' : '#fbb'});
        });
    
    // Setup the 'Original Game' button.  When clicked:
    $('#original').append('<p>Original Game</p>').click(function () {
        SUDOKU.game.set_code_as('og');
        $('#text').html('<p>' + SUDOKU.intro + '</p>');
        $('#q_and_a').fadeOut(1000);
    }).hover(function(){
            $("#original").css({'background-color' : '#faa'});
        }, function() {
        	$("#original").css({'background-color' : '#fbb'});
        });
    
    // Setup the 'Lesson 1' button.  When clicked:
    $('#lesson1').append('<p>Lesson 1</p>').click(function () {
        SUDOKU.game.set_code_as('broken_id');
        display_question(0,0);
        $('#q_and_a').fadeIn(1000);
    }).hover(function(){
            $("#lesson1").css({'background-color' : '#faa'});
        }, function() {
        	$("#lesson1").css({'background-color' : '#fbb'});
        });
        
    // Setup the 'Lesson 2' button.  When clicked:
    $('#lesson2').append('<p>Lesson 2</p>').click(function () {
        SUDOKU.game.set_code_as('broken_gameover');
        display_question(1,0);
        $('#q_and_a').fadeIn(1000);
    }).hover(function(){
            $("#lesson2").css({'background-color' : '#faa'});
        }, function() { 
        	$("#lesson2").css({'background-color' : '#fbb'});
        });

    // Setup the 'Lesson 3' button.  When clicked:
    $('#lesson3').append('<p>Lesson 3</p>').click(function () {
        SUDOKU.game.set_code_as('broken_random');
        display_question(2,0);
        $('#q_and_a').fadeIn(1000);
    }).hover(function(){
            $("#lesson3").css({'background-color' : '#faa'});
        }, function() { 
        	$("#lesson3").css({'background-color' : '#fbb'});
        });
        
    // illuminate answers
    $('#ans_buttons .answers').illuminate();
});