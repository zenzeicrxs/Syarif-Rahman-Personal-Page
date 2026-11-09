const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const themeToggle = document.querySelector(".theme-toggle");
document.querySelectorAll(".hero-line").forEach((line) => {
  line.addEventListener("pointerenter", () => line.classList.add("is-active"));
  line.addEventListener("pointerleave", () => line.classList.remove("is-active"));
});

if (localStorage.getItem("theme") === "dark") document.documentElement.dataset.theme = "dark";
if (themeToggle) themeToggle.setAttribute("aria-pressed", String(document.documentElement.dataset.theme === "dark"));
themeToggle?.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme === "dark";
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  localStorage.setItem("theme", dark ? "light" : "dark");
  themeToggle.setAttribute("aria-pressed", String(!dark));
});

const setHeaderState = () => header?.classList.toggle("scrolled", window.scrollY > 24);
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("is-open", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.style.overflow = "";
  });

  document.querySelectorAll('a[href$=".html"], a[href^="case-study.html"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = link.target;
      if (target === "_blank" || link.hasAttribute("download")) return;
      event.preventDefault();
      document.body.classList.add("page-leaving");
      window.setTimeout(() => { window.location.href = link.href; }, 260);
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
