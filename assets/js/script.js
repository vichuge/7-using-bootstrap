(() => {
  const today = new Date();

  // Header date and footer year
  const dateEl = document.getElementById('current-date');
  if (dateEl) {
    dateEl.textContent = today.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(today.getFullYear());
  }

  // Newsletter forms (no backend: validate and show a confirmation)
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.querySelectorAll('.js-newsletter-form').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const feedback = form.querySelector('.form-feedback');

    const setFeedback = (message, ok) => {
      feedback.textContent = message;
      feedback.classList.toggle('is-success', ok);
      feedback.classList.toggle('is-error', !ok);
      input.classList.toggle('is-invalid', !ok);
      input.setAttribute('aria-invalid', String(!ok));
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = input.value.trim();

      if (!EMAIL_PATTERN.test(email)) {
        setFeedback('Please enter a valid email address.', false);
        input.focus();
        return;
      }

      setFeedback(`Thanks! We'll send the newsletter to ${email}.`, true);
      form.reset();
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        feedback.textContent = '';
      }
    });
  });

  // Close the mobile menu after picking a section
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && window.bootstrap) {
    mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        window.bootstrap.Offcanvas.getOrCreateInstance(mobileMenu).hide();
      });
    });
  }

  // Back-to-top button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.hidden = window.scrollY < 600;
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0 });
      document.getElementById('main-content').focus({ preventScroll: true });
    });
  }
})();
