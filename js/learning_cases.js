/*
    @Params:
        opening, summary, questions
*/
function LearningCase (params) {
    // If Constructor was not called with 'new', call it with 'new'
    if (!(this instanceof LearningCase)) {
        return new LearningCase(params);
    }
    
    return {
        //API of Learning Case
        title : params.title,
        outro : params.outro,
        Qs : params.Qs,
        len : params.Qs.length
    };
}

/*
    @Params:
        statement - String - paragraph building up to a question
        question - String - question to be answered
        answers - Array[String] - possible answers
        correct - Integer - index of correct answer
*/
function Question (params) {
    // If Constructor was not called with 'new', call it with 'new'
    if (!(this instanceof Question)) {
        return new Question(params);
    }
    
    return {
        // API of Question
        statement : params.statement,
        question : params.question,
        answers: params.answers,
        len: params.answers.length,
        isCorrect: function (attempt) {
            return attempt === params.correct;
        }
    };
}

/*
    TEMPLATE FOR ADDING LESSONS:
    

SUDOKU.lessons.push(LearningCase({
    title : ,
    outro : ,
    Qs : [Question({
        statement: ,
        question : ,
        answers : [],
        correct :
    }), Question({
        statement: ,
        question : ,
        answers : [],
        correct :
    })]
}));


*/