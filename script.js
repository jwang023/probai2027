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

// Poster submission form: shows the Google Form given in data-form="..." inside the page
document.querySelectorAll(".form-embed[data-form]").forEach((box) => {
  const link = box.dataset.form.trim();
  if (!/^https:\/\/docs\.google\.com\/forms\//.test(link)) return;   // no link yet: keep the "coming soon" note
  const url = new URL(link);
  url.searchParams.set("embedded", "true");
  const frame = document.createElement("iframe");
  frame.src = url.toString();
  frame.title = box.dataset.title || "Form";
  frame.loading = "lazy";
  const open = document.createElement("a");
  open.className = "form-open";
  open.href = link;
  open.target = "_blank";
  open.rel = "noopener";
  open.textContent = (box.dataset.open || "Open the form in a new tab") + " \u2197";
  box.replaceChildren(frame, open);
});
