
//********************** Intro Page JavaScript code */
function createStars() {
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw'; /* Random position */
    star.style.top = Math.random() * 100 + 'vh';
    star.style.width = (Math.random() * 3 + 2) + 'px'; /* Random size */
    star.style.height = star.style.width;
    star.style.animationDuration = (2 + Math.random() * 3) + 's'; /* Random speed */
    star.style.animationDelay = Math.random() * 5 + 's'; /* Random delay */
    document.getElementById('eid-intro').appendChild(star);
  }
}

// Intro screen ko initialize kare
function initIntro() {
  createStars(); /* Stars create karo */

  // 7 second baad intro hat jayega aur website show hoga
  setTimeout(() => {
    document.getElementById('eid-intro').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
  }, 7000);
}

// typing-text ka javascript //
const text = " Mehran Malik";
let index = 0;
const speed = 150;
const element = document.getElementById("typingText");

function typeEffect() {
  if (index < text.length) {
    element.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, speed);
  }
}

// Start typing after short delay
setTimeout(typeEffect, 500);

// Handle mobile viewport height issues
function adjustViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustViewportHeight);
adjustViewportHeight();

// Page load hone par intro start hoga
window.onload = initIntro;


// *********************after intro page************************// 
//************** Navbar ka javScript code */
document.querySelector('.nav-heading').addEventListener('touchstart', function () {
  this.classList.add('hover-effect');
});
document.querySelector('.nav-heading').addEventListener('touchend', function () {
  setTimeout(() => this.classList.remove('hover-effect'), 500);
});


