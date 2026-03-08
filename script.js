// ─────────────────────────────────────────
// SCROLL REVEAL ANIMATION
// ─────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));


// ─────────────────────────────────────────
// COUNTER ANIMATION
// ─────────────────────────────────────────
const counters = document.querySelectorAll('[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    el.textContent = Math.round(ease * target).toLocaleString();

    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}


// ─────────────────────────────────────────
// URGENCY BUTTON SELECTION
// ─────────────────────────────────────────
let activeUrgency = 'critical';

function setUrgency(level, btn) {
  document.querySelectorAll('.urgency-btn').forEach(b => {
    b.className = 'urgency-btn';
  });

  btn.className = `urgency-btn active-${level}`;
  activeUrgency = level;
}


// ─────────────────────────────────────────
// TOAST NOTIFICATION
// ─────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');

  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}


// ─────────────────────────────────────────
// DONOR REGISTRATION FORM
// ─────────────────────────────────────────
function submitDonorForm() {

  const name = document.getElementById('d-name').value.trim();
  const email = document.getElementById('d-email').value.trim();
  const blood = document.getElementById('d-blood').value;
  const age = document.getElementById('d-age').value;
  const weight = document.getElementById('d-weight').value;

  if (!name || !email || !blood || !age || !weight) {
    showToast('❌ Please fill in all required fields');
    return;
  }

  if (+age < 18 || +age > 65) {
    showToast('❌ Age must be between 18–65');
    return;
  }

  if (+weight < 50) {
    showToast('❌ Minimum weight is 50 kg');
    return;
  }

  const surgery = document.getElementById('h-surgery').checked;

  const eligible =
    !surgery &&
    +age >= 18 &&
    +age <= 65 &&
    +weight >= 50;

  showToast(`✅ ${name} registered as ${blood} donor! Status: ${eligible ? 'Eligible' : 'Ineligible'}`);

  // Reset form
  [
    'd-name',
    'd-email',
    'd-phone',
    'd-location',
    'd-age',
    'd-weight',
    'd-lastdon'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  document.getElementById('d-blood').value = '';

  [
    'h-diabetes',
    'h-hyper',
    'h-surgery',
    'h-meds'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = false;
  });
}


// ─────────────────────────────────────────
// BLOOD REQUEST FORM
// ─────────────────────────────────────────
function submitRequest() {

  const patient = document.getElementById('r-patient').value.trim();
  const blood = document.getElementById('r-blood').value;
  const hospital = document.getElementById('r-hospital').value.trim();
  const units = document.getElementById('r-units').value;

  if (!patient || !blood || !hospital || !units) {
    showToast('❌ Please fill in all fields');
    return;
  }

  const mockMatches = Math.floor(Math.random() * 5) + 1;

  showToast(`🩸 Request for ${patient} (${blood}) submitted! Found ${mockMatches} matching donors.`);

  [
    'r-patient',
    'r-contact',
    'r-hospital',
    'r-units'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  document.getElementById('r-blood').value = '';
}


// ─────────────────────────────────────────
// NAVBAR SHADOW ON SCROLL
// ─────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');

  if (nav) {
    nav.style.boxShadow =
      window.scrollY > 20
        ? '0 4px 24px rgba(0,0,0,0.08)'
        : 'none';
  }
});


// ─────────────────────────────────────────
// MOBILE NAVBAR (HAMBURGER MENU)
// ─────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll("#navLinks a");

// Toggle menu
if (hamburger) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();

    navLinks.classList.toggle("active");

    // accessibility improvement
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !expanded);
  });
}

// Close menu when clicking nav links
navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navLinks.classList.remove("active");
  }
});

// Close menu when scrolling
window.addEventListener("scroll", () => {
  if (navLinks) {
    navLinks.classList.remove("active");
  }
});