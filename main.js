/* ============================================================
   AIMargam — vanilla JS, no dependencies
   ============================================================ */

(function () {
  "use strict";

  /* -----------------------------------------------------------
     1. Scroll-reveal (IntersectionObserver)
     ----------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* -----------------------------------------------------------
     2. Animated counters
     ----------------------------------------------------------- */
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCount(e.target);
          counterObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    // Snap to 0 synchronously before the first paint of the animation —
    // otherwise the element shows its static target value, then jumps
    // backward to 0 on the first rAF tick.
    el.textContent = "0" + suffix;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const val = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* -----------------------------------------------------------
     3. Nav scroll shadow + scroll-spy
     ----------------------------------------------------------- */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll-spy: highlight nav link for the section currently in view
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  const sectionMap = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const sec = document.getElementById(id);
    if (sec) sectionMap.set(sec, link);
  });
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const link = sectionMap.get(e.target);
        if (!link) return;
        if (e.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  sectionMap.forEach((_, sec) => spyObserver.observe(sec));

  /* -----------------------------------------------------------
     4. Mobile menu
     ----------------------------------------------------------- */
  const mobileToggle = document.querySelector(".nav-mobile-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileClose = document.querySelector(".mobile-close");
  const openMobile = () => { mobileMenu.classList.add("open"); document.body.style.overflow = "hidden"; };
  const closeMobile = () => { mobileMenu.classList.remove("open"); document.body.style.overflow = ""; };
  mobileToggle && mobileToggle.addEventListener("click", openMobile);
  mobileClose && mobileClose.addEventListener("click", closeMobile);
  document.querySelectorAll(".mobile-menu a").forEach((a) => a.addEventListener("click", closeMobile));

  /* -----------------------------------------------------------
     5. Service catalog — filter + search + accordion
     ----------------------------------------------------------- */
  const services = Array.from(document.querySelectorAll(".service"));
  const catChips = Array.from(document.querySelectorAll("[data-filter='cat']"));
  const durChips = Array.from(document.querySelectorAll("[data-filter='dur']"));
  const searchInput = document.querySelector("#service-search");
  const resultsCount = document.querySelector("#results-count");
  const clearBtn = document.querySelector("#clear-filters");
  const emptyState = document.querySelector(".empty-state");
  const listEl = document.querySelector(".service-list");

  const activeCats = new Set();
  const activeDurs = new Set();
  let searchQuery = "";

  function durMatches(durId, durText) {
    switch (durId) {
      case "days":  return /day/i.test(durText);
      case "weeks": return /week/i.test(durText);
      case "short": return /month/i.test(durText) && /1\s*[\u2013-]\s*[23]\s*Month/i.test(durText);
      case "long":  return /month/i.test(durText) && !/1\s*[\u2013-]\s*[23]\s*Month/i.test(durText);
      default:      return true;
    }
  }

  function applyFilters() {
    let visible = 0;
    services.forEach((s) => {
      const cat = s.dataset.cat;
      const dur = s.dataset.dur;
      const blob = (s.dataset.search || "").toLowerCase();
      let show = true;
      if (activeCats.size && !activeCats.has(cat)) show = false;
      if (show && activeDurs.size) {
        const any = Array.from(activeDurs).some((d) => durMatches(d, dur));
        if (!any) show = false;
      }
      if (show && searchQuery) {
        if (!blob.includes(searchQuery)) show = false;
      }
      s.style.display = show ? "" : "none";
      if (show) visible++;
    });
    resultsCount.textContent = `${visible} of ${services.length} services`;
    const hasFilter = activeCats.size > 0 || activeDurs.size > 0 || searchQuery !== "";
    clearBtn.style.display = hasFilter ? "" : "none";
    listEl.style.display = visible === 0 ? "none" : "";
    emptyState.style.display = visible === 0 ? "" : "none";
  }

  function toggleChip(chip, set, value) {
    if (set.has(value)) { set.delete(value); chip.classList.remove("active"); }
    else { set.add(value); chip.classList.add("active"); }
    applyFilters();
  }

  catChips.forEach((c) => c.addEventListener("click", () => toggleChip(c, activeCats, c.dataset.value)));
  durChips.forEach((c) => c.addEventListener("click", () => toggleChip(c, activeDurs, c.dataset.value)));

  if (searchInput) {
    let t;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(t);
      t = setTimeout(() => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilters();
      }, 120);
    });
  }

  clearBtn && clearBtn.addEventListener("click", () => {
    activeCats.clear();
    activeDurs.clear();
    searchQuery = "";
    searchInput.value = "";
    catChips.forEach((c) => c.classList.remove("active"));
    durChips.forEach((c) => c.classList.remove("active"));
    applyFilters();
  });

  // Accordion — only one open at a time. Measure scrollHeight on open so
  // long detail bodies never clip and the transition stays snappy on short ones.
  function setBodyHeight(s) {
    const body = s.querySelector(".service-body");
    if (s.classList.contains("open")) {
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      body.style.maxHeight = "0px";
    }
  }
  services.forEach((s) => {
    const head = s.querySelector(".service-head");
    head.addEventListener("click", () => {
      const wasOpen = s.classList.contains("open");
      services.forEach((other) => { other.classList.remove("open"); setBodyHeight(other); });
      if (!wasOpen) { s.classList.add("open"); setBodyHeight(s); }
    });
    head.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); head.click(); }
    });
    head.setAttribute("tabindex", "0");
    head.setAttribute("role", "button");
  });
  // Re-measure open row when viewport changes (column layout flips on mobile).
  window.addEventListener("resize", () => {
    const open = services.find((s) => s.classList.contains("open"));
    if (open) setBodyHeight(open);
  });

  applyFilters(); // initial count

  /* -----------------------------------------------------------
     6. Booking modal
     ----------------------------------------------------------- */
  const modal = document.querySelector(".modal-back");
  const modalForm = document.querySelector(".modal .modal-form");
  const modalSuccess = document.querySelector(".modal .success");
  const modalIntro = document.querySelector(".modal .modal-intro");
  const interestSelect = modalForm.querySelector("[name='interest']");
  const successName = modalSuccess.querySelector(".success-name");
  const successInterest = modalSuccess.querySelector(".success-interest");
  const nameInput = modalForm.querySelector("[name='name']");

  function openModal(prefillName) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    modalForm.style.display = "";
    modalSuccess.style.display = "none";
    modalIntro.style.display = "";
    if (prefillName) {
      const opt = Array.from(interestSelect.options).find((o) => o.value === prefillName);
      interestSelect.value = opt ? prefillName : "";
    } else {
      interestSelect.value = "";
    }
    setTimeout(() => nameInput && nameInput.focus(), 120);
  }
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-book]").forEach((b) => {
    b.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // If invoked from the mobile menu, close it first
      if (mobileMenu && mobileMenu.classList.contains("open")) closeMobile();
      openModal(b.dataset.book === "true" ? null : b.dataset.book);
    });
  });
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  document.querySelectorAll(".modal-cancel").forEach((b) => b.addEventListener("click", closeModal));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(modalForm);
    const name = (data.get("name") || "").trim();
    const interest = (data.get("interest") || "").trim();
    successName.textContent = name ? `, ${name}` : "";
    successInterest.textContent = interest ? ` in ${interest}` : "";
    modalForm.style.display = "none";
    modalIntro.style.display = "none";
    modalSuccess.style.display = "";
    modalForm.reset();
  });

  /* -----------------------------------------------------------
     7. Copy-to-clipboard for contact rows
     ----------------------------------------------------------- */
  const toast = document.querySelector(".toast");
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 1800);
  }
  document.querySelectorAll("[data-copy]").forEach((el) => {
    el.style.cursor = "pointer";
    el.title = "Click to copy";
    el.addEventListener("click", () => {
      const txt = el.dataset.copy;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(txt).then(() => showToast(`Copied: ${txt}`));
      } else {
        const ta = document.createElement("textarea");
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); showToast(`Copied: ${txt}`); }
        catch (_) {}
        document.body.removeChild(ta);
      }
    });
  });
})();
