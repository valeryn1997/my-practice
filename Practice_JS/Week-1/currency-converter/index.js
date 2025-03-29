//Задача: Создай программу, которая конвертирует сумму из одной валюты в другую (например, доллары в евро).
//Задай курс обмена (например, 1 доллар = 0.9 евро).
alert(
  "Эта программа является конвертером валют из доларов в евро и наоборот. Курс 1€ = 0.9$"
);
let direction = prompt(
  'Для конвертации долларов в евро - введите "1". Для конвертации евро в доллары - введите "2".'
);
let k = 0.9;
if (direction !== "1" && direction !== "2") {
  alert("Ну и какая тебе еще конвертация?... Читать научись сначала!");
} else {
  let number = prompt("Введите сумму для конвертации:");
  if (number === null) {
    alert("Ну и нах ты отменяешь?");
  } else if (isNaN(parseFloat(number))) {
    alert("Ты буквами расплачиваешься?....");
  } else {
    let result;
    let moneySymbol;
    let moneySymbolAlt;
    switch (direction) {
      case "1":
        result = number / k;
        moneySymbol = "€";
        moneySymbolAlt = "$";
        break;
      case "2":
        result = number * k;
        moneySymbol = "$";
        moneySymbolAlt = "€";
        break;
    }
    alert(`Результат: ${number}${moneySymbolAlt} = ${result}${moneySymbol}`);
  }
}
