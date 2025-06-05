'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < navToggler.length; i++) {
  navToggler[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  });
}



/**
 * header
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// Testimonials Slider
const testimonialWrapper = document.querySelector('.testimonial-wrapper');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cards = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;
const cardsPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
const totalCards = cards.length;
const maxIndex = totalCards - cardsPerView;

// Touch event variables
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let startTranslate = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function updateSlider(transition = true) {
  const cardWidth = cards[0].offsetWidth + 30; // Including gap
  if (transition) {
    testimonialWrapper.style.transition = 'transform 0.3s ease-out';
  } else {
    testimonialWrapper.style.transition = 'none';
  }
  testimonialWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  
  // Update button states
  prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
  nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
}

// Touch event handlers
function touchStart(event) {
  touchStartX = event.touches[0].clientX;
  isDragging = true;
  startTranslate = currentIndex * (cards[0].offsetWidth + 30);
  testimonialWrapper.style.transition = 'none';
}

function touchMove(event) {
  if (!isDragging) return;
  
  touchEndX = event.touches[0].clientX;
  const diff = touchStartX - touchEndX;
  currentTranslate = startTranslate + diff;
  
  // Add resistance at the edges
  if (currentIndex === 0 && diff < 0) {
    currentTranslate = diff * 0.3;
  } else if (currentIndex === maxIndex && diff > 0) {
    currentTranslate = startTranslate + (diff * 0.3);
  }
  
  testimonialWrapper.style.transform = `translateX(-${currentTranslate}px)`;
}

function touchEnd() {
  isDragging = false;
  const diff = touchStartX - touchEndX;
  const cardWidth = cards[0].offsetWidth + 30;
  
  // Determine if swipe was significant enough to change slide
  if (Math.abs(diff) > cardWidth * 0.3) {
    if (diff > 0 && currentIndex < maxIndex) {
      currentIndex++;
    } else if (diff < 0 && currentIndex > 0) {
      currentIndex--;
    }
  }
  
  updateSlider();
}

// Add touch event listeners
testimonialWrapper.addEventListener('touchstart', touchStart, { passive: true });
testimonialWrapper.addEventListener('touchmove', touchMove, { passive: true });
testimonialWrapper.addEventListener('touchend', touchEnd);

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateSlider();
  }
});

// Update on window resize
window.addEventListener('resize', () => {
  const newCardsPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
  if (newCardsPerView !== cardsPerView) {
    currentIndex = 0;
    updateSlider();
  }
});

// Initialize slider
updateSlider();