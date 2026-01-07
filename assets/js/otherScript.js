document.addEventListener("DOMContentLoaded", () => {
    // Navbar hiding logic 
    let lastScrollY = window.scrollY;
    const navBar = document.getElementById("navbar");
    let scrollTimeout;

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY) {
            navBar.style.top = "-80px";
        } else {
            navBar.style.top = "0px";
        }
        lastScrollY = window.scrollY;

        // Clear existing timeout
        clearTimeout(scrollTimeout);

        // Show navbar after scrolling stops for 1.5 seconds
        scrollTimeout = setTimeout(() => {
            navBar.style.top = "0px";
        }, 1500);
    });
});

// Form validation logic
  var formdetails;

  function formValidation() {
    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const phoneEl = document.getElementById("phone");
    const msgEl = document.getElementById("textmessage");
    const honeypotEl = document.getElementById("company");

    const name = (nameEl?.value || "").trim();
    const email = (emailEl?.value || "").trim();
    const phoneRaw = (phoneEl?.value || "").trim();
    const message = (msgEl?.value || "").trim();
    const honeypot = honeypotEl?.value || "";

    const errors = [];

    // Honeypot: if filled, treat as bot and fail silently
    if (honeypot) {
      return { ok: false, errors: ["Invalid submission."] };
    }

    // Name validation
    if (!name || name.length < 2) {
      errors.push("Please enter your name.");
    }

    // Email validation (basic)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailPattern.test(email)) {
      errors.push("Please enter a valid email address.");
    }

    // Phone validation: 7-15 digits allowed
    const digits = phoneRaw.replace(/[^\d]/g, "");
    if (!digits || digits.length < 7 || digits.length > 15) {
      errors.push("Please enter a valid phone number (7-15 digits).");
    }

    if (errors.length) {
      return { ok: false, errors };
    }

    formdetails = {
      Name: name,
      Email: email,
      Contact: phoneRaw,
      Message: message
    };

    return { ok: true, data: formdetails };
  }


    

  // Slide show logic

  const slides = document.querySelectorAll(".experience-slide");
  const wrapper = document.querySelector(".slide-wrapper");

  let current = 0;
  let autoTimer;

  // Ensure absolute stacking and set initial wrapper height
  slides.forEach(s => {
    s.style.position = "absolute";
    s.style.top = "0";
    s.style.left = "0";
    s.style.width = "100%";
  });
  // Set wrapper height to current slide's height to avoid collapse
  if (slides[0]) {
    wrapper.style.height = slides[0].offsetHeight + "px";
  }

  // Update wrapper height on resize (debounced)
  let resizeTimer;
  function setWrapperHeightToCurrent() {
    if (slides[current]) {
      wrapper.style.height = slides[current].offsetHeight + "px";
    }
  }
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setWrapperHeightToCurrent, 150);
  });

  // Initial state
  gsap.set(slides, { xPercent: 100, opacity: 0 });
  gsap.set(slides[0], { xPercent: 0, opacity: 1 });

  function goToSlide(next, direction = 1) {
    if (next === current) return;

    // current slide out
    gsap.to(slides[current], {
      xPercent: -100 * direction,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut"
    });

    // prep next slide
    gsap.set(slides[next], {
      xPercent: 100 * direction,
      opacity: 0
    });

    // next slide in
    gsap.to(slides[next], {
      xPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.inOut"
    });

    // Animate wrapper height to match incoming slide
    const nextHeight = slides[next].offsetHeight;
    gsap.to(wrapper, { height: nextHeight, duration: 0.3, ease: "power1.out" });

    current = next;
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    goToSlide(next, 1);
  }

  function prevSlide() {
    const prev = (current - 1 + slides.length) % slides.length;
    goToSlide(prev, -1);
  }

  // Auto play
  function startAuto() {
    autoTimer = setInterval(nextSlide, 4000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  startAuto();

  // ===== Swipe Support =====
  let startX = 0;

  wrapper.addEventListener("touchstart", e => {
    stopAuto();
    startX = e.touches[0].clientX;
  });

  wrapper.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 60) {
      diff > 0 ? nextSlide() : prevSlide();
    }

    startAuto();
  });

  // Optional: pause on hover (desktop)
  wrapper.addEventListener("mouseenter", stopAuto);
  wrapper.addEventListener("mouseleave", startAuto);

