const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const lowerEl = document.getElementById("lower");
const upperEl = document.getElementById("upper");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
const msgBoxEl = document.getElementById("msg-box");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_-+=~`:".><?/';

function getLowercase(){
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)]; 
}
function getUppercase(){
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getNumbers(){
    return numbers[Math.floor(Math.random() * numbers.length )];
}
function getSymbol(){
    return symbols[Math.floor(Math.random()* symbols.length)]; 
}


function generatePassword(){
    msgBoxEl.innerText = "";
    let len = lenEl.value;
    let password = '';

    if (len < 8 || len > 20){
        len = 10;
        lenEl.value = 10;
        msgBoxEl.innerText = "* Please select the correct size";
    }
    if(upperEl.checked){
        password += getUppercase();
    }
    if(lowerEl.checked){
        password += getLowercase();
    }
    if(numberEl.checked){
        password += getNumbers();
    }
    if(symbolEl.checked){
        password += getSymbol();
    }

    console.log(password);
    for(let i=password.length; i <len; i++){
        const x = generateX();
        password += x;
    }

    pwEl.innerText = password;
}
function generateX(){
    const pws = [];
    if(upperEl.checked){
        pws.push(getUppercase());
    }
    if(lowerEl.checked){
        pws.push(getLowercase());
    }
    if(numberEl.checked){
        pws.push(getNumbers());
    }
    if(symbolEl.checked){
        pws.push(getSymbol());
    }
    if(pws.length === 0) {
        msgBoxEl.innerText = "* Please Select one checkbox";
        return "";
    }
    return pws[Math.floor(Math.random() * pws.length)];
}

generateEl.addEventListener("click", generatePassword); 
copyEl.addEventListener("click",()=>{
    const textarea = document.createElement("textarea");
    const pass = pwEl.innerText;
    console.log(pass);

    textarea.value = pass;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    msgBoxEl.innerText = "Successfully copied!";
});
