
// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// CURSOR
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .gallery-item, .benefit-card, .ingredient-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorRing.classList.remove('hover');
  });
});

// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
});

// REVEAL ON SCROLL
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// COUNTER ANIMATION
function animateCounter(el, target) {
  let start = 0;
  const duration = 2000;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.target);
      animateCounter(e.target, target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter-val').forEach(el => counterObserver.observe(el));

// TESTIMONIALS SLIDER
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.slider-dot');
const slider = document.getElementById('slider');

function goToSlide(idx) {
  currentSlide = idx;
  slider.style.transform = `translateX(-${idx * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

document.getElementById('prevBtn').addEventListener('click', () => {
  goToSlide((currentSlide - 1 + slides.length) % slides.length);
});
document.getElementById('nextBtn').addEventListener('click', () => {
  goToSlide((currentSlide + 1) % slides.length);
});
dots.forEach(d => {
  d.addEventListener('click', () => goToSlide(parseInt(d.dataset.idx)));
});

// Auto-advance
setInterval(() => {
  goToSlide((currentSlide + 1) % slides.length);
}, 5000);
