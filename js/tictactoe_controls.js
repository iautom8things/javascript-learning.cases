/*globals $, console, alert, TTT*/

$(function () {
    
    // Update the callback to be bound to each answer's button.
    function answer (l, q, bool, ans) {
        var func;
        if (bool) {
            func = function () {
                console.log('Correct!');
                if ( q+1 < TTT.lessons[l].len) {
                    display_question(l, q+1);
                }
                else {
                    $('#text').html(TTT.lessons[l].outro);
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
        var lesson = TTT.lessons[l],
            question = lesson.Qs[q], i;
        
        $('#text').html('<h1>' + lesson.title + '</h1>' + question.statement + '</br><h2>' + question.question + '</h2>');
        
        for (i = 0; i < 3; i += 1) {
            $('#q' + i).html('<p>' + question.answers[i] + '</p>');
            answer(l,q,question.isCorrect(i), i);
        }
    }
    
    // Put intro of game as default text
    $('#text').html('<p>'+ TTT.intro +'</p>');
    
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
            $("#newgame").css({'background-color' : '#faf'});
        });
    
    // Setup the 'Original Game' button.  When clicked:
    $('#original').append('<p>Original Game</p>').click(function () {
        // some function goes here that happens when clicked
        TTT.game.setCodeAs('original');
        $('#text').html('<p>' + TTT.intro + '</p>');
        $('#q_and_a').fadeOut(1000);
    }).hover(function(){
            $("#original").css({'background-color' : '#faa'});
        }, function() {
            $("#original").css({'background-color' : '#faf'});
        });
    
    // Setup the 'Lesson 1' button.  When clicked:
    $('#lesson1').append('<p>Lesson 1</p>').click(function () {
        // some function goes here that happens when clicked
        TTT.game.setCodeAs('broken_takeTurn');
        display_question(0,0);
        $('#q_and_a').fadeIn(1000);
    }).hover(function(){
            $("#lesson1").css({'background-color' : '#faa'});
        }, function() {
            $("#lesson1").css({'background-color' : '#faf'});
        });
        
    // Illuminate answers
    $('#ans_buttons .answers').illuminate();
});