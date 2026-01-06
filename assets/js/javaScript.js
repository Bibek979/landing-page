

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
  hamburgerImg.src = '/assets/img/close-icon.png';
  hamburgerImg.alt = 'Close';
};

// Close menu
const closeMenu = () => {
  sideMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  hamburgerImg.src = '/assets/img/hamburger.png';
  hamburgerImg.alt = 'Menu';
};

menuOverlay.addEventListener('click', closeMenu);

// Close menu when link is clicked
sideMenuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Store button link handler
const shopButton = document.getElementById("store-button");
shopButton.addEventListener("click", function () {
  window.location.href = "https://shop.bib3k.me";
})


// Downloading resume button 
function downloadResume() {
  const link = document.createElement('a');
  link.href = "/assets/others/bibek-resume.pdf";
  link.download = "Bibekananda-Besra-resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// Sending form
async function sendForm() {
  try {
    const response = await fetch("https://n8n.bib3k.me/webhook/lead-path", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formdetails)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (data.response === 'SENT') {
      successDiv.className = "container success-chat-active";
      contactFormDiv.style.display = "none";
    }
  } catch (error) {
    document.getElementById("contactsubmitbtn").innerHTML = "Try Again";
    document.getElementById("contactsubmitbtn").style.backgroundColor = "red";
  }
}



// Handling Contact form data
const contactFormDiv = document.getElementById("contact-form-div");
const successDiv = document.getElementById("success-chat");
const onlyForm = document.getElementById("contact-form");

onlyForm.addEventListener("submit", function (event) {
  if (!document.getElementById("company")) {
    return;
  } else {
    event.preventDefault();
    if (formValidation()) {
      sendForm();
    } else {
      alert("Form details missing!");
    }
  }
})


