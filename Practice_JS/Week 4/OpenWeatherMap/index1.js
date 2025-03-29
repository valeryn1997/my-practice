const apiKey = "8728c0a2d8298cdfa90393da422384c0";

async function fetchLocationData(url) {
  try {
    const response = await fetch(url);

    if (response.status === 200) {
      const data = await response.json();
      console.log("Данные получены:", data);
      return data;
    } else if (response.status === 404) {
      console.error("Страница не найдена.");
    } else {
      console.error(`Ошибка сервера: ${response.status}`);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }

  return null;
}

async function fetchWeatherData(url) {
  try {
    const response = await fetch(url);

    if (response.status === 200) {
      const data = await response.json();
      console.log("Данные получены:", data);
      return data;
    } else if (response.status === 404) {
      console.error("Страница не найдена.");
    } else {
      console.error(`Ошибка сервера: ${response.status}`);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }

  return null;
}

const userChange = (obj) => {
  let result = [-200, -200];
  if (Array.isArray(obj) && obj.length > 0) {
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

const searchCoordinates = async (cityName = "Surgut") => {
  const limit = 5;
  const urlLoc = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    cityName
  )}&limit=${limit}&appid=${apiKey}`;
  const res = await fetchLocationData(urlLoc);

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
  return await fetchWeatherData(urlWeather);
};

const userSees = (
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
  rain = 0,
  snow = 0,
  dt,
  sunrise,
  sunset
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
    windGust,
    clouds,
    rain,
    snow,
    dt,
    sunrise,
    sunset,
  };
};

const parsWeather = (obj) => {
  if (!obj || !obj.weather || !obj.main) {
    console.error("Промис с данными о погоде не был разобран");
    return null;
  }

  const cityName = obj.name;
  const weatherStat = obj.weather[0]?.description || "Нет данных";
  const temp = obj.main.temp;
  const tempFeels = obj.main.feels_like;
  const pressure = obj.main.pressure;
  const humidity = obj.main.humidity;
  const visibility = obj.visibility;
  const windSpeed = obj.wind?.speed || 0;
  const windDir = obj.wind?.deg || 0;
  const windGust = obj.wind?.gust || 0;
  const clouds = obj.clouds?.all || 0;
  const rain = obj.rain?.["1h"] || 0;
  const snow = obj.snow?.["1h"] || 0;
  const dt = obj.dt;
  const sunrise = obj.sys?.sunrise || 0;
  const sunset = obj.sys?.sunset || 0;

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
  if (!obj) {
    console.log("Данные о погоде отсутствуют.");
    return;
  }

  alert(`
        Город - ${obj.cityName}
        Состояние погоды: ${obj.weatherStat}
        Температура воздуха: ${obj.temp}°C
        Температура по ощущениям: ${obj.tempFeels}°C
        Атмосферное давление: ${obj.pressure} гПа
        Влажность воздуха: ${obj.humidity}%
        Видимость: ${obj.visibility} метров
        Скорость ветра: ${obj.windSpeed} м/с
        Порывы ветра: до ${obj.windGust} м/с
        Облачность: ${obj.clouds}%
        Дождь: ${obj.rain} мм/ч
        Снег: ${obj.snow} мм/ч
    `);
};

const userReq = () => {
  const req = prompt(
    "Введите название города, для поиска данных о погоде.\nДля более точного запроса укажите в формате (город, Страна)"
  );
  return req || null;
};

const greetings = () => {
  alert("Эта программа позволяет посмотреть прогноз в выбранной локации!");
};

const main = async () => {
  greetings();
  const city = userReq();

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
