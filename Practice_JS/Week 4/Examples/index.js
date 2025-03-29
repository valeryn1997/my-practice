/*GET:
Используется для получения данных с сервера.
Пример: Когда вы открываете сайт, браузер отправляет GET-запрос к серверу.*/

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data));

/*  POST:
Используется для отправки данных на сервер.
Пример: Когда вы отправляете форму на сайте, браузер отправляет POST-запрос.*/

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({ title: "New Post", body: "This is a new post." }),
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => console.log(data));

/*5. Примеры использования HTTP
Пример 1: Получение списка постов */
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Ошибка:", error));
//Здесь мы используем метод GET для получения списка постов с публичного API.

//Пример 2: Создание нового поста
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({ title: "New Post", body: "This is a new post." }),
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Ошибка:", error));
//Здесь мы используем метод POST для создания нового поста.

/*Задание: Получение погоды через OpenWeatherMap API
Зарегистрируйтесь на OpenWeatherMap и получите бесплатный API ключ.
Напишите программу, которая получает текущую погоду для города. */
const apiKey = "YOUR_API_KEY"; // Замените на ваш API ключ
const city = "Moscow";

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const temperature = data.main.temp;
    console.log(`Текущая температура в ${city}: ${temperature} К`);
  })
  .catch((error) => console.error(error));

// Пример использования fetch с then/catch
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Список постов:", data);
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error);
  });

// Пример использования async/await:
async function getPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    console.log("Список постов:", data);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

getPosts();

/*Основные группы статусов:
1xx (Информационные): Сообщения о процессе.
Пример: 100 Continue.
2xx (Успешные): Запрос выполнен успешно.
Пример: 200 OK.
3xx (Перенаправления): Клиент должен выполнить дополнительные действия.
Пример: 301 Moved Permanently.
4xx (Клиентские ошибки): Проблемы с запросом клиента.
Пример: 404 Not Found.
5xx (Серверные ошибки): Проблемы на стороне сервера.
Пример: 500 Internal Server Error. */

// Практический пример обработки статусов:
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (response.status === 200) {
      const data = await response.json();
      console.log("Данные получены:", data);
    } else if (response.status === 404) {
      console.error("Страница не найдена.");
    } else {
      console.error(`Ошибка сервера: ${response.status}`);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

fetchData("https://jsonplaceholder.typicode.com/posts"); // Рабочий URL
fetchData("https://jsonplaceholder.typicode.com/nonexistent"); // Нерабочий URL
