const modeSwitch = document.getElementById("mode-switch");

modeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("modo-tecnico", modeSwitch.checked);
});
