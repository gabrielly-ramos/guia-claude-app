(function () {
  const STORAGE_KEY = "guia-claude-plan";
  const LOCKED_PAGES = ["cowork.html", "code.html"];
  const LIMITED_PAGES = ["conectores.html"];

  function pageOf(href) {
    return (href || "").split("/").pop();
  }

  function applyPlan(plan) {
    document.body.classList.toggle("plan-free", plan === "free");

    document.querySelectorAll(".site-nav-links a, .footer-nav a").forEach((a) => {
      const page = pageOf(a.getAttribute("href"));
      const existingBadge = a.querySelector(".nav-badge");
      if (existingBadge) existingBadge.remove();
      a.classList.remove("nav-locked");

      if (plan !== "free") return;

      if (LOCKED_PAGES.includes(page)) {
        a.classList.add("nav-locked");
        a.title = "Precisa de plano pago — veja a página Planos";
        const badge = document.createElement("span");
        badge.className = "nav-badge locked";
        badge.textContent = "pago";
        a.appendChild(badge);
      } else if (LIMITED_PAGES.includes(page)) {
        a.title = "Disponível de forma limitada na conta free";
        const badge = document.createElement("span");
        badge.className = "nav-badge limited";
        badge.textContent = "limitado";
        a.appendChild(badge);
      }
    });
  }

  function handleNavClick(e) {
    const a = e.target.closest(".site-nav-links a.nav-locked, .footer-nav a.nav-locked");
    if (!a) return;
    e.preventDefault();
    if (!location.pathname.endsWith("planos.html")) {
      window.location.href = "planos.html";
    }
  }

  function setActiveButton(plan) {
    document.querySelectorAll(".plan-switch-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.plan === plan);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem(STORAGE_KEY) || "pago";

    document.querySelectorAll(".plan-switch-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const plan = btn.dataset.plan;
        localStorage.setItem(STORAGE_KEY, plan);
        setActiveButton(plan);
        applyPlan(plan);
      });
    });

    setActiveButton(saved);
    applyPlan(saved);
    document.addEventListener("click", handleNavClick);
  });
})();
