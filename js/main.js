//#region Navbar
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navbarToggle = navbar.querySelector(".navbar-toggle");

  function openMobileNavbar() {
    navbar.classList.add("opened");
    navbarToggle.setAttribute("aria-expanded", "true");
  }

  function closeMobileNavbar() {
    navbar.classList.remove("opened");
    navbarToggle.setAttribute("aria-expanded", "false");
  }

  navbarToggle.addEventListener("click", () => {
    if (navbar.classList.contains("opened")) {
      closeMobileNavbar();
    } else {
      openMobileNavbar();
    }
  });

  const navbarMenu = navbar.querySelector("#navbar-menu");
  const navbarLinks = navbarMenu.querySelectorAll(".navbar-link");

  navbarLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNavbar);
  });

  const navbarLinksContainer = navbar.querySelector(".navbar-links");

  if (navbarMenu && navbarLinksContainer) {
    navbarLinksContainer.addEventListener("click", (clickEvent) => {
      clickEvent.stopPropagation();
    });

    navbarMenu.addEventListener("click", closeMobileNavbar);
  } else {
    console.error("Navbar menu or links container not found.");
  }
});
//#endregion
var currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;
