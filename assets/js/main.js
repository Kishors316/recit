/*
 * Recit website — small progressive enhancements. Every page works without this file.
 *
 * To change the support email or the Google Play link, edit SITE below: the home page and both
 * legal pages read them from here.
 */
const SITE = {
  // Public support address, e.g. "support@example.com". While empty, pages point people to the
  // developer contact email on Recit's Google Play page instead.
  email: "",
  playUrl: "https://play.google.com/store/apps/details?id=recit.videoeditor.screenrecorder",
};

(function () {
  "use strict";
  const root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  // ---- Support email ---------------------------------------------------------------------------
  // <a data-email> elements become mailto links; [data-email-text] shows the bare address.
  if (SITE.email) {
    document.querySelectorAll("[data-email]").forEach((el) => {
      const subject = el.getAttribute("data-subject");
      const link = document.createElement("a");
      link.href = "mailto:" + SITE.email + (subject ? "?subject=" + encodeURIComponent(subject) : "");
      link.textContent = el.hasAttribute("data-email-label") ? el.getAttribute("data-email-label") : SITE.email;
      link.className = el.className;
      if (el.querySelector("svg")) link.prepend(el.querySelector("svg"));
      el.replaceWith(link);
    });
  }
  document.querySelectorAll("[data-play]").forEach((el) => { el.href = SITE.playUrl; });

  // ---- Header: border once scrolled, mobile menu ----------------------------------------------
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  const toTop = document.querySelector(".to-top");
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (toTop) toTop.classList.toggle("is-visible", y > 900);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    if (!header || !toggle) return;
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };
  if (toggle && header && nav) {
    toggle.addEventListener("click", () => {
      const open = !header.classList.contains("is-open");
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
    window.matchMedia("(min-width: 900px)").addEventListener("change", closeMenu);
  }
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

  // ---- Fade-in on scroll ------------------------------------------------------------------------
  const revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealed.forEach((el) => io.observe(el));
  } else {
    revealed.forEach((el) => el.classList.add("is-visible"));
  }

  // ---- Screenshot gallery: previous / next ------------------------------------------------------
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const track = gallery.querySelector(".shots");
    const prev = gallery.querySelector("[data-prev]");
    const next = gallery.querySelector("[data-next]");
    if (!track || !prev || !next) return;
    const step = () => {
      const item = track.querySelector("li");
      return item ? item.getBoundingClientRect().width + 18 : 260;
    };
    const update = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    prev.addEventListener("click", () => track.scrollBy({ left: -step() * 2, behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: step() * 2, behavior: "smooth" }));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  // ---- Legal pages: highlight the section being read in the contents list ----------------------
  const tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    const byId = new Map();
    tocLinks.forEach((a) => byId.set(a.getAttribute("href").slice(1), a));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        tocLinks.forEach((a) => a.classList.remove("is-active"));
        const link = byId.get(entry.target.id);
        if (link) link.classList.add("is-active");
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  // ---- Year in the footer ----------------------------------------------------------------------
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
