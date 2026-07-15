const list = document.getElementById("practice-checklist");
const STORAGE_KEY = list.dataset.storageKey || "guia-claude-practice-progress";

const checkboxes = list.querySelectorAll("input[type='checkbox']");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function updateBar() {
  const total = checkboxes.length;
  const done = list.querySelectorAll("input:checked").length;
  progressFill.style.width = `${(done / total) * 100}%`;
  progressLabel.textContent = `${done} de ${total} concluídos`;
}

const progress = loadProgress();
checkboxes.forEach((checkbox) => {
  const step = checkbox.dataset.step;
  checkbox.checked = Boolean(progress[step]);

  checkbox.addEventListener("change", () => {
    progress[step] = checkbox.checked;
    saveProgress(progress);
    updateBar();
  });
});

updateBar();
