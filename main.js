// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Smooth scroll helper
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 70; // navbar height
  const rect = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: rect, behavior: "smooth" });
}

// Attach smooth scroll to internal links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      scrollToSection(targetId);
      if (navLinks) navLinks.classList.remove("show");
    }
  });
});

// Current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Animate on scroll (fade up) =====
(function setupScrollAnimations() {
  const animatedEls = document.querySelectorAll(".anim-fade-up");
  if (!animatedEls.length) return;

  // Kalau browser lama & nggak support IO → langsung munculin
  if (!("IntersectionObserver" in window)) {
    animatedEls.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Masuk viewport → kasih kelas, animasi jalan
          entry.target.classList.add("in-view");
        } else {
          // Keluar viewport → hapus kelas, biar nanti bisa anim lagi
          entry.target.classList.remove("in-view");
        }
      });
    },
    {
      threshold: 0.2,              // sekitar 20% elemen kelihatan baru animasi
      rootMargin: "0px 0px -10% 0px"
    }
  );

  animatedEls.forEach((el) => observer.observe(el));
})();
