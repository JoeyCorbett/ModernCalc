let operator;
let num1 = "";
let num2 = "";
let solution = "";

const boop = document.getElementById("macOS-boop");

const allBtns = document.querySelectorAll(".nums, .input");
const numBtns = document.querySelectorAll(".input");
const inputBtns = document.querySelectorAll(".input, .zero, .decimal");
let displayNum = document.querySelector(".display-numbers");
let clearBtn = document.querySelector(".clear");
let equals = document.querySelector(".equals");
let calculator = document.querySelector(".calculator-div");
let topBtns = document.querySelectorAll(".clear, .plus-minus, .percent");
let operatorBtns = document.querySelectorAll(".operator, .equals")
let buttons = document.querySelector(".buttons");
let operators = document.querySelectorAll(".divide, .multiply, .addition, .subtract");
let percentBtn = document.querySelector(".percent");
let negationBtn = document.querySelector(".plus-minus");
let decimalBtn = document.querySelector(".decimal");

let operatorArr = [];
let operatorList = ["+", "-", "/", "*"];

const operatorObj = {
    "/": "÷",
    "*": "×",
    "+": "+",
    "-": "−"
}

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
    if (b === 0) displayNum.textContent = "Error";
    else return a / b;
}

function operate(op, a, b) {
    return op(a, b);
}

function populateDisplay(num) {
    displayNum.textContent = num;
}


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

function round() {
    if (typeof (solution) !== "undefined") {
        solution = +solution.toFixed(3);
    }
}

function previousCalc() {
    if (!num1Flag && num2Flag && num2 !== "") {
        let n = operatorArr.length;
        solution  = operate(operatorArr[n - 2], +num1, +num2);
        if (!Number.isInteger(solution)) round();
        populateDisplay(solution);
        continueCalc();
   }
}

function manageNums(num) {
    if (num1Flag) {
        num1 += num;
        populateDisplay(+num1);
    } else {
        num2 += num;
        populateDisplay(+num2);
        num2Flag = true;
    }
    clearFlag = false;
    allClear();
}


function handleEquals() {
    if (!num1Flag && num2Flag) {
        let n = operatorArr.length;
        solution = operate(operatorArr[n - 1], +num1, +num2);
        if (!Number.isInteger(solution)) round();
        populateDisplay(solution);
        delay();
        continueCalc();
    }
}

function handleClear() {
    displayNum.textContent = "0";
    num1Flag = true;
    num2Flag = false;
    num1 = "";
    num2 = "";
    clearFlag = true;
    allClear();
}

function handleOperators(key) {
    switch (key) {
        case "+":
            operatorArr.push(sum);
            break;
        case "-":
            operatorArr.push(subtract);
            break;
        case "/":
            operatorArr.push(divide);
            break;
        case "*":
            operatorArr.push(multiply);
            break;
    }
    num1Flag = false;
}

function handleBackspace() {
    if (displayNum.textContent == "0") boop.play();
    if (num1Flag && num1.length > 0) {
        num1 = num1.slice(0, num1.length - 1);
        populateDisplay(+num1);
    } else if (num2Flag && num2.length > 0) {
        num2 = num2.slice(0, num2.length - 1);
        populateDisplay(+num2);
    } else if (solution !== "") boop.play();
}

function handleDecimal() {
    if (num1Flag) {
        num1 += ".";
        populateDisplay(num1);
    } else {
        num2 += ".";
        populateDisplay(num2);
    }
}

function delay() {
    let value = displayNum.textContent;
    displayNum.textContent =  "";
    setTimeout(() => {
        displayNum.textContent = value;
    }, 60);
}

function clearSelected() {
    operators.forEach((btn) => btn.classList.remove('selected'));
}

function checkDecimals() {
    let text = displayNum.textContent;
    for (let num = 0; num < text.length; num++) {
        if (text[num] === ".") return false;
    }
    return true;
}


numBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let value = e.target.innerHTML;
        manageNums(value);
    });
});


clearBtn.addEventListener("click", () => {
    handleClear();
    clearSelected();
});

calculator.addEventListener('dblclick', (event) => {
    event.preventDefault();
}, { passive: false });


