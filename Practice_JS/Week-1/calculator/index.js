/*Задача: Создай программу, 
которая запрашивает у пользователя два числа и выполняет 
одну из арифметических операций (+, -, *, /). Результат выводится в консоль.*/
alert(
  "Это простенький калькулятор, который умеет проводить операции сложения, вычитания, умножения и деления двух чисел"
);
let sum = (n1, n2) => n1 + n2;
let subtraction = (n1, n2) => n1 - n2;
let multiplication = (n1, n2) => n1 * n2;
let division = (n1, n2) => n1 / n2;
/*let display = (parametre) => {
console.log(parametre);
};*/
let number1 = parseFloat(prompt("Введите первое число:"));
if (isNaN(number1)) {
  alert("ЧИСЛО ***, А НЕ БУКАВЫ ИЛИ ШТОТА ТАКОЕ!");
} else {
  let number2 = prompt("Введите второе число:");
  if (isNaN(parseFloat(number2))) {
    alert("ЧИСЛО ***, А НЕ БУКАВЫ ИЛИ ШТОТА ТАКОЕ!");
  } else {
    let operator = prompt("Какую операцию выполнить? (+, -, *, /):");
    if (
      operator !== "+" &&
      operator !== "-" &&
      operator !== "*" &&
      operator !== "/"
    ) {
      alert("Ты еб***тый? Я ж тебе сказал, какие именно операции...");
    } else {
      if (number2 === "0" && operator === "/") {
        alert("На ноль делить нельзя!");
      } else {
        let result;
        let number0 = parseFloat(number2);
        switch (operator) {
          case "+":
            result = sum(number1, number0);
            break;
          case "-":
            result = subtraction(number1, number0);
            break;
          case "*":
            result = multiplication(number1, number0);
            break;
          case "/":
            result = division(number1, number0);
            break;
          /*default:
            result = "Ошибка!";*/
        }
        alert(`Результат: ${result}`);
      }
    }
  }
}
