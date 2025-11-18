// Small script for interactivity: mobile nav, year updates, and booking validation

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? '' : 'flex';
      nav.style.flexDirection = 'row';
    });
  }

  // Fill copyright years (multiple pages use different IDs)
  for (let i = 1; i <= 6; i++) {
    const el = document.getElementById('year' + (i === 1 ? '' : i));
    if (el) el.textContent = new Date().getFullYear();
  }

  // Improve select keyboard layout on small screens
  const selects = document.querySelectorAll('select');
  selects.forEach(s => s.setAttribute('aria-label', s.name || 'select'));
});

// Booking form handler
function handleBooking(event) {
  event.preventDefault();
  const form = document.getElementById('bookingForm');
  const msg = document.getElementById('formMessage');

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const tour = form.tour.value;

  if (!name) {
    msg.textContent = 'Please enter your full name.';
    form.name.focus();
    return false;
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    msg.textContent = 'Please provide a valid email address.';
    form.email.focus();
    return false;
  }

  if (!tour) {
    msg.textContent = 'Please choose a tour.';
    form.tour.focus();
    return false;
  }

  // Simulated submit: show success message and reset
  msg.style.color = 'green';
  msg.textContent = 'Thank you! Your booking request has been received. We will contact you shortly.';
  form.reset();

  // In production, replace this with a real submission (Formspree, Netlify Forms, or your server)
  return false;
}