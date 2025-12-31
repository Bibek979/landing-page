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