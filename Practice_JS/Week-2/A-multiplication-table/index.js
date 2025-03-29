//Задача: Напиши программу, которая выводит таблицу умножения от 1 до 10.

// Получаем таблицу из DOM (Document Object Model) - спросил у нейросетки, так как пока не шарю за работу вместе с HTML
/*const table = document.getElementById("multiplicationTable");*/

//код для консольного вывода - написал сам
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    console.log(`${i} * ${j} = ${i * j}`);
  }
  //разделитель для удобного чтения
  console.log("--------------------");
}

// с поправкой от нейросетки, для работы с HTML
/*for (let i = 1; i <= 9; i++) {
  const row = document.createElement("tr"); // Создаем новую строку

  for (let j = 1; j <= 9; j++) {
    const cell = document.createElement("td"); // Создаем новую ячейку
    cell.textContent = `${i} * ${j} = ${i * j}`; // Заполняем ячейку
    row.appendChild(cell); // Добавляем ячейку в строку
  }

  table.appendChild(row); // Добавляем строку в таблицу
}
*/