// ****************** slider code ********************//
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.img-slider');
  const images = document.querySelectorAll('.img-slider img');
  const prevBtn = document.querySelector('.btn.prev');
  const nextBtn = document.querySelector('.btn.next');
  const dotsContainer = document.querySelector('.dots-container');

  let counter = 0;
  let slideInterval = null;
  const slideDuration = 3000; // 3 seconds

  // Create dots
  images.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  // Auto slide function
  function startSlider() {
    slideInterval = setInterval(() => {
      counter = (counter + 1) % images.length;
      updateSlider();
    }, slideDuration);
  }

  function updateSlider() {
    slider.style.transform = `translateX(${-counter * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === counter);
    });
  }

  function goToSlide(index) {
    counter = index;
    updateSlider();
    resetTimer();
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startSlider();
  }

  // Navigation
  nextBtn.addEventListener('click', () => {
    counter = (counter + 1) % images.length;
    updateSlider();
    resetTimer();
  });

  prevBtn.addEventListener('click', () => {
    counter = (counter - 1 + images.length) % images.length;
    updateSlider();
    resetTimer();
  });

  // Start the slider
  startSlider();

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', startSlider);
});

// 700px ke niche slider ka javaScript code hai..

// Inside your existing JS code
function startAutoSlide() {
  if (window.innerWidth <= 700) { // Only auto-slide on mobile
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    }, 3000); // 4 seconds
  }
}

// Update on resize
window.addEventListener('resize', function () {
  if (window.innerWidth <= 700 && !slideInterval) {
    startAutoSlide();
  } else if (window.innerWidth > 700) {
    clearInterval(slideInterval);
    slideInterval = null;
  };
});

//********** Select theme-slider code  */
const themeContainer = document.querySelector('.theme-container');
const themeCards = document.querySelectorAll('.theme-card');
const prevThemeBtn = document.querySelector('.prev-theme');
const nextThemeBtn = document.querySelector('.next-theme');
const selectThemeBtn = document.querySelector('.select-theme');
const cardCanvas = document.getElementById('card-canvas');
const ctx = cardCanvas.getContext('2d');

let currentThemeIndex = 1;

function updateThemeSlider() {
  themeCards.forEach((card, index) => {
    if (index === currentThemeIndex) {
      card.classList.remove('blur');
    } else {
      card.classList.add('blur');
    }
  });
}

prevThemeBtn.addEventListener('click', () => {
  if (currentThemeIndex > 0) {
    currentThemeIndex--;
    updateThemeSlider();
  }
});

nextThemeBtn.addEventListener('click', () => {
  if (currentThemeIndex < themeCards.length - 1) {
    currentThemeIndex++;
    updateThemeSlider();
  }
});

// Select Theme on Image Click
themeCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    currentThemeIndex = index;
    updateThemeSlider();
  });
});

// Select Theme on Button Click
selectThemeBtn.addEventListener('click', () => {
  const selectedTheme = themeCards[currentThemeIndex].querySelector('img').src;
  drawCard(selectedTheme);
});

//**************** 800px ke niche ka theme slected ka javascript code ************* */
document.addEventListener('DOMContentLoaded', function () {
  // Check if mobile view (below 800px)
  if (window.innerWidth > 800) return;

  // DOM Elements
  const container = document.querySelector('.theme-container');
  const cards = document.querySelectorAll('.theme-card');
  const prevBtn = document.querySelector('.prev-theme');
  const nextBtn = document.querySelector('.next-theme');
  let currentIndex = 1; // Default selected card (second one)

  // Hide all cards except current
  function updateSlider() {
    cards.forEach((card, index) => {
      if (index === currentIndex) {
        card.style.display = 'block';
        card.classList.remove('blur');
        // Smooth scroll to card
        card.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Next card function
  function showNext() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
  }

  // Previous card function
  function showPrev() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
  }

  // Initialize slider
  updateSlider();

  // Button event listeners
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Touch swipe support (optional)
  let touchStartX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchEndX < touchStartX - 50) showNext(); // Swipe left
    if (touchEndX > touchStartX + 50) showPrev(); // Swipe right
  }, { passive: true });
});


// ***********************User Input and Preview***************//
const userNameInput = document.getElementById('user-name');
const textColorSelect = document.getElementById('text-color');
const errorMessage = document.getElementById('error-message');
const maxLength = 20; // Maximum characters allowed

userNameInput.addEventListener('input', () => {
  if (userNameInput.value.length > maxLength) {
    errorMessage.classList.remove('hidden'); // Show error message
    userNameInput.value = userNameInput.value.slice(0, maxLength); // Trim extra characters
  } else {
    errorMessage.classList.add('hidden'); // Hide error message
  }
});

function drawCard(themeImageSrc) {
  const img = new Image();
  img.src = themeImageSrc;
  img.onload = () => {
    ctx.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
    ctx.drawImage(img, 0, 0, cardCanvas.width, cardCanvas.height);

    // Add user name to the card
    const userName = userNameInput.value || "Your Name";
    ctx.font = "26px Gidole";
    ctx.fillStyle = textColorSelect.value === "golden-black" ? "gold" : textColorSelect.value;
    ctx.textAlign = "center"; // Center align the text
    ctx.fillText(`From: ${userName}`, cardCanvas.width / 2, cardCanvas.height - 10);
  };
}

userNameInput.addEventListener('input', () => {
  const selectedTheme = themeCards[currentThemeIndex].querySelector('img').src;
  drawCard(selectedTheme);
});

textColorSelect.addEventListener('change', () => {
  const selectedTheme = themeCards[currentThemeIndex].querySelector('img').src;
  drawCard(selectedTheme);
});

// Generate Card Button
const generateButton = document.getElementById('generateButton');
const popupModal = document.getElementById('popupModal');
const modalImage = document.getElementById('eidImage');

generateButton.addEventListener('click', () => {
  // Get the selected theme image
  const selectedTheme = themeCards[currentThemeIndex].querySelector('img').src;

  // Draw the card and show the modal
  drawCard(selectedTheme, true); // Pass `true` to show the modal
});

// Draw Card Function
function drawCard(themeImageSrc, showModal = false) {
  const img = new Image();
  img.src = themeImageSrc;
  img.onload = () => {
    const canvas = document.getElementById('card-canvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the theme image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Add user name to the card
    const userName = userNameInput.value || "Your Name";
    ctx.font = "22px Gidole";
    ctx.fillStyle = textColorSelect.value === "golden-black" ? "gold" : textColorSelect.value;
    ctx.textAlign = "center";
    ctx.fillText(`From: ${userName}`, canvas.width / 2, canvas.height - 30);

    // Show the modal if `showModal` is true
    if (showModal) {
      const dataURL = canvas.toDataURL('image/png');
      modalImage.src = dataURL;
      popupModal.classList.remove('hidden');
      popupModal.classList.add('show');
    }
  };
}

// Close Popup Modal
function closePopup() {
  popupModal.classList.add('hidden');
  popupModal.classList.remove('show');
}

// Download Button Fix
const downloadButton = document.getElementById('downloadButton');

downloadButton.addEventListener('click', () => {
  const canvas = document.getElementById('card-canvas');

  // Ensure the image is completely drawn before downloading
  setTimeout(() => {
    const link = document.createElement('a');
    link.download = 'Eid-Card.png'; // File name
    link.href = canvas.toDataURL('image/png'); // Convert canvas to image URL
    link.click(); // Trigger download
  }, 500); // Wait to make sure the canvas is updated
});

// Share Button
const shareButton = document.getElementById('shareButton');

shareButton.addEventListener('click', () => {
  const canvas = document.getElementById('card-canvas');

  // Convert canvas to blob
  canvas.toBlob((blob) => {
    // Create a file from the blob
    const file = new File([blob], 'Eid-Card.png', { type: 'image/png' });

    // Check if the browser supports the share API
    if (navigator.share) {
      navigator.share({
        title: 'Eid Mubarak!',
        text: 'Check out this Eid card!',
        files: [file],
      })
        .then(() => console.log('Card shared successfully!'))
        .catch((error) => console.error('Error sharing card:', error));
    } else {
      alert('Sharing is not supported in your browser.');
    }
  });
});

