// Whole Founder V2 site: mobile nav, Calendly popup, receipt lightbox, internal review panel, smooth scroll + reveals.
(function () {
  var CAL = 'https://calendly.com/wholefounder/25-min-whole-founder-meeting?hide_gdpr_banner=1';

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // smooth scroll (Lenis, same setup as ssi-storage-method). Touch keeps native scroll; overlays and the review panel scroll on their own.
  var lenis = null;
  if (!reduce && typeof window.Lenis === "function") {
    lenis = new window.Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      prevent: function (n) { return n.closest && n.closest(".rv, .lb, .calendly-overlay"); }
    });
    (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(performance.now());
  }
  function goTo(target) {
    var off = -((document.querySelector(".topbar") || {}).offsetHeight || 0) - 12;
    if (lenis) lenis.scrollTo(target, { offset: off, duration: 1.2 });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset + off, behavior: reduce ? "auto" : "smooth" });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a || a.hasAttribute("data-cal")) return;
    var url = new URL(a.href, location.href);
    if (!url.hash || url.pathname !== location.pathname) return;
    var target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    goTo(target);
    if (history.replaceState) history.replaceState(null, "", url.hash);
  });

  // reveal on scroll: one observer, each element animates once; staggered within its row
  var sel = ".sec-head, .dcard, .wcard, .scard, .svc-feature, .dtile, .rstat, .receipt, .rcard, .tcard, .ecard, .fitcard, .step, .fhero, .svc-cols, .compare, .gteam-head, .bhead, .faq-wrap, .cal-card";
  if (!reduce && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.closest(".hero")) return;
      var i = 0, s = el;
      while ((s = s.previousElementSibling)) if (s.matches(sel)) i++;
      el.style.setProperty("--d", Math.min(i, 4) * 0.07 + "s");
      el.classList.add("rv-in");
      io.observe(el);
    });
  }

  // mobile nav
  var bar = document.querySelector('.topbar');
  var btn = document.querySelector('.menu-btn');
  if (bar && btn) {
    btn.addEventListener('click', function () {
      var open = bar.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Calendly popup on every [data-cal] trigger; falls back to the contact page if the widget has not loaded
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-cal]');
    if (!t) return;
    if (window.Calendly && Calendly.initPopupWidget) {
      e.preventDefault();
      if (bar) bar.classList.remove('nav-open');
      Calendly.initPopupWidget({ url: CAL });
    }
  });

  // receipt lightbox
  var lb = document.getElementById('lb');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('.receipt').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = b.querySelector('img');
        lbImg.src = i.currentSrc || i.src;
        lbImg.alt = i.alt;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function () { lb.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  // internal review panel
  var rvBtn = document.querySelector('.rv-btn');
  var rv = document.querySelector('.rv');
  if (rvBtn && rv) {
    rvBtn.addEventListener('click', function () {
      var open = rv.classList.toggle('open');
      rvBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
