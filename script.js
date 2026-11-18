// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
function setMenu(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
}
toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Countdown to the start date in the hero (data-start="...")
const cd = document.querySelector(".countdown");
if (cd) {
  const target = new Date(cd.dataset.start).getTime();
  const out = {
    d: cd.querySelector("[data-d]"),
    h: cd.querySelector("[data-h]"),
    m: cd.querySelector("[data-m]"),
    s: cd.querySelector("[data-s]"),
  };
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const diff = target - Date.now();
    if (isNaN(diff) || diff <= 0) {
      cd.innerHTML = '<p class="live">' + (cd.dataset.live || "The conference has started. Welcome!") + '</p>';
      clearInterval(timer);
      return;
    }
    const sec = Math.floor(diff / 1000);
    out.d.textContent = Math.floor(sec / 86400);
    out.h.textContent = pad(Math.floor((sec % 86400) / 3600));
    out.m.textContent = pad(Math.floor((sec % 3600) / 60));
    out.s.textContent = pad(sec % 60);
  };
  const timer = setInterval(tick, 1000);
  tick();
}
