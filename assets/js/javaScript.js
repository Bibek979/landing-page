// Mobile Menu Handler
const hamburgerMenu = document.getElementById('hamburger-menu');
const hamburgerImg = hamburgerMenu.querySelector('img');
const sideMenu = document.getElementById('side-menu');
const menuOverlay = document.getElementById('menu-overlay');
const sideMenuLinks = document.querySelectorAll('.side-menu-link');

// Toggle menu
hamburgerMenu.addEventListener('click', () => {
  if (sideMenu.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Open menu
const openMenu = () => {
  sideMenu.classList.add('active');
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  hamburgerImg.src = './assets/img/close-icon.png';
  hamburgerImg.alt = 'Close';
};

// Close menu
const closeMenu = () => {
  sideMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  hamburgerImg.src = './assets/img/hamburger.png';
  hamburgerImg.alt = 'Menu';
};

menuOverlay.addEventListener('click', closeMenu);

// Close menu when link is clicked
sideMenuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});