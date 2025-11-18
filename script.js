// menu toggle for mobile
const menuToggle = document.getElementById('menu-toggle');
const navContainer = document.querySelector('.navbar-menu-container');
const socialContainer = document.querySelector('.social-media-container');

menuToggle && menuToggle.addEventListener('click', () => {
  navContainer.classList.toggle('active');
  socialContainer.classList.toggle('active');
});

// scroll to top button
const scrollBtn = document.getElementById('scrollToTop');

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});

// small greeting animation (rotating short phrases)
const greeting = document.getElementById('greetingText');
const phrases = [
  'Stay secure. Learn more.',
  'Code. Explore. Secure.',
  'Building useful tools.',
  'Curious. Practical. Secure.'
];
let pIndex = 0;
setInterval(() => {
  if (!greeting) return;
  pIndex = (pIndex + 1) % phrases.length;
  greeting.style.opacity = 0;
  setTimeout(() => {
    greeting.textContent = phrases[pIndex];
    greeting.style.opacity = 1;
  }, 300);
}, 3000);

// Ensure hero content (developer-intro) sits below the fixed navbar by
// setting a CSS variable with the real header height. Updates on load and resize.
function updateHeaderHeightVar() {
  const header = document.getElementById('header');
  if (!header) return;
  const rect = header.getBoundingClientRect();
  // Set CSS variable on :root so it's available everywhere
  document.documentElement.style.setProperty('--header-height', Math.ceil(rect.height) + 'px');
}

window.addEventListener('DOMContentLoaded', updateHeaderHeightVar);
window.addEventListener('load', updateHeaderHeightVar);
window.addEventListener('resize', updateHeaderHeightVar);

// Also run shortly after load in case fonts/images affect layout
setTimeout(updateHeaderHeightVar, 500);
