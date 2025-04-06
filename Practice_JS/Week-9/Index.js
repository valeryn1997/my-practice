const burger = document.querySelector(".burger-menu");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// Находим элементы
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.querySelector(".modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

// Обработчик клика на изображение
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("img").src;
    modal.classList.add("show");
  });
});

// Закрытие при клике на крестик
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Закрытие при клике вне изображения
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});
