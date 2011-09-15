/*globals SUDOKU, LearningCase, Question*/

SUDOKU.namespace("SUDOKU.lessons");
SUDOKU.lessons = [];

// Lesson 1
SUDOKU.lessons.push(LearningCase({
    title : 'Lesson 1 : "VARrgh!" - Proper Naming Practices',
    outro : "Great work! \n\nIt is important to use exact naming with our instance variables and methods for our own benefit. Another instance variable each Cell has is its identification number. Its possible to name this instance variable 'num' but this may lead to confusion between 'num' and 'number' when our methods become more complicated.\nHere is an example of the code used to create this error:\n\nJButton b3 = new JButton(Integer.toString(g.c[3].n));\n\nThis is a horrible example of code! What is \"g\"? What is \"c\"? What is \"n\"?An example of the same line of code using proper variable names:\n\nJButton button3 = new JButton(Integer.toString(game.cells[3].number));\n\nYou have finished this lesson. Please proceed to the next lesson!",
    Qs : [Question({
            statement: "Instant Variables are values within a Java Class that are needed to store information that might be used at a later time. Technically speaking, an instance variable is both a reference to some data and the current state of that data. \n\nAt this time, please generate a new game and try to determine what is wrong!",
            question : "What is wrong with the game?",
            answers : ["The total number of cells decreased.",
                    "The cells no longer display the proper information.",
                    "New games are not being properly generated."
                ],
            correct : 1
        }), Question({
            statement: "In this Sudoku Game, each cell is represented by an instance of the class Cell. The most important information each Cell must know is the Current Number that the Cell contains. We represent this information with an instance variable of type integer (int), called \"number\". The Cell also contains an identification number called \"id\":\n\nprivate int number;\nprivate int id;\n\n",
            question : "What do you think happened in this example?",
            answers : ["The names of the variables were mixed up.",
                    "There's a flaw in Java that caused this error.",
                    "The wrong method was called."
                ],
            correct : 0
        })]
}));

// Lesson 2
SUDOKU.lessons.push(LearningCase({
    title : "Lesson 2 : Loops! For Loops and While Loops",
    outro : "Great work! \n\nA) is the only method that properly evaluates each Cell Group. B) will properly return FALSE if the Sudoku board is NOT complete, however it will encounter an issue when the board is complete! Because the condition statement does not consider the iterator, i, it will continue to look for a 10th row, which DOES NOT EXIST! C) falls victim to a poorly written condition statement, as well. C) is the broken example that is wrong with the current game, it ONLY evaluates the last row, last column and last square!\n\nYou have finished this lesson. Please proceed to the next lesson!",
    Qs : [Question({
        statement: "Loops are an essential tool for any programmer to have in their toolbox. Loops allow for you to repeat certain actions in a controlled manner, or they allow you to iterate over a selection of data.\n\nPlease generate a new game and try to determine what is wrong!",
        question : "What is wrong with the game?",
        answers : ["Numbers cannot be played in the cells.",
                   "It's stuck in an infinite loop.",
                   "It does not properly determine if the game is 'over'."
            ],
        correct : 2
    }), Question({
        statement: 'The logic to determine if a Sudoku board is complete is simple:\n\n"Are all columns, rows, and 3x3 squares complete?"\n\nBut we have to be more explicit when we program. So, really the logic is, "Is row1 complete? Is column1 complete?..." all the way until every grouping has been considered.',
        question : "Which of the following gameOver() methods is correct?",
        answers : ["public Boolean gameOver(){\nBoolean result = true;\nint i=0;\nwhile (result && i<9){\nresult = result \n&& rows[i].isComplete()\n&& columns[i].isComplete()\n&& squares[i++].isComplete();\nreturn result;}",
                    "public Boolean gameOver(){\nBoolean result = true;\nint i=0;\nwhile (result){\nresult = result \n&& rows[i].isComplete()\n&& columns[i].isComplete()\n&& squares[i].isComplete();\ni++;}\nreturn result;}",
                    "public Boolean gameOver(){\nBoolean result = true;\nint i=0;\nwhile (i<9){\nresult = rows[i].isComplete()\n&& columns[i].isComplete()\n&& squares[i].isComplete();\ni++;}\nreturn result;}"
            ],
        correct : 0
    })]
}));

// Lesson 3
SUDOKU.lessons.push(LearningCase({
    title : "Lesson 3 : Know Your API!",
    outro : "Great job! A) produces a random number 0-9, and then subtracts 1 from it, so the resulting range is -1 to 8. B) produces a random number 0-8 and does nothing to it. C) produeces the same random number 0-8 and then adds 1 to it, resulting in a range of 1-9 which is our desired range!\n\nYou have finished the last lesson!!! Congratulations, and Happy Programming!!!",
    Qs : [Question({
        statement: "One of the most valuable lessons a budding programmer can learn is this: \n\n\"When in doubt, refer to the Application Program Interface (API)!!\"\n\nA programmer should always strive to be well-versed with any API they are working with. The Complete Java API can be found here: ",
        question : "What is wrong with the game?",
        answers : ["The game never ends!",
                   "The cells do not have appropriate numbers",
                   "It is not possible to play a cell."
            ],
        correct : 1
    }), Question({
        statement: "Good job! The cells contain the numbers 0-8 instead of 1-9. It is important to note, that when programming, we normally start counting from 0!! After you finish this lesson, go back and look at Lesson 1. Notice, how the Cell's Numbers start from 0!\n\nWhen we generate a board for this game of Sudoku, we assign random numbers to the cells in such a manner that we follow the rules (Click \"Show Hint!\" if you forgot the rules). \n\nFollow the link below to read the Java implementation of a Pseudo-Random Number Generator and answer the following question!",
        question : "How do you generate a random number between 1-9?",
        answers : ["Random r = new Random();\nint number = r.nextInt(10)-1;",
                   "Random r = new Random();\nint number = r.nextInt(9);",
                   "Random r = new Random();\nint number = r.nextInt(9)+1;"
            ],
        correct : 2
    })]
}));