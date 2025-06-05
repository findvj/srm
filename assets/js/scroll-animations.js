


// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll, .service-card, .testimonial-card, .venture-card, .round-bar-card, .product-card, .section-subtitle, .section-title, .section-text');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // If you want to animate only once, uncomment the next line
          // observer.unobserve(entry.target);
        } else {
          // If you want the animation to repeat when scrolling back up, uncomment the next line
          // entry.target.classList.remove('animate');
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Start animation slightly before element comes into view
    });
  
    elements.forEach(element => {
      observer.observe(element);
    });
  };
  
  // Smooth scroll for anchor links
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };
  
  // Initialize animations when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    smoothScroll();
  });
  
  // Re-run animations when window is resized (for responsive design)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      animateOnScroll();
    }, 250);
  }); 