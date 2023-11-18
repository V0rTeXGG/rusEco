document.addEventListener("DOMContentLoaded", function () {
  const passwordBtns = document.querySelectorAll("[data-pass-toggle-icon]");
  passwordBtns.forEach((passwordBtn) => {
    passwordBtn.addEventListener("click", () => togglePassword(passwordBtn));
  });
});

function togglePassword(button) {
  const inputParent = button.closest("[data-pass-toggle]");
  const input = inputParent.querySelector("[data-pass-toggle-input]");
  button.classList.toggle("password-toggle-icon--hide");
  if (button.classList.contains("password-toggle-icon--hide")) {
    input.type = "text";
  } else {
    input.type = "password";
  }
}