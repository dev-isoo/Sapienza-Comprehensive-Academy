 /* ============================================================
   SAPIENZA ACADEMY — shared.js
   Handles: Theme Toggle, Cursor, Navbar scroll, Particles
   Works on ALL pages (index, contact, about, etc.)
============================================================ */

(function () {

  // ── THEME TOGGLE ───────────────────────────────────────────
  function initTheme() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const body = document.body;

    if (!themeToggle || !themeIcon) return;

    // Apply saved theme
    const savedTheme = localStorage.getItem("sapienza-theme");

    if (savedTheme === "light") {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      themeIcon.className = "fa-solid fa-moon";
    } else {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
      themeIcon.className = "fa-solid fa-sun";
    }

    // Toggle on click
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-mode");
      body.classList.toggle("light-mode", !isDark);
      themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      localStorage.setItem("sapienza-theme", isDark ? "dark" : "light");
    });
  }

  // ── NAVBAR SCROLL ──────────────────────────────────────────
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  // ── CURSOR ─────────────────────────────────────────────────
  function initCursor() {
    const cursor = document.getElementById("cursor");
    const cursorFollower = document.getElementById("cursorFollower");
    if (!cursor || !cursorFollower) return;

    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    });

    (function animateCursor() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      cursorFollower.style.left = fx + "px";
      cursorFollower.style.top = fy + "px";
      requestAnimationFrame(animateCursor);
    })();

    document.querySelectorAll("a, button, .sub-card, .gallery-item, .testi-card").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursorFollower.style.transform = "translate(-50%,-50%) scale(1.6)";
        cursorFollower.style.borderColor = "var(--primary)";
      });
      el.addEventListener("mouseleave", () => {
        cursorFollower.style.transform = "translate(-50%,-50%) scale(1)";
        cursorFollower.style.borderColor = "rgba(70,75,232,0.5)";
      });
    });
  }

  // ── PARTICLES ──────────────────────────────────────────────
  function initParticles() {
    const canvas = document.getElementById("particlesBg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      color: ["rgba(70,75,232,", "rgba(139,92,246,", "rgba(6,182,212,"][Math.floor(Math.random() * 3)],
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.015;
        const a = p.alpha + Math.sin(p.pulse) * 0.12;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + a + ")";
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(70,75,232,${0.06 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });
  }

  // ── HAMBURGER ──────────────────────────────────────────────
  function initHamburger() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
    });

    document.querySelectorAll(".mob-link").forEach(l => {
      l.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // ── INIT ALL ───────────────────────────────────────────────
  // Run immediately if DOM is ready, otherwise wait for it
  function init() {
    initTheme();
    initNavbar();
    initCursor();
    initParticles();
    initHamburger();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // DOM already loaded (inline scripts already ran) — run now
    init();
  }

})();