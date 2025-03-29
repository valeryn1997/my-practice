//Задача: Создай массив чисел и найди их сумму с помощью цикла.

//1 этап - создаение массива
const arr = [];
alert("Можете вести 5 чисел и получить их сумму");
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
//2 этап через .reduce
/*const sum = arr.reduce((accumulator, currentElement) => {
  return accumulator + currentElement;
});*/
//console.log(`Результат ${sum}`);
/*do {
  //Запрашиваем у пользователя числа
  let n = parseFloat(prompt(`Введите ${i} число:`));
  console.log(`${n}`);

  if (n !== NaN && n !== null && n !== undefined) {
    console.log(`${n}`);
    arr.push(n);
    i++;
  } else {
    //Предупреждаем об ошибке
    alert("Вводить можно только числа!");
  }
} while (i < 6);*/

//2 этап - сумма всех элементов массива, через .forEach
let s = 0;
const sum = arr.forEach((num) => (s += num));

/*for (let i = 0; i<5;i++){
    let n = parseFloat(prompt(`Введите ${i+1} чило:`))
    n !== Nan && n !== null ? arr.push(n) : 

}*/
console.log(`Результат ${s}`);
//prompt();
