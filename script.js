let operator;
let num1 = "";
let num2 = "";
let firstNum = false;

const numBtns = document.querySelectorAll(".input");
const allBtns = document.querySelectorAll(".nums, .zero");
let displayNum = document.querySelector(".display-numbers");
let clearBtn = document.querySelector(".clear");
let equals = document.querySelector(".equals");
let calculator = document.querySelector(".calculator-div");
let operatorBtns = document.querySelectorAll(".operator")

let num1Flag = true;
let num2Flag = false;
let sumFlag = false;

let divideActive = false;
let multiplyActive = false;
let sumActive = false;
let subtractActive = false;

let divideBtn = document.querySelector(".divide");
let multiplyBtn = document.querySelector(".multiply");
let addBtn = document.querySelector(".addition");
let subtractionBtn = document.querySelector(".subtract");

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

function active() {
    if (divideActive) {
        divideBtn.classList.remove("selected");
    } else if (multiplyActive) {
        multiplyBtn.classList.remove("selected");
    } else if (sumActive) {
        addBtn.classList.remove("selected");
    } else if (subtractActive) {
        subtractionBtn.classList.remove("selected");
    } 
}

function allClear() {
    if (displayNum.textContent !== "0") {
        clearBtn.textContent = "C";
    } else {
        clearBtn.textContent = "AC";
    }
}


numBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let value = e.target.innerHTML
        if (num1Flag) {
            num1 += value;
            populateDisplay(+num1);
            console.log(`Num1: ${num1}`);
        } else {
            num2 += value;
            populateDisplay(+num2);
            num2Flag = true;
            console.log(`Num2: ${num2}`);
        }
        allClear();
    });
});


clearBtn.addEventListener("click", () => {
    displayNum.textContent = "0";
    num1Flag = true;
    num2Flag = false;
    num1 = "";
    num2 = "";
    active();
    allClear();
});

calculator.addEventListener('dblclick', (event) => {
    event.preventDefault();
}, { passive: false });


divideBtn.addEventListener("click", () => {
    operator = divide;
    num1Flag = false;
    divideBtn.classList.add("selected");
    divideActive = true;
});

multiplyBtn.addEventListener("click", () => {
    operator = multiply;
    active(multiplyBtn);
    num1Flag = false;
    multiplyBtn.classList.add("selected");
    multiplyActive = true;
});

addBtn.addEventListener("click", () => {
    operator = sum;
    active(addBtn);
    num1Flag = false;
    addBtn.classList.add("selected");
    sumActive = true;
});

subtractionBtn.addEventListener("click", () => {
    operator = subtract;
    active(subtractionBtn);
    num1Flag = false;
    subtractionBtn.classList.add("selected");
    subtractActive = true;
})

equals.addEventListener("click", () => {
    if (!num1Flag && num2Flag) {
        sumFlag = true;
        populateDisplay(operate(operator, +num1, +num2));
        sumFlag = false;
        active();
        allClear();
    }
});


allBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("clicked-white");
        setTimeout(() => {
            btn.classList.toggle("clicked-white");
        }, 40);
    });
});


/* operatorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("clicked-red");
        setTimeout(() => {
            btn.classList.toggle("clicked-red");
        }, 40);
    });
});
*/


