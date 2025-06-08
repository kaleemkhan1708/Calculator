const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let expression = "";

function updateDisplay(value) {
  display.textContent = value || "0";
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;

    switch (value) {
      case "AC":
        expression = "";
        break;
      case "DEL":
        expression = expression.slice(0, -1);
        break;
      case "=":
        try {
          expression = eval(expression).toString();
        } catch {
          expression = "Error";
        }
        break;
      default:
        if (expression === "Error") expression = "";
        expression += value;
    }

    updateDisplay(expression);
  });
});

document.addEventListener("keydown", (e) => {
  if (/[0-9+\-*/%.]/.test(e.key)) {
    expression += e.key;
  } else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
  } else if (e.key === "Enter") {
    try {
      expression = eval(expression).toString();
    } catch {
      expression = "Error";
    }
  } else if (e.key === "Escape") {
    expression = "";
  }
  updateDisplay(expression);
});
