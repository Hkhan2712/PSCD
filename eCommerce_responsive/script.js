const nav = document.querySelector(".navbar-collapse");
const collapseBtn = document.querySelector(".collapse-btn");

collapseBtn.addEventListener("click", function () {
    nav.classList.toggle("navbar-collapse--open");
    collapseBtn.classList.toggle("collapse-btn--open")
});
  