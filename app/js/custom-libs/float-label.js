document.addEventListener("DOMContentLoaded", () => {
  floatWork();
});

function floatWork() {
  const inputs = document.querySelectorAll("[data-float-input]");

  if (inputs) {
    inputs.forEach((element) => {
      element.addEventListener("focus", (e) => toggleClass(e.target, "add"));
      element.addEventListener("blur", (e) => floatInputLabel(e.target));
      floatInputLabel(element);
    });
  }
}

function floatInputLabel(input) {
  if (input.value === "") {
    toggleClass(input, "remove");
  } else {
    toggleClass(input, "add");
  }
}

function toggleClass(input, eventName) {
  input.classList[eventName]("float__input--float");
}