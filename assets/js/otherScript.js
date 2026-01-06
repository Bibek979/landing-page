document.addEventListener("DOMContentLoaded", () => {
    // Navbar hiding logic 
    let lastScrollY = window.scrollY;
    const navBar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY) {
            navBar.style.top = "-80px";
        } else {
            navBar.style.top = "0px";
        }
        lastScrollY = window.scrollY;
    });
});

// Form validation logic
    var formdetails;

    function formValidation() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("textmessage").value;
        
        if(!name||!email||!phone) {
            return false;
        }
        else {
            formdetails = {
                "Name": name, "Email": email, "Contact": phone, "Message": message
            };
            return true;
        }
    }


    
  const slides = document.querySelectorAll(".experience-slide");
  const wrapper = document.querySelector(".slide-wrapper");

  let current = 0;
  let autoTimer;

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

