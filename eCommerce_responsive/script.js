const nav = document.querySelector(".navbar-collapse");
const collapseBtn = document.querySelector(".collapse-btn");

// collapseBtn.addEventListener("click", () => {
//     nav.classList.remove("navbar-collapse");
//     nav.classList.add("navbar-collapse--open");
// });
collapseBtn.addEventListener("click", () => {
    nav.classList.toggle("navbar-collapse--open");
  });
  