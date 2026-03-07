
  // ─── SCROLL REVEAL ───
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => obs.observe(el));

  // ─── COUNTER ANIMATION ───
  const counters = document.querySelectorAll('[data-target]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  function animateCounter(el) {
    const target = +el.dataset.target;
    const dur = 1800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ─── URGENCY SELECT ───
  let activeUrgency = 'critical';
  function setUrgency(level, btn) {
    document.querySelectorAll('.urgency-btn').forEach(b => {
      b.className = 'urgency-btn';
    });
    btn.className = `urgency-btn active-${level}`;
    activeUrgency = level;
  }

  // ─── TOAST ───
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  // ─── DONOR FORM ───
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
    const eligible = !surgery && +age >= 18 && +age <= 65 && +weight >= 50;

    showToast(`✅ ${name} registered as ${blood} donor! Status: ${eligible ? 'Eligible' : 'Ineligible'}`);

    // Reset
    ['d-name','d-email','d-phone','d-location','d-age','d-weight','d-lastdon'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('d-blood').value = '';
    ['h-diabetes','h-hyper','h-surgery','h-meds'].forEach(id => {
      document.getElementById(id).checked = false;
    });
  }

  // ─── BLOOD REQUEST FORM ───
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

    ['r-patient','r-contact','r-hospital','r-units'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('r-blood').value = '';
  }

  // ─── NAVBAR SHADOW ON SCROLL ───
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 24px rgba(0,0,0,0.08)'
      : 'none';
  });

  const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});