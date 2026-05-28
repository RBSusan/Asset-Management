/* ============================================================
   APEX ASSET MANAGEMENT — script.js
   Modules: Nav · SmoothScroll · Counters · Carousel · Animations · Form
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initSmoothScroll();
  initCounters();
  initCarousel();
  initAnimations();
  initForm();

  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ============================================================
   1. NAVIGATION
   Sticky background change · hamburger menu · backdrop
   ============================================================ */
function initNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!navbar || !toggle || !menu) return;

  // Inject backdrop element
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.appendChild(backdrop);

  // Solid background on scroll
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  function openMenu() {
    menu.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    backdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    backdrop.classList.remove('visible');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on backdrop click
  backdrop.addEventListener('click', closeMenu);

  // Close on any nav link click
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
}

/* ============================================================
   2. SMOOTH SCROLL
   Offsets for sticky navbar height
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id     = this.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      const navH = document.getElementById('navbar')?.offsetHeight || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   3. ANIMATED COUNTERS
   Each .counter animates from 0 → data-target on first view.
   data-prefix / data-suffix are prepended / appended.
   Numbers ≥ 1000 are formatted with toLocaleString().
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      animateCounter(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
}

function animateCounter(el) {
  var target   = parseInt(el.dataset.target, 10);
  var prefix   = el.dataset.prefix  || '';
  var suffix   = el.dataset.suffix  || '';
  var duration = 2000;
  var start    = performance.now();

  function tick(now) {
    var elapsed  = now - start;
    var progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    var eased    = 1 - Math.pow(1 - progress, 3);
    var value    = Math.round(eased * target);
    var display  = target >= 1000 ? value.toLocaleString() : String(value);

    el.textContent = prefix + display + suffix;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* ============================================================
   4. TESTIMONIALS CAROUSEL
   Auto-advances every 5 s · manual prev/next · dot indicators
   Pauses on hover.
   ============================================================ */
function initCarousel() {
  var cards   = Array.from(document.querySelectorAll('.testimonial-card'));
  var dots    = Array.from(document.querySelectorAll('.dot'));
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  if (!cards.length) return;

  var current  = 0;
  var timer    = setInterval(advance, 5000);

  // Initialise first slide
  cards[0].classList.add('active');

  function show(index) {
    // Deactivate current
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    // Advance index with wraparound
    current = ((index % cards.length) + cards.length) % cards.length;

    // Activate next
    cards[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function advance() { show(current + 1); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(advance, 5000);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () { show(current - 1); resetTimer(); });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () { show(current + 1); resetTimer(); });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { show(i); resetTimer(); });
  });

  // Pause auto-advance while user hovers
  var wrapper = document.querySelector('.carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', function () { clearInterval(timer); });
    wrapper.addEventListener('mouseleave', function () { timer = setInterval(advance, 5000); });
    // Also pause on focus within (keyboard users)
    wrapper.addEventListener('focusin',  function () { clearInterval(timer); });
    wrapper.addEventListener('focusout', function () { timer = setInterval(advance, 5000); });
  }
}

/* ============================================================
   5. SCROLL ANIMATIONS
   IntersectionObserver adds .visible to .fade-in elements.
   ============================================================ */
function initAnimations() {
  var elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold:  0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(function (el) { observer.observe(el); });
}

/* ============================================================
   6. ENQUIRY FORM
   Client-side validation + async fetch submit via FormSubmit.co
   ============================================================ */
function initForm() {
  var form      = document.getElementById('enquiry-form');
  var submitBtn = document.getElementById('submit-btn');
  var msgOk     = document.getElementById('form-success');
  var msgErr    = document.getElementById('form-error');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    // Show spinner, disable button
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    if (msgOk)  msgOk.hidden  = true;
    if (msgErr) msgErr.hidden = true;

    fetch(form.action, {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    new FormData(form)
    })
    .then(function (res) {
      if (res.ok) {
        form.reset();
        if (msgOk) {
          msgOk.hidden = false;
          msgOk.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        throw new Error('HTTP ' + res.status);
      }
    })
    .catch(function () {
      if (msgErr) {
        msgErr.hidden = false;
        msgErr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    })
    .finally(function () {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    });
  });

  // Clear error state on field change
  form.querySelectorAll('input, select, textarea').forEach(function (field) {
    ['input', 'change'].forEach(function (evt) {
      field.addEventListener(evt, function () { clearError(field); });
    });
  });
}

/* Validate all required fields; return true if clean */
function validateForm() {
  var ok = true;

  var name  = document.getElementById('full-name');
  var email = document.getElementById('email');
  var phone = document.getElementById('phone');
  var range = document.getElementById('investment-range');

  // Full name
  if (!name || !name.value.trim()) {
    showError(name, 'err-full-name', 'Please enter your full name.');
    ok = false;
  } else {
    clearError(name);
  }

  // Email
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email || !email.value.trim()) {
    showError(email, 'err-email', 'Please enter your email address.');
    ok = false;
  } else if (!emailRe.test(email.value.trim())) {
    showError(email, 'err-email', 'Please enter a valid email address.');
    ok = false;
  } else {
    clearError(email);
  }

  // Phone (optional — validate format only if a value is present)
  if (phone && phone.value.trim()) {
    var phoneRe = /^[+\d][\d\s\-().]{6,19}$/;
    if (!phoneRe.test(phone.value.trim())) {
      showError(phone, 'err-phone', 'Please enter a valid phone number.');
      ok = false;
    } else {
      clearError(phone);
    }
  } else if (phone) {
    clearError(phone);
  }

  // Investment range
  if (!range || !range.value) {
    showError(range, 'err-investment-range', 'Please select an investment range.');
    ok = false;
  } else {
    clearError(range);
  }

  // Focus first invalid field for accessibility
  if (!ok) {
    var first = document.querySelector('.has-error');
    if (first) first.focus();
  }

  return ok;
}

function showError(field, errorId, message) {
  if (!field) return;
  field.classList.add('has-error');
  field.setAttribute('aria-invalid', 'true');
  field.setAttribute('aria-describedby', errorId);
  var errEl = document.getElementById(errorId);
  if (errEl) errEl.textContent = message;
}

function clearError(field) {
  if (!field) return;
  field.classList.remove('has-error');
  field.removeAttribute('aria-invalid');
  var errorId = 'err-' + field.id;
  var errEl   = document.getElementById(errorId);
  if (errEl) errEl.textContent = '';
}
