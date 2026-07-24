/* ==========================================================================
   I9vation - Main JavaScript
   ========================================================================== */

(function() {
  'use strict';

  /* ---- Helpers ---- */
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const on = (el, event, handler, options) => el.addEventListener(event, handler, options);
  const off = (el, event, handler) => el.removeEventListener(event, handler);

  /* ---- Mobile Navigation ---- */
  function initMobileNav() {
    const toggle = $('.nav__toggle');
    const menu = $('.nav__menu');
    const links = $$('.nav__link');

    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function openMenu() {
      menu.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function toggleMenu() {
      menu.classList.contains('active') ? closeMenu() : openMenu();
    }

    on(toggle, 'click', toggleMenu);

    links.forEach(link => {
      on(link, 'click', () => {
        if (window.innerWidth <= 768) closeMenu();
      });
    });

    // Close on escape
    on(document, 'keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('active')) closeMenu();
    });

    // Close on click outside
    on(document, 'click', e => {
      if (menu.classList.contains('active') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on resize > 768
    let resizeTimer;
    on(window, 'resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) closeMenu();
      }, 100);
    });
  }

  /* ---- Header Scroll Effect ---- */
  function initHeaderScroll() {
    const header = $('.header');
    if (!header) return;

    let lastScroll = 0;
    const threshold = 50;

    function onScroll() {
      const currentScroll = window.scrollY;
      
      if (currentScroll > threshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }

    on(window, 'scroll', onScroll, { passive: true });
    onScroll(); // Initial check
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  function initSmoothScroll() {
    on(document, 'click', e => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = $(href);
      if (!target) return;

      e.preventDefault();
      
      const header = $('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  /* ---- Counter Animation (Hero Stats) ---- */
  function initCounters() {
    const counters = $$('.hero__stat-number[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(el) {
      const target = parseInt(el.dataset.count, 10);
      const duration = 2000;
      const start = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.floor(target * eased);
        el.textContent = current.toLocaleString('pt-BR');
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString('pt-BR');
        }
      }

      requestAnimationFrame(update);
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
  }

  /* ---- Scroll Reveal Animations ---- */
  function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      $$('.animate-in').forEach(el => el.style.opacity = '1');
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    $$('.service-card, .diferencial, .hero__card').forEach((el, index) => {
      el.classList.add('animate-in');
      el.style.animationDelay = `${index * 100}ms`;
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  /* ---- Form Handling (Contato) ---- */
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const msgEl = $('#form-message');

    on(form, 'submit', async e => {
      e.preventDefault();

      if (submitBtn.disabled) return;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.name || !data.email || !data.message) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }

      if (!isValidEmail(data.email)) {
        showMessage('E-mail inválido.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';

      try {
        // Simulate API call - replace with real endpoint
        await simulateSubmit(data);
        showMessage('Mensagem enviada com sucesso! Retornaremos em breve.', 'success');
        form.reset();
      } catch (err) {
        showMessage('Erro ao enviar. Tente novamente ou chame no WhatsApp.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar Mensagem';
      }
    });

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showMessage(text, type) {
      if (!msgEl) return;
      msgEl.textContent = text;
      msgEl.className = `form-message form-message--${type}`;
      msgEl.hidden = false;
    }
  }

  function simulateSubmit(data) {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }

  /* ---- WhatsApp Click Tracking ---- */
  function initWhatsAppTracking() {
    on(document, 'click', e => {
      const link = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
      if (link) {
        // Could send analytics event here
        console.log('WhatsApp click tracked');
      }
    });
  }

  /* ---- Parallax Hero Orbs (subtle) ---- */
  function initParallax() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const orbs = $$('.hero__orb');
    if (!orbs.length) return;

    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed = 0.1 + (i * 0.05);
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
      ticking = false;
    }

    on(window, 'scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---- Service Card Hover Enhancement ---- */
  function initServiceCards() {
    const cards = $$('.service-card');
    cards.forEach(card => {
      on(card, 'mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
      });
      on(card, 'mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---- Lazy Load Images ---- */
  function initLazyLoad() {
    if (!('IntersectionObserver' in window)) return;

    const images = $$('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    images.forEach(img => observer.observe(img));
  }

  /* ---- Active Nav Link on Scroll ---- */
  function initActiveNav() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav__link[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
  }

  /* ---- Initialize All ---- */
  function init() {
    // Core
    initMobileNav();
    initHeaderScroll();
    initSmoothScroll();

    // Enhancements
    initCounters();
    initScrollReveal();
    initContactForm();
    initWhatsAppTracking();
    initParallax();
    initServiceCards();
    initLazyLoad();
    initActiveNav();

    // Signal ready
    document.documentElement.classList.add('js-ready');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/* ==========================================================================
   Spinner CSS (injected via JS for forms)
   ========================================================================== */
const spinnerStyles = `
  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .form-message {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    margin-top: 16px;
  }
  .form-message--success {
    background: #ECFDF5;
    color: #059669;
    border: 1px solid #A7F3D0;
  }
  .form-message--error {
    background: #FEF2F2;
    color: #DC2626;
    border: 1px solid #FECACA;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = spinnerStyles;
document.head.appendChild(styleSheet);