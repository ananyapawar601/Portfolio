// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling with full error handling
  const navLinks = document.querySelectorAll('nav a');
  if (navLinks) {
    navLinks.forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        try {
          const href = this.getAttribute('href');
          if (!href) return;
          
          const targetElement = document.querySelector(href);
          if (targetElement) {
            // Use simple scroll for better compatibility
            window.scrollTo({
              top: targetElement.offsetTop - 70, // Offset for navbar
              behavior: 'smooth'
            });
          }
        } catch (error) {
          console.error('Scroll error:', error);
        }
      });
    });
  }

  // Handle form with more robust error protection
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      if (!submitBtn) return;
      
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      const formData = new FormData(this);
      
      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(function(response) {
        if (response.ok) {
          contactForm.reset();
          showMessage('Message sent successfully!', 'success');
        } else {
          showMessage('Form submission failed. Please try again.', 'error');
        }
      })
      .catch(function(error) {
        console.error('Form error:', error);
        showMessage('Failed to send message. Please try again.', 'error');
      })
      .finally(function() {
        submitBtn.innerHTML = originalBtnText;
      });
    });
  }
});

function showMessage(text, type) {
  try {
    const contactCard = document.querySelector('.contact-card');
    if (!contactCard) return;
    
    const existingMsg = document.querySelector('.form-submission');
    if (existingMsg) existingMsg.remove();
    
    const msg = document.createElement('div');
    msg.className = `form-submission ${type}`;
    msg.textContent = text;
    contactCard.appendChild(msg);
    
    setTimeout(function() {
      if (msg && msg.parentNode) {
        msg.remove();
      }
    }, 5000);
  } catch (error) {
    console.error('Message display error:', error);
  }
}