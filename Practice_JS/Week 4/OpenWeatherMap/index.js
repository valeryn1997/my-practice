const apiKey = "8728c0a2d8298cdfa90393da422384c0";
//http://api.openweathermap.org/geo/1.0/direct?q=%D1%81%D1%83%D1%80%D0%B3%D1%83%D1%82&limit=5&appid=8728c0a2d8298cdfa90393da422384c0

async function fetchLocationData(url) {
  let data = null;
  try {
    const response = await fetch(url);

    if (response.status === 200) {
      data = await response.json();
      console.log("Данные получены:", data);
    } else if (response.status === 404) {
      console.error("Страница не найдена.");
    } else {
      console.error(`Ошибка сервера: ${response.status}`);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
  return data;
}

async function fetchWeatherData(url) {
  let data = null;
  try {
    const response = await fetch(url);

    if (response.status === 200) {
      data = await response.json();
      console.log("Данные получены:", data);
    } else if (response.status === 404) {
      console.error("Страница не найдена.");
    } else {
      console.error(`Ошибка сервера: ${response.status}`);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
  return data;
}

/* const userChange = (obj) => {
  let result = [-200, -200];
  if (obj) {
    let options = "Выберите вариант из списка (номер): \n";
    let count = 0;
    for (let param in obj) {
      options += `№${count + 1}
            Название города - ${param.name}
            Широта - ${param.lat}
            Долгота - ${param.lon}
            Страна - ${param.country}
            Регион (если есть) - ${
              param.state
            }\n______\n<3<3<3<3<3<3<3<3<3<3<3<3\n______\n`;
      count++;
    }
    const choose = parseInt(prompt(`${options}`));
    if (choose <= count && choose >= 0 && !isNaN(choose) && choose !== null) {
      result[0] = obj[choose - 1].lat;
      result[1] = obj[choose - 1].lon;
    } else {
      console.log("Введен недопустимый идентификатор");
    }
  }
  return result;
}; */
const userChange = (obj) => {
  let result = [-200, -200];
  if (Array.isArray(obj) && obj.length > 0) {
    // Проверяем, что obj — массив
    let options = "Выберите вариант из списка (номер):\n";
    obj.forEach((element, index) => {
      options += `
                №${index + 1}
                Название города - ${element.name}
                Широта - ${element.lat}
                Долгота - ${element.lon}
                Страна - ${element.country}
                Регион (если есть) - ${element.state ?? "Нет данных"}
                ______
                <3<3<3<3<3<3<3<3<3<3<3<3
                ______
            `;
    });

    const choose = parseInt(prompt(options));
    if (!isNaN(choose) && choose > 0 && choose <= obj.length) {
      const selectedElement = obj[choose - 1];
      result[0] = selectedElement.lat;
      result[1] = selectedElement.lon;
    } else {
      console.log("Введен недопустимый идентификатор");
    }
  } else {
    console.log("Список локаций пуст или некорректен");
  }

  return result;
};

/* const searchCoordinates = (cityName = "Surgut") => {
  let coordinates = null;
  let limit = 5;
  const urlLoc = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`;
  const res = fetchLocationData(urlLoc);
  if (res) {
    let response = userChange(res);
    if (response !== [-200, -200]) {
      coordinates = response;
    } else {
      console.log("Произошла ошибка при поиске координат локации");
    }
  } else {
    console.log("Пустой промис");
  }
  return coordinates;
};

const searchWeather = (coord, lang = "RU", units = "metric") => {
  let weather = null;
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&lang=${lang}&unit=${units}&appid=${apiKey}`;
  const response = fetchWeatherData(urlWeather);
  response
    ? (weather = response)
    : console.log("ПРоизошла ошибка при получении данных о погоде");
  return weather;
}; */
const searchCoordinates = async (cityName = "Surgut") => {
  const limit = 5;
  const urlLoc = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    cityName
  )}&limit=${limit}&appid=${apiKey}`;
  const res = await fetchLocationData(urlLoc); // Добавлен await

  if (res && Array.isArray(res) && res.length > 0) {
    const response = userChange(res);
    if (response !== [-200, -200]) {
      return response;
    } else {
      console.log("Произошла ошибка при выборе координат локации");
    }
  } else {
    console.log("Локация не найдена. Проверьте название города.");
  }

  return null;
};

const searchWeather = async (coord, lang = "RU", units = "metric") => {
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&lang=${lang}&units=${units}&appid=${apiKey}`;
  const res = await fetchWeatherData(urlWeather); // Добавлен await
  return res || null;
};

const userSees = (
  cityName,
  weatherStat, // Состояние погоды
  temp, // Температура
  tempFeels, // На сколько темп. по ощущениям
  pressure, // Атмосферное давление
  humidity, // Влажность в %
  visibility, // Видимость
  windSpeed, // Скорость ветра м/сек
  windDir, // Направление ветра, градусы (метеорологическое)
  winfGust, // Порывы ветра м/сек
  clouds, // Облачность %
  rain = 0, // Осадки в виде дождя в мм/ч
  snow = 0, // Осадки в виде снега в мм/ч
  dt, // Время расчета данных, unix, UTC
  sunrise, // Время восхода солнца, unix, UTC
  sunset // Время заката, unix, UTC
) => {
  return {
    cityName,
    weatherStat,
    temp,
    tempFeels,
    pressure,
    humidity,
    visibility,
    windSpeed,
    windDir,
    winfGust,
    clouds,
    rain,
    snow,
    dt,
    sunrise,
    sunset,
  };
};

/* const parsWeather = (obj) => {
  let wetherObject = null;
  if (obj) {
    let cityName = obj.name;
    let weatherStat = obj[0].description;
    let { temp } = obj.main;
    let tempFeels = obj.main[feels_like];
    let { pressure } = obj.main;
    let { humidity } = obj.main;
    let { visibility } = obj;
    let windSpeed = obj.wind.speed;
    let windDir = obj.wind.deg;
    let windGust = obj.wind.gust;
    let clouds = obj.clouds.all;
    let rain = obj.rain["1h"];
    let snow = obj.snow["1h"];
    let { dt } = obj;
    let { sunrise } = obj.sys;
    let { sunset } = obj.sys;
    wetherObject = userSees(
      cityName,
      weatherStat,
      temp,
      tempFeels,
      pressure,
      humidity,
      visibility,
      windSpeed,
      windDir,
      windGust,
      clouds,
      rain,
      snow,
      dt,
      sunrise,
      sunset
    );
  } else {
    console.log("Промис с данными о погоде не был разобран");
  }

  return wetherObject;
}; */
const parsWeather = (obj) => {
  if (!obj || !obj.weather || !obj.main) {
    console.error("Промис с данными о погоде не был разобран");
    return null;
  }

  const cityName = obj.name;
  const weatherStat = obj.weather[0].description; // Обратите внимание на [0]
  const temp = obj.main.temp;
  const tempFeels = obj.main.feels_like; // Исправлено: feels_like вместо main[feels_like]
  const pressure = obj.main.pressure;
  const humidity = obj.main.humidity;
  const visibility = obj.visibility;
  const windSpeed = obj.wind?.speed || 0; // Используем optional chaining
  const windDir = obj.wind?.deg || 0;
  const windGust = obj.wind?.gust || 0;
  const clouds = obj.clouds?.all || 0;
  const rain = obj.rain?.["1h"] || 0;
  const snow = obj.snow?.["1h"] || 0;
  const dt = obj.dt;
  const sunrise = obj.sys.sunrise;
  const sunset = obj.sys.sunset;

  return userSees(
    cityName,
    weatherStat,
    temp,
    tempFeels,
    pressure,
    humidity,
    visibility,
    windSpeed,
    windDir,
    windGust,
    clouds,
    rain,
    snow,
    dt,
    sunrise,
    sunset
  );
};

const weatherResult = (obj) => {
  alert(`Город - ${obj.cityName}
    Состояние погоды: ${obj.weatherStat}
    Температура воздуха: ${obj.temp}
    Температура по ощущениям: ${obj.tempFeels}
    Атмосферное давление: ${obj.pressure}
    Влажность воздуха: ${obj.humidity}%
    Видмость: ${obj.visibility}
    Скорость ветра: ${obj.windSpeed}м/с
    Порывы ветра: до ${obj.windGust}м/с
    Облачность: ${obj.clouds}%
    Дождь: ${obj.rain}мм/ч
    Снег: ${obj.snow}мм/ч`);
};

const userReq = () => {
  let req = null;
  let pr = prompt(
    "Введите название города, для поиска данных о погоде.\nДля более точного запроса укажите в формате (город, Страна)"
  );
  pr ? (req = pr) : console.log("Данные не были введены");

  return req;
};

const greetings = () => {
  alert("Эта программа позволяет посмотреть прогноз в выбраннной локации!");
};

/* const main = () => {
  let result = 0;
  greetings();
  let city = userReq();
  let stat = true;
  while (stat) {
    if (city) {
      weatherResult(
        parsWeather(searchWeather(searchCoordinates(userReq), null, null))
      );
      stat = false;
    }
  }

  return result;
}; */

const main = async () => {
  greetings();
  let city = userReq();

  if (city) {
    const coordinates = await searchCoordinates(city);
    if (coordinates) {
      const weatherData = await searchWeather(coordinates, "RU", "metric");
      if (weatherData) {
        const parsedWeather = parsWeather(weatherData);
        if (parsedWeather) {
          weatherResult(parsedWeather);
        } else {
          console.log("Не удалось получить данные о погоде.");
        }
      } else {
        console.log("Ошибка при получении данных о погоде.");
      }
    } else {
      console.log("Не удалось найти координаты локации.");
    }
  } else {
    console.log("Запрос отменен.");
  }
};
main();
