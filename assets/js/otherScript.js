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