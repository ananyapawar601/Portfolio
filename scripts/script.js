document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll
  document.querySelectorAll('nav a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && document.querySelector(targetId)) {
        window.scrollTo(0, document.querySelector(targetId).offsetTop - 100);
      }
    });
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('show');
  });
});
