// script.js

// Function to initialize the slider
function initializeSlider() {
    // Get slider element
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    // Function to show slide
    function showSlide(index) {
        slides.forEach((slide, idx) => {
            slide.style.display = (idx === index) ? 'block' : 'none';
        });
    }

    // Function to go to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Set initial slide
    showSlide(currentIndex);

    // Set interval for automatic sliding
    setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

// Initialize slider on document ready
document.addEventListener('DOMContentLoaded', initializeSlider);