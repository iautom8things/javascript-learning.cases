/*globals TTT, LearningCase, Question*/

TTT.namespace("TTT.lessons");
TTT.lessons = [];

// Lesson 1
TTT.lessons.push(LearningCase({
    title : 'Lesson 1 : "Mod%/Divide" - Working with Modulus',
    outro : '<p>Great work!  Tic-Tac-Tow is an incredibly easy gamy, but that last example was very complicated.  A lot was done in just a few lines of code.  If you look at the code again, you\'ll see that <span class="op">%</span> (modulus) is a very POWERFUL arithmetic expression!  Moduls finds the remainder of the first number divided by the second number.  For example:</p><div class="code">4 <span class="op">/</span> 3 <span class="op">==</span> 1; <span class="comment">// true</span><br>4 <span class="op">%</span> 3 <span class="op">==</span> 1; <span class="comment">// true</span><br>0 <span class="op">/</span> 3 <span class="op">==</span> 0; <span class="comment">// true</span><br>0 <span class="op">%</span> 3 <span class="op">==</span> 0; <span class="comment">// true</span><br></div><p>From this you can see the trick being used to figure out where the play should be at.  "Cell 0" is at Row 0, Column 0.  "Cell 4" is at Row 1, Column 1.  In the previous anti-pattern, modulus and division was mixed up for the assignment of the played cell.  When "Cell 2" ( Row 0, Column 1) was played, it would register in "Cell 3" (Row 1, Column 0).</p><p>Let\'s have another look at the code, this time coded correctly:</p><div class="code"><span class="comment">//variables</span><br/>private <span class="type">int</span> turnsTaken <span class="op">=</span> 0;<br/>private <span class="type">char[]</span> p <span class="op">=</span> {\'X\', \'O\'};<br/><br/><span class="comment">// square ==  [0 - 8] representing the 9 squares of the board.</span><br/>public <span class="type">Boolean</span> takeTurn (<span class="type">int</span> square) {<br/>&nbsp&nbspif ( <span class="op">!</span>gameOver <span class="op">&&</span> board[square <span class="op">/</span> 3][square <span class="op">%</span> 3] <span class="op">==</span> \' \') {<br/>&nbsp&nbsp&nbsp&nbspboard[square <span class="op">/</span> 3][square <span class="op">%</span> 3] <span class="op">=</span> players[turnsTaken<span class="op">++ %</span> 2];<br/>&nbsp&nbsp}<br/>&nbsp&nbsp<span class="op">return</span> evaluateBoard();<br/>};</div><p>You have finished this lesson!</p><br/>',
    Qs : [Question({
        statement: '<p>Now that you are familiar with the game of Tic-Tac-Tow, please play a few games to try to determine what is wrong!</p>',
        question : 'What is wrong with the game?',
        answers : ["The game never ends.",
                    "The wrong cell is played.",
                    "Nothing can be entered into a square."
        ],
        correct : 1
    }), Question({
        statement: '<p>That was easy!  But now the question is, "Why?".  Observe the code below, and describe what it does:</p><div class="code"><span class="comment">//variables</span><br/>private <span class="type">int</span> turnsTaken <span class="op">=</span> 0;<br/>private <span class="type">char[]</span> p <span class="op">=</span> {\'X\', \'O\'};<br/><br/><span class="comment">// square ==  [0 - 8] representing the 9 squares of the board.</span><br/>public <span class="type">Boolean</span> takeTurn (<span class="type">int</span> square) {<br/>&nbsp&nbspif ( <span class="op">!</span>gameOver <span class="op">&&</span> board[square <span class="op">/</span> 3][square <span class="op">%</span> 3] <span class="op">==</span> \' \') {<br/>&nbsp&nbsp&nbsp&nbspboard[square <span class="op">%</span> 3][square <span class="op">/</span> 3] <span class="op">=</span> players[turnsTaken<span class="op">++ %</span> 2];<br/>&nbsp&nbsp}<br/>&nbsp&nbsp<span class="op">return</span> evaluateBoard();<br/>};</div>',
        question : "What is wrong in this example, if there is anything wrong?",
        answers : ["Nothing is wrong, the problem lies elsewhere.",
                    "turnsTaken is not increased at the right time.",
                    "It plays in the wrong square."
        ],
        correct : 2
    })]
}));