// Password visibility toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".reveal6");
    const passwordField = document.querySelector(".pwd6");

    toggleBtn.addEventListener("click", () => {
        const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        toggleBtn.querySelector("i").classList.toggle("ti-eye");
        toggleBtn.querySelector("i").classList.toggle("ti-eye-off");
    });

    // Redirect on Sign In (without validation)
    const signInBtn = document.getElementById("signInBtn");
    signInBtn.addEventListener("click", () => {
        window.location.href = "nextpage.html";  // put your next page path here
    });
});
