//Вычисление факториала числа с использованием функции обратного вызова:
//Задача: Напиши функцию, которая вычисляет факториал числа, используя рекурсию или функцию обратного вызова.
const fac = (a) => {
  if (a < 0) {
    return -1;
  } else if (a === 0) {
    return 1;
  } else if (a - 1 !== 0) {
    return a * fac(a - 1);
  }
  return a;
};
/*const factorial = (func, a) => {
  while (func(a) !== a) {
    func(a);
  }
  return a;
};
*/
let index = parseInt(
  prompt("Введите число, факториал которого будет вычислен")
);
if (!isNaN(index) && index !== null && index !== undefined) {
  let check = fac(index);
  check === -1
    ? alert("Отрицательное число вводить нелья!")
    : alert(`Результат: ${check}`);
} else {
  alert("Только число!");
}
