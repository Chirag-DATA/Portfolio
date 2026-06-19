// ==========================
// EMAILJS INIT
// ==========================

emailjs.init("sNBeWxQkbe4exX4RR");

// ==========================
// THEME TOGGLE
// ==========================

const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let isDark = true;

themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'ri-sun-line' : 'ri-moon-line';
});

// ==========================
// MOBILE NAV
// ==========================

const menuBtn = document.getElementById('menuBtn');
const menuClose = document.getElementById('menuClose');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => mobileNav.classList.add('open'));
menuClose.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileLinks.forEach(l =>
  l.addEventListener('click', () => mobileNav.classList.remove('open'))
);

// ==========================
// SCROLL TOP
// ==========================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ==========================
// REVEAL ON SCROLL
// ==========================

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ==========================
// TYPED ROLES
// ==========================

const roles = [
  'AI & ML Engineer',
  'Data Analyst',
  'Cloud Enthusiast',
  'Power BI Developer',
  'Python Developer'
];

let roleIdx = 0;
let charIdx = 0;
let deleting = false;

const typedEl = document.getElementById('typed-role');

function typeLoop() {
  const current = roles[roleIdx];

  typedEl.textContent = deleting
    ? current.substring(0, charIdx--)
    : current.substring(0, charIdx++);

  if (!deleting && charIdx > current.length) {
    deleting = true;
    setTimeout(typeLoop, 1400);
    return;
  }

  if (deleting && charIdx < 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    charIdx = 0;
  }

  setTimeout(typeLoop, deleting ? 45 : 80);
}

typeLoop();

// ==========================
// HERO PARTICLE CANVAS
// ==========================

const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  initParticles();
}

function initParticles() {
  particles = [];

  const count = Math.floor(
    (canvas.width * canvas.height) / 14000
  );

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const isDarkNow =
    html.getAttribute('data-theme') === 'dark';

  const color = isDarkNow
    ? '0,212,255'
    : '0,100,200';

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color},${p.alpha})`;
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {

      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(
          particles[i].x,
          particles[i].y
        );
        ctx.lineTo(
          particles[j].x,
          particles[j].y
        );

        ctx.strokeStyle =
          `rgba(${color},${0.12 * (1 - dist / 100)})`;

        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
drawParticles();

// ==========================
// CONTRIBUTION GRAPH
// ==========================

const grid = document.getElementById('contribGrid');

if (grid) {

  const weights = [0, 0, 0, 1, 1, 2, 2, 3, 4];

  for (let i = 0; i < 26 * 7; i++) {

    const cell = document.createElement('div');

    cell.className =
      'contrib-cell c' +
      weights[Math.floor(Math.random() * weights.length)];

    grid.appendChild(cell);
  }
}

// ==========================
// CONTACT FORM EMAILJS
// ==========================

async function handleSubmit(event) {

  event.preventDefault();

  const form = document.getElementById("contactForm");

  const submitBtn =
    form.querySelector('button[type="submit"]');

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const templateParams = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  try {

    await emailjs.send(
      "service_hr9a92c",
      "template_ic6xevk",
      templateParams
    );

    form.reset();

    form.style.display = "none";

    document.getElementById("formSuccess")
      .style.display = "block";

  } catch (error) {

    console.error("EmailJS Error:", error);

    alert(
      "Failed to send message. Please try again."
    );

  } finally {

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
}

// ==========================
// NAV ACTIVE STATE
// ==========================

const sections =
  document.querySelectorAll('section[id]');

const navLinks =
  document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {

  let current = '';

  sections.forEach(section => {
    if (
      window.scrollY >=
      section.offsetTop - 120
    ) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.style.color =
      link.getAttribute('href') === '#' + current
        ? 'var(--accent-cyan)'
        : '';
  });
});

// ==========================
// HERO INITIAL REVEAL
// ==========================

setTimeout(() => {

  document
    .querySelectorAll('.hero .reveal')
    .forEach((el, i) => {

      setTimeout(() => {
        el.classList.add('visible');
      }, i * 150);

    });

}, 100);