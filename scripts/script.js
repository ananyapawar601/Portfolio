// Replace your current script.js with this
document.addEventListener('DOMContentLoaded', function() {
  // Super simple navigation
  document.querySelectorAll('nav a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && document.querySelector(targetId)) {
        window.scrollTo(0, document.querySelector(targetId).offsetTop - 100);
      }
    });
  });
});