operators.forEach(btn => {
    btn.addEventListener("click", (event) => {
       if (event.target.classList.contains("divide")) {
            operatorArr.push(divide);
       } else if (event.target.classList.contains("multiply")) {
            operatorArr.push(multiply);
       } else if (event.target.classList.contains("subtract")) {
            operatorArr.push(subtract);
       } else if (event.target.classList.contains("addition")) {
            operatorArr.push(sum);
       }

       num1Flag = false;

       previousCalc();
       delay();
    });
});


equals.addEventListener("click", () => {
    handleEquals();
    clearSelected();
});


percentBtn.addEventListener("click", () => {
    if (num1Flag && num1 >= 0.001) {
        num1 /= 100;
        populateDisplay(num1);
    } else if (num2 >= 0.001) {
        num2 /= 100;
        populateDisplay(num2);
    } else if (!num1Flag && num2Flag) {
        solution /= 100;
        populateDisplay(solution);
        continueCalc();
    }
});

// If positive, convert to negative
// If negative, convert to positive

negationBtn.addEventListener("click", () => {
    if (num1Flag && Math.sign(num1) == 1) {
        num1 = -num1;
        populateDisplay(num1);      
    } else if (num1Flag) {
        num1 = Math.abs(num1);
        populateDisplay(num1);
    } else if (Math.sign(num2) == 1) {
        num2 = -num2;
        populateDisplay(num2)
    } else if (Math.sign(num2) == -1) {
        num2 = Math.abs(num2);
        populateDisplay(num2);
    } else if ((!num1Flag && num2Flag) && Math.sign(solution) == 1) {
        solution = -solution;
        populateDisplay(solution)
        continueCalc();
    } else if ((!num1Flag && num2Flag) && Math.sign(solution) == -1) {
        solution = Math.abs(solution);
        populateDisplay(solution);
        continueCalc();
    }
});

decimalBtn.addEventListener("click", () => {
    if (checkDecimals()) handleDecimal();
    else boop.play();
});

// Keyboard Support
    
document.addEventListener("keydown", (event) => {
    let key = event.key;
    let type;
    if (Number.isInteger(+key)) {
        manageNums(+key);
        type = "input";
    } else if (operatorList.includes(key)) {
        handleOperators(key);
        type = "operator";
        previousCalc();
        delay();
    } else if (key === "Enter" || key === "=") {
        handleEquals();
        type = "equal";
    } else if (key === "c" || key === "Escape") {
        handleClear();
        type = "clear";
    } else if (key === "Backspace") {
        handleBackspace();
        type = "backspace";
    } else if (key === ".") {
        if (checkDecimals()) handleDecimal();
        else boop.play();
        type = "decimal";
    }

    handleClick(key, type);
});

// Click Effects 

// Effects for keyboard inputs

function handleClick(key, type) {
    if (type === "input") {
        inputBtns.forEach(btn => {
            if (btn.innerHTML === key) {
                btn.classList.add("clicked-white");
                setTimeout(() => {
                    btn.classList.remove("clicked-white");
                }, 90);
            }
        });
    } else if (type === "operator") {
        for (let value in operatorObj) {
            if (key === value) {
                key = operatorObj[value];
            }
        }

        operatorBtns.forEach(btn => {
            if (key === btn.innerHTML) {
                btn.id = "clicked-red";
                setTimeout(() => {
                    btn.id = "";
                }, 90);

                clearSelected();
                btn.classList.add('selected');
            }
        });
    } else if (type === "equal") {
        equals.id = "clicked-red";
        setTimeout(() => {
            equals.id = "";
        }, 90);
        clearSelected();
    } else if (type === "clear") {
        clearBtn.id = "clicked-gray";
        setTimeout(() => {
            clearBtn.id = "";
        }, 90);
        clearSelected();
    } else if (type === "decimal") {
        decimalBtn.classList.add("clicked-white");
        setTimeout(() => {
            decimalBtn.classList.remove("clicked-white");
        }, 90);
    }
}

// Effects for button inputs

buttons.addEventListener("mousedown", (e) => {
    if (e.button == 0) {
        isClicked = true;
    }
});

buttons.addEventListener("mouseup", () => {
    isClicked = false;
});

inputBtns.forEach(btn => {
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

operators.forEach((button) => {
    button.addEventListener("click", () => {
        operators.forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

