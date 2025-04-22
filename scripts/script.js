// Smooth scrolling with proper error handling
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Form handling with better error management
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      form.reset();
      showMessage('Message sent successfully!', 'success');
    } else {
      showMessage(`Form submission failed: ${response.status}`, 'error');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    showMessage('Failed to send message. Please try again.', 'error');
  } finally {
    submitBtn.innerHTML = originalBtnText;
  }
});