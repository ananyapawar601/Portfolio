// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // JavaScript (optional for success/error messages)
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
        throw new Error('Form submission failed');
      }
    } catch (error) {
      showMessage('Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.innerHTML = originalBtnText;
    }
  });
  
  function showMessage(text, type) {
    const existingMsg = document.querySelector('.form-submission');
    if (existingMsg) existingMsg.remove();
    
    const msg = document.createElement('div');
    msg.className = `form-submission ${type}`;
    msg.textContent = text;
    document.querySelector('.contact-card').appendChild(msg);
    
    setTimeout(() => msg.remove(), 5000);
  }