let operator;
let num1 = "";
let num2 = "";
let firstNum = false;

const numBtns = document.querySelectorAll(".input");
let displayNum = document.querySelector(".display-numbers");
let clearBtn = document.querySelector(".clear");
let operators = document.querySelectorAll(".operator")
let equals = document.querySelector(".equals");
let calculator = document.querySelector(".calculator-div");

let num1Flag = true;
let num2Flag = false;
let sumFlag = false;
let isSelected = false;

let divideBtn = document.querySelector(".divide");
let multiplyBtn = document.querySelector(".multiply");
let addBtn = document.querySelector(".addition");
let subtractionBtn = document.querySelector(".subtract");

const operatorArr = [];

let operatorValues = {
    divide: "÷",
    multiply: "x",
    sum: "+",
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
    if (typeof num === 'number') {
        displayNum.textContent = num;
    }
}


numBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let value = e.target.innerHTML
        if (num1Flag) {
            num1 += value;
            populateDisplay(+num1);
            console.log(`NUM1: ${num1}`); 
        } else {
            num2 += value;
            populateDisplay(+num2);
            console.log(`NUM2: ${num2}`); 
            num2Flag = true;
        }
    });
});


clearBtn.addEventListener("click", () => {
    displayNum.textContent = "0";
    num1Flag = true;
    num2Flag = false;
    num1 = "";
    num2 = "";
});

/* operators.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let operatorValue = e.target.innerHTML; 
        for (let key in operatorValues) {
            if (operatorValue == operatorValues[key]) {
                operator = key;
            }
            operatorArr.push(operatorValues[key]);
        }
        flag = true;
    });
}); */

calculator.addEventListener('dblclick', (event) => {
    event.preventDefault();
}, { passive: false });


divideBtn.addEventListener("click", () => {
    operator = divide;
    populateDisplay("÷");
    divideBtn.classList.toggle
    num1Flag = false;
});

multiplyBtn.addEventListener("click", () => {
    operator = multiply;
    populateDisplay("x");
    num1Flag = false;
});

addBtn.addEventListener("click", () => {
    operator = sum;
    populateDisplay("+");
    num1Flag = false;
});

subtractionBtn.addEventListener("click", () => {
    operator = subtract;
    populateDisplay("-");
    num1Flag = false;
})

equals.addEventListener("click", () => {
    console.log(num1Flag, num2Flag)
    if (!num1Flag && num2Flag) {
        sumFlag = true;
        populateDisplay(operate(operator, +num1, +num2));
        sumFlag = false;
    }
});


// Take first number and store it once operator is pushed
// Put operator next to first value
// Take second operator and store it once equal is pushed
// second first val, second val, and operator to operate


// Store first and second number input
// Figure out how to store 2+ digit numbers
// Utilize operator that user selects
// Once operate() called udpate display with solution of operation

// Operate on two numbers when user presses "="