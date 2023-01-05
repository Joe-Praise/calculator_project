
let num = '0';
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value)
    } else {
        handleNumber(value)
    }
    screenDisplay();
}

function handleMath(value) {
    if (num === "0") {
        value = 0;
        // num = 0;
    }

    const intNum = parseInt(num);
    if (runningTotal === 0) {
        runningTotal = intNum;
    } else {
        flushOperation(intNum);
    }

    previousOperator = value;
    num = "0";
}

function flushOperation(intNum) {
  if (previousOperator === "+") {
    runningTotal += intNum;
  } else if (previousOperator === "-") {
    runningTotal -= intNum;
  } else if (previousOperator === "÷") {
    runningTotal /= intNum;
  } else if (previousOperator === "x") {
    runningTotal *= intNum;
  }
}

function handleSymbol(symbol) {
    switch (symbol) {
      case "C":
        num = "0";
        break;
      case "←":
            if (num.length === 1) {
                num = "0";
            } else {
                num = num.substring(0, num.length - 1);
            }
        break;
      case "=":
            if (previousOperator === null) {
                // need number to do maths
                return;
            }
            flushOperation(parseInt(num));
            previousOperator = null
            num = "" + runningTotal;
            runningTotal = 0;
        break;
      case "÷":
      case "x":
      case "-":
      case "+":
        handleMath(symbol)
        break;
    }
}

function handleNumber(number) {
    if (num === "0") {
        num = number;
    } else {
        num += number;
    }
}

function screenDisplay() {
    screen.innerText = num;
}

function init(){
    document
        .querySelector(".calc_buttons")
        .addEventListener("click", function (event) {
            buttonClick(event.target.innerText);
        });
}
init();