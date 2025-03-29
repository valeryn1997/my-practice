//Задача: Напиши программу, которая проверяет, является ли число чётным или нет
alert("Эта программа способна определить, является ли число четным");
let number = prompt("Введите число:");
if (number === null) {
  alert("Ну и нах ты отменяешь?");
} else if (isNaN(parseInt(number))) {
  alert("Ну и еб**н же ты... Только числа....");
} else if (parseFloat(number) - parseInt(number) !== 0) {
  alert("Чётность в теории чисел — характеристика целого числа!");
} else {
  let check = number % 2;
  check === 0 ? alert("Чётное!") : alert("Нечётное!");
}
