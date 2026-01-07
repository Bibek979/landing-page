

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

// Handling Contact form data
const onlyForm = document.getElementById("contact-form");

// Toast helper using Bootstrap
function showToast(type, message) {
  let container = document.getElementById("toast-area");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-area";
    container.className = "toast-container position-fixed bottom-0 end-0 p-3";
    container.style.zIndex = "1100";
    document.body.appendChild(container);
  }

  const bgClass = (
    type === "success" ? "bg-success" :
    type === "warning" ? "bg-warning text-dark" :
    type === "info" ? "bg-info text-dark" :
    "bg-danger"
  );

  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center text-white ${bgClass} border-0`;
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  container.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
  toast.show();
}

onlyForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Honeypot: if filled, abort silently
  const companyEl = document.getElementById("company");
  if (companyEl && companyEl.value) {
    return;
  }

  const result = formValidation();
  if (!result || result.ok === false) {
    const msg = result && Array.isArray(result.errors)
      ? result.errors.join(" ")
      : "Please complete all required fields correctly.";
    showToast("danger", msg);
    return;
  }

  // Disable button while sending
  const btn = document.getElementById("contactsubmitbtn");
  const originalText = btn.innerText;
  btn.disabled = true;
  btn.innerText = "Sending...";

  try {
    await sendForm();
  } finally {
    btn.disabled = false;
    btn.innerText = originalText;
  }
});


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
    if (data.response === 'SENT') {
      showToast("success", "Message sent! I’ll get back soon.");
    }
  } catch (error) {
    showToast("danger", "Failed to send. Please try again.");
  }
}





