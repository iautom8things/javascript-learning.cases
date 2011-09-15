/*globals BOGGLE, LearningCase, Question*/

BOGGLE.namespace("BOGGLE.lessons");
BOGGLE.lessons = [];
BOGGLE.lessons.push(LearningCase({
    title : 'Lesson 1 : "Which Switch?" - Proper Use of Switches',
    outro : '<h1>Lesson 1: "Which Switch?"Great work!</h1>You have finished this lesson. Please proceed to the next lesson!',
    Qs : [Question({
        statement: "Boggle scores words with the following rules:<br><br>Word of length 3 or 4 = 1 points<br>Word of length 5 = 2 points<br>Word of length 6 = 3 points<br>Word of length 7 = 5 points<br>Word of length 8+ = 11 points<br><br>At this time, please play a few words to try to determine what is wrong!",
        question : "What is wrong with the game?",
        answers : [ "Words of length 5+ all get 5 points.",
                    "Words of length 4 get 4 points.",
                    "Words of length 3 or 4 get 3 points."        
        ],
        correct : 2
    }), Question({
        statement: 'Sometimes when we have to code several if/else statements in a row, we might get to thinking "Maybe there\'s an easier way than this?"\nOne possible answer to this is the Switch statement. Unfortunately for us, the Switch statement is much trickier than you can imagine!\nPlease read over the supplied link regarding Switch statements and determine which IMPROPER Switch statement is used!',
        question : "Which Switch statement is used in this example?",
        answers : [ '<div class="code"><span class="type">int</span> size <span class="op">=</span> word.length();<br><span class="op">switch</span> (size) {<br>&nbsp&nbsp<span class="op">case</span> 3:<br>&nbsp&nbsp<span class="op">case</span> 4: score<span class="op">++</span>;<br>&nbsp&nbsp<span class="op">case</span> 5: score <span class="op">+=</span> 2; <span class="op">break</span>;<br>&nbsp&nbsp<span class="op">case</span> 6: score <span class="op">+=</span> 3; <span class="op">break</span>;<br>&nbsp&nbsp<span class="op">case</span> 7: score <span class="op">+=</span> 5; <span class="op">break</span>;<br>&nbsp&nbsp<span class="op">default</span>: score <span class="op">+=</span> 11;<br>}</div>',
                    '<div class="code"><span class="type">int</span> size <span class="op">=</span> word.length();<br><span class="op">switch</span> (size) {<br>&nbsp&nbsp<span class="op">case</span> 3:<br>&nbsp&nbsp<span class="op">case</span> 4: score<span class="op">++</span>; <span class="op">break</span>;<br>&nbsp&nbsp<span class="op">case</span> 5: score <span class="op">+=</span> 2; <span class="op">break</span>;<br>&nbsp&nbsp<span class="op">case</span> 6: score <span class="op">+=</span> 3; <span class="op">break</span>;<br>&nbsp&nbsp<span class="op">case</span> 7: score <span class="op">+=</span> 5; <span class="op">break</span>;<br>&nbsp&nbsp<span class="op">default</span>: score <span class="op">+=</span> 11;<br>}</div>',
                    '<div class="code"><span class="type">int</span> size <span class="op">=</span> word.length();<br><span class="op">switch</span> (size) {<br>&nbsp&nbsp<span class="op">case</span> 3:<br>&nbsp&nbsp<span class="op">case</span> 4: score<span class="op">++</span>;<br>&nbsp&nbsp<span class="op">case</span> 5: score <span class="op">+=</span> 2;<br>&nbsp&nbsp<span class="op">case</span> 6: score <span class="op">+=</span> 3; <br>&nbsp&nbsp<span class="op">case</span> 7: score <span class="op">+=</span> 5;<br>&nbsp&nbsp<span class="op">default</span>: score <span class="op">+=</span> 11;<br>}</div>'
        ],
        correct : 0
    })]
}));
BOGGLE.lessons.push(LearningCase({
    title : "Lesson 2 : Contracts! - Follow Client/Server Contracts",
    outro : '<h1>Lesson 2 : Contracts!</h1><br>Congratulations! You have completed this lesson!',
    Qs : [Question({
        statement: "Like Application Program Interfaces (APIs), Client/Server Contracts are to be read and followed whenever available!<br><br>Please play a few words to try to determine what is wrong!",
        question : "What is wrong with the game?",
        answers : [ "Words of length 5+ all get 5 points.",
                    "Words of all lengths get 0 points.",
                    "Words of length 3 or 4 get 3 points."
        ],
        correct : 1
    }), Question({
        statement: 'Great job! Please read the following Client/Server Contract for the Boggle Game\'s Dictionary and determine which method invocation is the correct one, that will yield the proper scoring.<br><br><div class="code"><span class="comment">/**<br> * Requires:&nbsp&nbspThe string word must be in all lowercase letters<br> * Ensures:&nbsp&nbspReturns TRUE if word is found in dictionary <br>*/</span><br>public <span class="type">Boolean</span> isReal(<span class="type">String</span> word);</div><br><br>You might find the String Interface useful:',
        question : "Which call to dictionary.isReal(String word): is correct?",
        answers : [ "word.toLowerCase();<br>if (dictionary.isReal(word)){...;",
                    "if (dictionary.isReal(toLowerCase(word))){...;\n",
                    "if (dictionary.isReal(word.toLowerCase())){...;\n"
        ],
        correct : 2
    })]
}));