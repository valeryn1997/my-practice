//Сортировка массива с использованием функции обратного вызова:
//Задача: Напиши функцию, которая сортирует массив чисел по возрастанию или убыванию.
const comparison = (a, b, mode) => {
  if (mode === 1) {
    return a > b;
  } else {
    return a < b;
  }
};
const sort = (func, array, mode) => {
  let k;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (!func(array[j], array[j + 1], mode)) {
        // console.log(array[i]);
        // console.log(array[j]);
        k = array[j];
        array[j] = array[j + 1];
        array[j + 1] = k;
      }
    }
  }
  //return array;
};

const arr = [];
alert("Можете вести 5 чисел их отфильтрует");
let i = 1;
while (i < 6) {
  let n = parseFloat(prompt(`Введите ${i} число:`));
  //console.log(`${n}`);
  if (!isNaN(n) && n !== null && n !== undefined) {
    //console.log(`${n}`);
    arr.push(n);
    i++;
  } else {
    //Предупреждаем об ошибке
    alert("Вводить можно только числа!");
  }
}
const arr1 = arr.concat();
const mode = prompt(
  `Введите режим сортировка \nПо возрастанию - >\nПо убыванию - <`
);
let t = false;
//let result;
while (t === false) {
  switch (mode) {
    case ">":
      //result = sort(comparison, arr, 1);
      sort(comparison, arr, 0);
      t = true;
      break;
    case "<":
      //result = sort(comparison, arr, 0);
      sort(comparison, arr, 1);
      t = true;
      break;
    default:
      alert("Ошибка - введено неверное значение!");
  }
}
alert(`Изначальный ввод - ${arr1}\nПосле сортировки - ${arr}`);
