document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll
  document.querySelectorAll('nav a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && document.querySelector(targetId)) {
        window.scrollTo(0, document.querySelector(targetId).offsetTop - 100);
      }

      // Auto close nav menu if it's open (on mobile)
      const navLinks = document.getElementById('nav-links');
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    });
  });

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('show');
  });
});
