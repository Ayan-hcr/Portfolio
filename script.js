/**
 * ============================================================================
 * MOBILE MENU TOGGLE FUNCTION
 * ============================================================================
 * Purpose: Show/hide navigation menu and social media links on mobile devices
 * How it works:
 *   1. Gets the hamburger menu button element with ID 'menu-toggle'
 *   2. Gets the navbar menu container with class '.navbar-menu-container'
 *   3. Gets the social media container with class '.social-media-container'
 *   4. When user clicks menu button, toggles 'active' class to show/hide menu
 * ============================================================================
 */
const menuToggle = document.getElementById('menu-toggle');
const navContainer = document.querySelector('.navbar-menu-container');
const socialContainer = document.querySelector('.social-media-container');

menuToggle && menuToggle.addEventListener('click', () => {
  navContainer.classList.toggle('active');
  socialContainer.classList.toggle('active');
});

/**
 * ============================================================================
 * SCROLL TO TOP BUTTON FUNCTION
 * ============================================================================
 * Purpose: Allow users to quickly scroll back to the top of the page
 * How it works:
 *   1. Gets the scroll-to-top button element with ID 'scrollToTop'
 *   2. When button is clicked, smoothly scrolls page to top (position 0)
 *   3. Button only appears when user scrolls down more than 300px
 *   4. Listens to scroll events and adds/removes 'visible' class
 * ============================================================================
 */
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

/**
 * ============================================================================
 * GREETING TEXT ANIMATION FUNCTION
 * ============================================================================
 * Purpose: Rotate through different greeting phrases with fade effect
 * How it works:
 *   1. Gets the greeting text element with ID 'greetingText'
 *   2. Creates array of 4 phrases to rotate through
 *   3. Every 3 seconds (3000ms), changes to next phrase
 *   4. Fades out text (opacity 0), changes text, then fades in (opacity 1)
 *   5. Cycles through phrases in order: phrase 0 → 1 → 2 → 3 → back to 0
 * ============================================================================
 */
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

/**
 * ============================================================================
 * UPDATE HEADER HEIGHT VARIABLE FUNCTION
 * ============================================================================
 * Purpose: Calculate navbar height and update CSS variable for content spacing
 * How it works:
 *   1. Gets the header (navbar) element with ID 'header'
 *   2. Measures the actual height of the navbar element
 *   3. Stores this height in CSS variable '--header-height'
 *   4. This ensures content sits properly below the fixed navbar
 *   5. Updates on: page load, window resize, and every 500ms
 * ============================================================================
 */
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

/**
 * ============================================================================
 * CONTACT FORM HANDLER FUNCTION
 * ============================================================================
 * Purpose: Validate contact form and open Gmail composer with pre-filled info
 * How it works:
 *   1. Gets the contact form (form with name="contactus")
 *   2. When user submits form:
 *      - Prevents default form submission (e.preventDefault)
 *      - Gets user's name, email, and message from form fields
 *      - Validates that all fields are filled
 *      - If empty fields: shows error message "Please fill all fields..."
 *      - If valid: creates Gmail compose URL with pre-filled subject & body
 *      - Opens Gmail in a new tab with the user's information
 *      - Shows success message "Gmail is opening in a new tab"
 *      - Clears all form fields after 800ms
 * ============================================================================
 */
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
