const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");
const themeSelector = document.getElementById("themeSelector");

let currentValue = "";
let previousValue = "";
let operation = null;
let lastAnswer = "";

function addNumber(number) {
  if (currentValue === "Erro") {
    currentValue = "";
  }

  if (number === "." && currentValue.includes(".")) {
    return;
  }

  if (currentValue.length >= 16) {
    return;
  }

  if (number === "." && currentValue === "") {
    currentValue = "0.";
  } else {
    currentValue += number;
  }

  updateDisplay();
}

function chooseOperation(op) {
  if (currentValue === "" || currentValue === "Erro") {
    return;
  }

  if (previousValue !== "" && operation !== null) {
    calculate();
  }

  operation = op;
  previousValue = currentValue;
  currentValue = "";
  updateDisplay();
}

function calculate() {
  let result;

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(current)) {
    return;
  }

  switch (operation) {
    case "+":
      result = prev + current;
      break;

    case "-":
      result = prev - current;
      break;

    case "*":
      result = prev * current;
      break;

    case "/":
      if (current === 0) {
        showError();
        return;
      }
      result = prev / current;
      break;

    case "^":
      result = Math.pow(prev, current);
      break;

    default:
      return;
  }

  currentValue = formatResult(result);
  lastAnswer = currentValue;
  previousValue = "";
  operation = null;
  updateDisplay();
}

function percent() {
  if (currentValue === "" || currentValue === "Erro") {
    return;
  }

  const current = parseFloat(currentValue);

  if (previousValue !== "" && operation !== null) {
    const prev = parseFloat(previousValue);

    if (operation === "+" || operation === "-") {
      currentValue = ((prev * current) / 100).toString();
    } else {
      currentValue = (current / 100).toString();
    }
  } else {
    currentValue = (current / 100).toString();
  }

  updateDisplay();
}

function toggleScientific() {
  const scientificButtons = document.getElementById("scientificButtons");
  const button = document.querySelector(".science-toggle");

  scientificButtons.classList.toggle("active");
  button.classList.toggle("active");
}

function scientificOperation(type) {
  if (currentValue === "" || currentValue === "Erro") {
    return;
  }

  const value = parseFloat(currentValue);
  let result;
  let label = "";

  switch (type) {
    case "sin":
      result = Math.sin(value * Math.PI / 180);
      label = `sin(${value})`;
      break;

    case "cos":
      result = Math.cos(value * Math.PI / 180);
      label = `cos(${value})`;
      break;

    case "tan":
      result = Math.tan(value * Math.PI / 180);
      label = `tan(${value})`;
      break;

    case "asin":
      if (value < -1 || value > 1) {
        showError();
        return;
      }
      result = Math.asin(value) * 180 / Math.PI;
      label = `sin⁻¹(${value})`;
      break;

    case "acos":
      if (value < -1 || value > 1) {
        showError();
        return;
      }
      result = Math.acos(value) * 180 / Math.PI;
      label = `cos⁻¹(${value})`;
      break;

    case "atan":
      result = Math.atan(value) * 180 / Math.PI;
      label = `tan⁻¹(${value})`;
      break;

    case "sqrt":
      if (value < 0) {
        showError();
        return;
      }
      result = Math.sqrt(value);
      label = `√(${value})`;
      break;

    case "cbrt":
      result = Math.cbrt(value);
      label = `∛(${value})`;
      break;

    case "pow2":
      result = Math.pow(value, 2);
      label = `${value}²`;
      break;

    case "pow3":
      result = Math.pow(value, 3);
      label = `${value}³`;
      break;

    case "inv":
      if (value === 0) {
        showError();
        return;
      }
      result = 1 / value;
      label = `1/${value}`;
      break;

    case "log":
      if (value <= 0) {
        showError();
        return;
      }
      result = Math.log10(value);
      label = `log(${value})`;
      break;

    case "ln":
      if (value <= 0) {
        showError();
        return;
      }
      result = Math.log(value);
      label = `ln(${value})`;
      break;

    case "factorial":
      if (value < 0 || !Number.isInteger(value) || value > 170) {
        showError();
        return;
      }
      result = factorial(value);
      label = `${value}!`;
      break;

    case "negate":
      result = value * -1;
      label = `neg(${value})`;
      break;

    case "exp":
      result = Math.exp(value);
      label = `e^${value}`;
      break;

    default:
      return;
  }

  currentValue = formatResult(result);
  lastAnswer = currentValue;
  previousValue = label;
  operation = null;
  updateDisplay();
}

function factorial(num) {
  if (num < 0 || !Number.isInteger(num)) {
    return NaN;
  }

  let result = 1;

  for (let i = 2; i <= num; i++) {
    result *= i;
  }

  return result;
}

function addPi() {
  currentValue = Math.PI.toString();
  updateDisplay();
}

function addE() {
  currentValue = Math.E.toString();
  updateDisplay();
}

function useAns() {
  if (lastAnswer !== "") {
    currentValue = lastAnswer;
    updateDisplay();
  }
}

function clearDisplay() {
  currentValue = "";
  previousValue = "";
  operation = null;
  updateDisplay();
}

function deleteNumber() {
  if (currentValue === "Erro") {
    currentValue = "";
  } else {
    currentValue = currentValue.toString().slice(0, -1);
  }

  updateDisplay();
}

function showError() {
  currentValue = "Erro";
  previousValue = "";
  operation = null;
  updateDisplay();
}

function updateDisplay() {
  currentDisplay.innerText = currentValue || "0";

  if (operation !== null) {
    previousDisplay.innerText = `${previousValue} ${formatOperation(operation)}`;
  } else {
    previousDisplay.innerText = previousValue;
  }
}

function formatOperation(op) {
  switch (op) {
    case "+":
      return "+";
    case "-":
      return "−";
    case "*":
      return "×";
    case "/":
      return "÷";
    case "^":
      return "^";
    default:
      return "";
  }
}

function formatResult(result) {
  if (!isFinite(result) || isNaN(result)) {
    return "Erro";
  }

  return parseFloat(result.toFixed(10)).toString();
}

themeSelector.addEventListener("change", () => {
  document.body.className = themeSelector.value;
});