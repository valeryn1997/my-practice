//Задача: Проверь, есть ли заданное число в массиве.
const arr = [13];
for (let i = 0; i < 50; i++) {
  arr.push(Math.floor(Math.random() * 100));
}

let j = false;
do {
  let penis = parseInt(
    prompt(
      "Введите число и мы проверим, есть ли оно в списке из 51 рандомных чисел от 1 до 100!"
    )
  );
  if (
    !isNaN(penis) &&
    penis !== null &&
    penis !== undefined &&
    0 < penis < 101
  ) {
    const availability = arr.findIndex((num) => num === penis);
    if (availability !== -1) {
      //console.log(availability);
      alert(`Тебе повезло! Это число стоит на ${availability + 1} месте!`);
      const count = arr.filter((num) => num === penis);
      alert(`А всего таких чисел ${count.length} в списке!`);
      alert(`Вот весь массив для ручной проверки: \n ${arr}`);
    } else {
      alert(
        `Тебе не повезло :(\n Вот весь массив для ручной проверки: \n ${arr}`
      );
    }
    j = true;
  } else {
    alert("Только число!");
  }
} while (j === false);
