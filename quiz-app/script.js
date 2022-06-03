const quizData = [
    {
        question: 'How old is Risa?',
        a: '10',
        b: '23',
        c: '32',
        d: '24',
        correct: 'c'
    },{
        question: 'What is best programming language in 2019?',
        a: 'python',
        b: 'java',
        c: 'c',
        d: 'javaScript',
        correct: 'a'
    },{
        question: 'Who is the precident of Australia?',
        a: 'Scott morison',
        b: 'Donald Trump',
        c: 'Florin pop',
        d: 'Anthony Albanese',
        correct: 'd'
    },{
        question: 'who is the national poet of Bangladesh?',
        a: 'Kazi Nazrul Islam',
        b: 'Robindronath thakur',
        c: 'Florin pop',
        d: 'Sandy Saha',
        correct: 'a' 
    },
    {
        question: "What year was JavaScript launched?",
        a: "1998",
        b: "1995",
        c: "1978",
        d: "none of the above",
        correct: "b"
    }
]


const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const quiz = document.getElementById("quiz");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz(){
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

}
function getSelected(){
    let answer = undefined;
    answerEls.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    return answer;
}
function deselectAnswers(){
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener("click", ()=>{
    const answer = getSelected();
    console.log(answer)
    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }
        currentQuiz++; 
        if(currentQuiz < quizData.length){
            loadQuiz();
        }else{
            quiz.innerHTML = `<h2>You correctly answered ${score} out of ${quizData.length} question </h2>
            `
            submitBtn.style.display = 'none';
            document.querySelector(".quiz-container").innerHTML += '<button onclick="location.reload()">Start Again</button>'
        }
    }
    
})