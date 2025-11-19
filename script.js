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
  if (!scrollBtn) return;
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

// header height fix
function updateHeaderHeightVar() {
  const header = document.getElementById('header');
  if (!header) return;
  const rect = header.getBoundingClientRect();
  document.documentElement.style.setProperty('--header-height', Math.ceil(rect.height) + 'px');
}

window.addEventListener('DOMContentLoaded', updateHeaderHeightVar);
window.addEventListener('load', updateHeaderHeightVar);
window.addEventListener('resize', updateHeaderHeightVar);
setTimeout(updateHeaderHeightVar, 500);

// contact form handling (opens Gmail directly)
const contactForm = document.querySelector('form[name="contactus"]');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (document.getElementById('name') || {}).value || '';
    const email = (document.getElementById('email') || {}).value || '';
    const message = (document.getElementById('message') || {}).value || '';
    const formMessage = document.getElementById('formMessage');

    // validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      if (formMessage) {
        formMessage.style.display = 'block';
        formMessage.style.color = '#ffcccb';
        formMessage.textContent = 'Please fill all fields before sending.';
      } else {
        alert('Please fill all fields before sending.');
      }
      return;
    }

    // Gmail compose URL
    const subject = encodeURIComponent('Website contact from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + '\n' + email);

    const gmailURL =
      "https://mail.google.com/mail/?view=cm&fs=1&to=ayankrkundu25@gmail.com"
      + "&su=" + subject
      + "&body=" + body;

    // open Gmail
    window.open(gmailURL, "_blank");

    if (formMessage) {
      formMessage.style.display = 'block';
      formMessage.style.color = '#64f4ac';
      formMessage.textContent = 'Gmail is opening in a new tab.';
    }

    // clear fields
    setTimeout(() => {
      if (document.getElementById('name')) document.getElementById('name').value = '';
      if (document.getElementById('email')) document.getElementById('email').value = '';
      if (document.getElementById('message')) document.getElementById('message').value = '';
    }, 800);
  });
}
