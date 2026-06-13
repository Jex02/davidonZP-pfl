// ─── HAMBURGER MENU ───
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.topnav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // close menu when a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  // close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    }
  });
}

// ─── SCROLLSPY ───
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.spy-dot');
const homeNavLink = document.querySelector('.topnav-links a[href="index.html"]');
const contactNavLink = document.querySelector('.topnav-links a[href="#contact"], .topnav-links a[href="index.html#contact"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href') === `#${id}`) {
          dot.classList.add('active');
        }
      });

      // toggle topnav Home <-> Contact highlight on index.html
      if (homeNavLink && contactNavLink) {
        if (id === 'contact') {
          homeNavLink.classList.remove('active');
          contactNavLink.classList.add('active');
        } else {
          contactNavLink.classList.remove('active');
          homeNavLink.classList.add('active');
        }
      }
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(section => observer.observe(section));

// ─── HIGHLIGHT ACTIVE NAV LINK ───
const topLinks = document.querySelectorAll('.topnav-links a');
topLinks.forEach(link => {
  if (link.getAttribute('href') === window.location.pathname.split('/').pop() ||
      (link.getAttribute('href') === 'index.html' && window.location.pathname.endsWith('index.html'))) {
    link.classList.add('active');
  }
});

// ─── PROJECT MODALS ───
const projectCards = document.querySelectorAll('.proj-card');
const modalBackdrops = document.querySelectorAll('.modal-backdrop');

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal');
    openModal(modalId);
  });
});

modalBackdrops.forEach(modal => {
  // close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
  // close on X button click
  const closeBtn = modal.querySelector('[data-close]');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }
});

// close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.active').forEach(modal => closeModal(modal));
  }
});