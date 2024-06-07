let firstNum;
let operator;
let secondNum;
let displayValueOne;
let displayValueTwo;

const numBtns = document.querySelectorAll(".input");
let displayNum = document.querySelector(".display-numbers");
let clearBtn = document.querySelector(".clear");
let operators = document.querySelectorAll(".operator")

const operatorArr = [];

let operatorValues = {
    divide: "/",
    multiply: "*",
    add: "+",
    subtract: "-"
}


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
    return op(a, b);
}

function populateDisplay(num) {
    let value = displayNum.textContent;
    if (value === "0" || operatorArr.includes(value)) {
        displayNum.textContent = num;
        displayValueOne = num;
    } else {
        displayNum.textContent += num;
        displayValueOne = value;
    }
}

function manageNums(operator) {
    
}

numBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let value = e.target.innerHTML
        populateDisplay(value);
    });
});



clearBtn.addEventListener("click", () => {
    displayNum.textContent = "0";
});

operators.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let value = e.target.innerHTML;
        displayNum.textContent = value;
        for (let key in operatorValues) {
            if (value == operatorValues[key]) {
                value = key;
            }
            operatorArr.push(operatorValues[key]);
        }
        manageNums(value);
    });
});




// Store first and second number input
    // Figure out how to store 2+ digit numbers
// Utilize operator that user selects
// Operate on two numbers when user presses "="
// Once operate() called udpate display with solution of operation
 