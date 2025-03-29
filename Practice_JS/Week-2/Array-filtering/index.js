//Фильтрация массива с использованием функции обратного вызова:
//Задача: Создай функцию, которая фильтрует массив чисел, оставляя только чётные.
const arr = [
  123, 4554365, 23423, 2526, 645523, 213452, 564572, 55634530, 987976,
];

const chet = (num) => num % 2 === 0;
const arr2 = arr.filter(chet);

const arr1 = arr.filter((num) => {
  return num % 2 === 0;
});

console.log(arr1);
console.log(arr2);

//Решение от нейросетки с определением собственной функции фильтрации:
function filterEvenNumbers(numbers, callback) {
  const result = [];
  for (let num of numbers) {
    if (callback(num)) {
      result.push(num);
    }
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterEvenNumbers(numbers, (num) => num % 2 === 0);

console.log("Чётные числа:", evenNumbers);
