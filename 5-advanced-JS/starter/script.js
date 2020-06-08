function Question (){
    question: "";
    answerA: "";
    answerB: "";
    answerC:"";
    correctAnswer: 0;
 
    function displayAnswer(){
        return answerA, answerB, answerC;
    };
}

A = new Question ();
A.question ="Hello World";
A.answerA="Yes!";
A.answerB="No!";
A.answerC="Maybe";
A.correctAnswer=1;

B = new Question();
B.question="Nicolai?";
B.answerA="Yes!";
B.answerB="No!";
B.answerC="Maybe";
B.correctAnswer=1;

var questions=[A,B];

function stringConsturct(Question){
    question=Question.question +"\n 1. "+Question.answerA +"\n 2. "+ Question.answerB + "\n 3. " + Question.answerC;
    return prompt(question);

}



var run =1;
while(run){
    if(stringConsturct(questions[Math.floor(Math.random()*questions.length)])==="exit"){
        run = 0;

    }
       

}
