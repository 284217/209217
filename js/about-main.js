// ===== About Us Page Interactivity =====
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-section");

  if (aboutSection) {
    aboutSection.style.opacity = "0";
    aboutSection.style.transition = "all 0.8s ease";
    aboutSection.style.transform = "translateY(20px)";

    setTimeout(() => {
      aboutSection.style.opacity = "1";
        aboutSection.style.transform = "translateY(0)";
    }, 200);
  }
});
