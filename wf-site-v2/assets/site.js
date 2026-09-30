// Whole Founder V2 site: mobile nav, Calendly popup, receipt lightbox, internal review panel.
(function () {
  var CAL = 'https://calendly.com/wholefounder/25-min-whole-founder-meeting?hide_gdpr_banner=1';

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
