// Находим все необходимые элементы на странице
const burgerButton = document.querySelector(".burger-menu"); // Кнопка бургер-меню
const navigationMenu = document.querySelector(".nav-links"); // Навигационное меню
const navLinks = document.querySelectorAll(".nav-links a"); // Все ссылки в меню

// Функция для открытия/закрытия меню
function toggleMenu() {
  // Переключаем класс 'active' у меню
  navigationMenu.classList.toggle("active");

  // Обновляем атрибут доступности для скринридеров
  const isExpanded = navigationMenu.classList.contains("active");
  burgerButton.setAttribute("aria-expanded", isExpanded);
}

// Функция для закрытия меню
function closeMenu() {
  navigationMenu.classList.remove("active");
  burgerButton.setAttribute("aria-expanded", "false");
}

// Обработчик клика по бургер-кнопке
burgerButton.addEventListener("click", function (e) {
  e.preventDefault(); // Предотвращаем стандартное поведение
  toggleMenu();
});

// Обработчик клика по ссылкам меню
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Обработчик клика по документу для закрытия меню
document.addEventListener("click", function (e) {
  // Проверяем, был ли клик вне области меню и кнопки
  const isClickInsideMenu = navigationMenu.contains(e.target);
  const isClickOnButton = burgerButton.contains(e.target);

  if (!isClickInsideMenu && !isClickOnButton) {
    closeMenu();
  }
});

// Обработчик клавиатуры для доступности
burgerButton.addEventListener("keydown", function (e) {
  // Закрываем меню по нажатию Esc
  if (e.key === "Escape" && navigationMenu.classList.contains("active")) {
    closeMenu();
    burgerButton.focus();
  }
});
