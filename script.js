let operator;
let num1 = "";
let num2 = "";
let solution = "";

const numBtns = document.querySelectorAll(".input");
const allBtns = document.querySelectorAll(".input, .zero, .decimal");
let displayNum = document.querySelector(".display-numbers");
let clearBtn = document.querySelector(".clear");
let equals = document.querySelector(".equals");
let calculator = document.querySelector(".calculator-div");
let topBtns = document.querySelectorAll(".clear, .plus-minus, .percent");
let operatorBtns = document.querySelectorAll(".operator, .equals")
let buttons = document.querySelector(".buttons");
let operators = document.querySelectorAll(".divide, .multiply, .addition, .subtract");

let isClicked = false;
let num1Flag = true;
let num2Flag = false;
let clearFlag = true;

// Calculator Logic

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

/* function active() {
    if (divideActive) {
        divideBtn.classList.remove("selected");
    } else if (multiplyActive) {
        multiplyBtn.classList.remove("selected");
    } else if (sumActive) {
        addBtn.classList.remove("selected");
    } else if (subtractActive) {
        subtractionBtn.classList.remove("selected");
    } 
} */

function allClear() {
    if (clearFlag) {
        clearBtn.textContent = "AC";
    } else {
        clearBtn.textContent = "C";
    }
}

function continueCalc() {
    num1 = solution;
    num2 = "";
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
        clearFlag = false;
        allClear();
    });
});


clearBtn.addEventListener("click", () => {
    displayNum.textContent = "0";
    num1Flag = true;
    num2Flag = false;
    num1 = "";
    num2 = "";
    //active();
    clearFlag = true;
    allClear();
});

calculator.addEventListener('dblclick', (event) => {
    event.preventDefault();
}, { passive: false });


operators.forEach(btn => {
    btn.addEventListener("click", (event) => {
       if (event.target.classList.contains("divide")) {
            operator = divide;
            num1Flag = false;
       } else if (event.target.classList.contains("multiply")) {
            operator = multiply;
            num1Flag = false;
       } else if (event.target.classList.contains("subtract")) {
            operator = subtract;
            num1Flag = false;
       } else if (event.target.classList.contains("addition")) {
            operator = sum;
            num1Flag = false;
       }
    });
});


equals.addEventListener("click", () => {
    if (!num1Flag && num2Flag) {
        solution = operate(operator, +num1, +num2);
        if (!Number.isInteger(solution)) {
            solution = +solution.toFixed(4);
        }
        populateDisplay(solution);
        continueCalc();
        //active();
    }
});

// Click Effects

buttons.addEventListener("mousedown", (e) => {
    if (e.button == 0) {
        isClicked = true;
    }
});

buttons.addEventListener("mouseup", () => {
    isClicked = false;
});

allBtns.forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.classList.add("clicked-white");
    });
    btn.addEventListener("mouseup", () => {
        btn.classList.remove("clicked-white");
    });
    buttons.addEventListener('mousemove', (event) => {
        if (!btn.contains(event.target)) {
            btn.classList.remove("clicked-white");
        }
    });
});

topBtns.forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.id = "clicked-gray"
    });
    btn.addEventListener("mouseup", () => {
        btn.id = "";
    });
    buttons.addEventListener('mousemove', (event) => {
        if (!btn.contains(event.target)) {
            btn.id = "";
        }
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.id = "clicked-red";
    });
    btn.addEventListener("mouseup", () => {
        btn.id = "";
    });
    buttons.addEventListener('mousemove', (event) => {
        if (!btn.contains(event.target)) {
            btn.id = "";
        }
    });
});



