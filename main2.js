// Intro Screen Animation
setTimeout(() => {
  document.getElementById('intro-screen').style.display = 'none';
  document.getElementById('main-page').classList.remove('hidden');
}, 100); // 4000 seconds

// Theme Slider
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

selectThemeBtn.addEventListener('click', () => {
  const selectedTheme = themeCards[currentThemeIndex].querySelector('img').src;
  drawCard(selectedTheme);
});

// User Input and Preview
// const userNameInput = document.getElementById('user-name');
const textColorSelect = document.getElementById('text-color');
// const generateButton = document.getElementById('generateButton');
// const successMessage = document.getElementById('success-message');

const userNameInput = document.getElementById('user-name');
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
    ctx.font = "18px Gidole";
    ctx.fillStyle = textColorSelect.value === "golden-black" ? "gold" : textColorSelect.value;
    ctx.textAlign = "center"; // Center align the text
    ctx.fillText(`From: ${userName}`, cardCanvas.width / 2, cardCanvas.height - 20);
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

generateButton.addEventListener('click', () => {
  if (userNameInput.value.trim() === "") {
    alert("Please enter your name!");
  } else {
    // successMessage.classList.remove('hidden');
  }
});

// // Download Button
// const downloadBtn = document.getElementById('download-btn');
// downloadBtn.addEventListener('click', () => {
//   const link = document.createElement('a');
//   link.download = 'eid-card.png';
//   link.href = cardCanvas.toDataURL();
//   link.click();
// });

// Share Button
// const shareBtn = document.getElementById('share-btn');
// shareBtn.addEventListener('click', () => {
//   cardCanvas.toBlob((blob) => {
//     const file = new File([blob], 'eid-card.png', { type: 'image/png' });
//     const shareData = {
//       files: [file],
//       title: 'Eid Card',
//       text: 'Check out this Eid card I generated!',
//     };

//     if (navigator.share) {
//       navigator.share(shareData)
//         .then(() => console.log('Card shared successfully'))
//         .catch((error) => console.error('Error sharing card:', error));
//     } else {
//       alert("Sharing is not supported in your browser.");
//     }
//   });
// });