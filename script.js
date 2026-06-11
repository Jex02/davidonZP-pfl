// ─── SCROLLSPY ───
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.spy-dot');

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