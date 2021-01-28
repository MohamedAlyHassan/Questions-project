export class Quiz {
    constructor(questions, amount) {
        this.questions = questions;
        this.amount = amount;
        this.currentQuestionElement = document.getElementById("current")
        this.totalAmountElement = document.getElementById("totalAmount")
        this.questionElement = document.getElementById("question")
        this.rowAnswerElement = document.getElementById("rowAnswer");
        this.checkedElement = document.getElementsByName("answer");
        this.nextBtn = document.getElementById("next");
        this.tryBtn = document.getElementById("tryBtn");
        this.currentQuestions = 0;
        this.scoreElement= document.getElementById("score");
        this.score=0;
        this.isCorrect = false;
        this.nextBtn.addEventListener("click", ()=> {
            this.nextQuestion()
        })
        this.tryBtn.addEventListener("click",()=> { this.tryAgain() })
        this.showQuestions();

    }
    nextQuestion() {
        let checkedAnswer = [...this.checkedElement].filter(el => el.checked);
        if(checkedAnswer.length == 0)
        {
            $(".alert").fadeIn(500)
        }
        else{
            $(".alert").fadeOut(500)
            this.isCorrect = this.checkAnswers(checkedAnswer[0].value);
            (this.isCorrect) ?  $("#Correct").fadeIn(500,()=>{this.show()}) : $("#inCorrect").fadeIn(500,()=>{this.show()})
        }
      
        
    }
    show(){
        $("#Correct").fadeOut(0)
        $("#inCorrect").fadeOut(0)
        this.currentQuestions++;
        (this.currentQuestions < this.amount) ? this.showQuestions() : this.finish()

    }
    showQuestions() {
        this.questionElement.innerHTML = this.questions[this.currentQuestions].question;
        this.currentQuestionElement.innerHTML = this.currentQuestions + 1;
        this.totalAmountElement.innerHTML = this.amount;
        let answers = this.getAnswer(this.questions[this.currentQuestions])
        this.showAnswer(answers);
    }
    getAnswer(currentQuestion) {
        let answers = [
            currentQuestion.correct_answer,
            ...currentQuestion.incorrect_answers
        ]
        console.log("answers", answers)
        let ranNums = [],
            i = answers.length,
            j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranNums.push(answers[j]);
            answers.splice(j, 1);
        }
        return ranNums
    }
    showAnswer(answersArray) {
        let temp = '';
        for (let i = 0; i < answersArray.length; i++) {
            temp += `<div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${answersArray[i]}">
                ${answersArray[i]}
            </label>
        </div>`

        }
        this.rowAnswerElement.innerHTML = temp;
    }
    checkAnswers(value) {
        let correct = false;
       
        if (this.questions[this.currentQuestions].correct_answer == value) {
            correct = true;
            this.score++;
        }
        else {
            correct = false;
        }
     
        return correct
    }
    finish() {
        this.scoreElement.innerHTML= this.score;
       $("#quiz").fadeOut(500,()=>{
           $("#finish").fadeIn(500)
       })
    }
    tryAgain()
    {
        $("#finish").fadeOut(500,()=>{
            $("#setting").fadeIn(500)
        })
    }

}