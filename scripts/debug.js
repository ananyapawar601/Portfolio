document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Create a debug panel
    const debugPanel = document.createElement('div');
    debugPanel.style.position = 'fixed';
    debugPanel.style.bottom = '0';
    debugPanel.style.left = '0';
    debugPanel.style.right = '0';
    debugPanel.style.background = 'rgba(0,0,0,0.7)';
    debugPanel.style.color = 'white';
    debugPanel.style.padding = '10px';
    debugPanel.style.zIndex = '9999';
    debugPanel.style.fontSize = '12px';
    debugPanel.style.maxHeight = '30vh';
    debugPanel.style.overflow = 'auto';
    
    // Add system info
    debugPanel.innerHTML = `
      <p>Screen: ${window.innerWidth}x${window.innerHeight}</p>
      <p>User Agent: ${navigator.userAgent}</p>
      <p>Page loaded at: ${new Date().toLocaleTimeString()}</p>
      <div id="debug-log"></div>
    `;
    
    document.body.appendChild(debugPanel);
    
    // Log function
    window.debugLog = function(msg) {
      const logElement = document.getElementById('debug-log');
      if (logElement) {
        const entry = document.createElement('p');
        entry.textContent = `${new Date().toLocaleTimeString()}: ${msg}`;
        logElement.appendChild(entry);
      }
    };
    
    // Check resource loading
    window.addEventListener('load', function() {
      debugLog('All resources loaded');
      
      // Check for resource errors
      const failedResources = [];
      Array.from(document.images).forEach(img => {
        if (!img.complete || img.naturalWidth === 0) {
          failedResources.push(`Failed to load image: ${img.src}`);
        }
      });
      
      Array.from(document.styleSheets).forEach((sheet, index) => {
        try {
          const rules = sheet.cssRules;
        } catch (e) {
          failedResources.push(`Failed to load stylesheet ${index}`);
        }
      });
      
      if (failedResources.length > 0) {
        failedResources.forEach(item => debugLog(item));
      } else {
        debugLog('All resources appear to be loaded correctly');
      }
    });
    
    // Track errors
    window.addEventListener('error', function(e) {
      debugLog(`ERROR: ${e.message} at ${e.filename}:${e.lineno}`);
    });
    
    // Check navigation
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function() {
        debugLog(`Clicked link: ${this.getAttribute('href')}`);
      });
    });
  });