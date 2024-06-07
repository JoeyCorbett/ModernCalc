let firstNum;
let operator;
let secondNum;
let displayVar;

const numBtns = document.querySelectorAll(".nums, .zero");
let displayNum = document.querySelector(".display-numbers")


function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
    op(a, b);
}

function populateDisplay(num) {
    displayNum.textContent = num;
    // displayVar = displayNum.textContent;
}

numBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let value = e.target.innerHTML
        populateDisplay(value);
        displayVar = value;        
    });
});
 