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
let percentBtn = document.querySelector(".percent");
let negationBtn = document.querySelector(".plus-minus");

let operatorArr = [];
let operatorList = ["+", "-", "/", "*"];

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
    console.log(solution);
    num1 = solution;
    num2 = "";
    console.log(`Num1: ${num1}`);
    console.log(`Num2: ${num2}`);
}

function round() {
    if (typeof (solution) !== "undefined") {
        solution = +solution.toFixed(3);
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



numBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let value = e.target.innerHTML;
        manageNums(value);
    });
});


clearBtn.addEventListener("click", () => {
    handleClear();
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

       if (!num1Flag && num2Flag) {
            let n = operatorArr.length;
            solution  = operate(operatorArr[n - 2], +num1, +num2);
            if (!Number.isInteger(solution)) round();
            populateDisplay(solution);
            continueCalc();
       }
    });
});


equals.addEventListener("click", () => {
    handleEquals();
});


percentBtn.addEventListener("click", () => {
    console.log(`Num1Flag: ${num1Flag}`);
    console.log(`Num2Flag: ${num2Flag}`);
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

// Keyboard Support
    
document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (Number.isInteger(+key)) {
        manageNums(key);
    } else if (operatorList.includes(key)) {
        handleOperators(key);
    } else if (key === "Enter") {
        console.log("enter");
        handleEquals();
    } else if (key === "c" || key === "Escape") {
        handleClear();
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



