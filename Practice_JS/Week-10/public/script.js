const App = {
  chart: null,
  historyChart: null,
};
document.getElementById("start").addEventListener("click", () => {
  const subjectCount =
    parseInt(document.getElementById("subjectCount").value) || 1;
  const criteriaCount =
    parseInt(document.getElementById("criteriaCount").value) || 1;

  const subjectNamesDiv = document.getElementById("subjectNames");
  const criteriaNamesDiv = document.getElementById("criteriaNames");

  // Очистка предыдущих полей
  subjectNamesDiv.innerHTML = "<h3>Названия субъектов:</h3>";
  criteriaNamesDiv.innerHTML = "<h3>Названия критериев:</h3>";

  // Создание полей для субъектов
  for (let i = 0; i < subjectCount; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Субъект ${i + 1}`;
    input.dataset.index = i;
    subjectNamesDiv.appendChild(input);
  }

  // Создание полей для критериев
  for (let i = 0; i < criteriaCount; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Критерий ${i + 1}`;
    input.dataset.index = i;
    criteriaNamesDiv.appendChild(input);
  }

  // Показываем форму настройки
  document.getElementById("setupForm").classList.remove("hidden");
});

document.getElementById("generateGrid").addEventListener("click", () => {
  const subjects = Array.from(
    document.querySelectorAll("#subjectNames input")
  ).map(
    (input) => input.value || `Субъект ${parseInt(input.dataset.index) + 1}`
  );

  const criteria = Array.from(
    document.querySelectorAll("#criteriaNames input")
  ).map(
    (input) => input.value || `Критерий ${parseInt(input.dataset.index) + 1}`
  );

  const evaluationGrid = document.getElementById("evaluationGrid");
  evaluationGrid.innerHTML = "";

  // Генерация колонок для каждого субъекта
  subjects.forEach((subject, subjectIndex) => {
    const column = document.createElement("div");
    column.className = "subject-column";

    const subjectName = document.createElement("div");
    subjectName.className = "subject-name";
    subjectName.textContent = subject;
    column.appendChild(subjectName);

    criteria.forEach((criterion, criterionIndex) => {
      const sliderDiv = document.createElement("div");
      sliderDiv.className = "criteria-slider";

      const emoji = document.createElement("span");
      emoji.className = "emoji";
      emoji.textContent = "😞";

      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = 0;
      slider.max = 5;
      slider.value = 0;
      slider.className = "slider";
      slider.dataset.subject = subjectIndex;
      slider.dataset.criterion = criterionIndex;

      const valueDisplay = document.createElement("span");
      valueDisplay.className = "value";
      valueDisplay.textContent = slider.value;

      slider.addEventListener("input", (e) => {
        const value = parseInt(e.target.value);
        const emojis = ["😞", "🙁", "😐", "🙂", "😊", "🤩"];
        emoji.textContent = emojis[value];
        valueDisplay.textContent = value;
      });

      sliderDiv.appendChild(emoji);
      sliderDiv.appendChild(document.createElement("label")).textContent =
        criterion;
      sliderDiv.appendChild(slider);
      sliderDiv.appendChild(valueDisplay);
      column.appendChild(sliderDiv);
    });

    evaluationGrid.appendChild(column);
  });

  // Показываем таблицу и кнопки
  evaluationGrid.classList.remove("hidden");
  document.getElementById("calculate").classList.remove("hidden");
  document.getElementById("showHistory").classList.remove("hidden");
});

document.getElementById("calculate").addEventListener("click", async () => {
  const subjects = Array.from(document.querySelectorAll(".subject-name")).map(
    (el) => el.textContent
  );
  const scores = {};

  document.querySelectorAll(".slider").forEach((slider) => {
    const subjectIndex = slider.dataset.subject;
    scores[subjectIndex] = (scores[subjectIndex] || 0) + parseInt(slider.value);
  });

  // Уничтожаем старый график
  if (window.chart instanceof Chart) {
    window.chart.destroy();
    window.chart = null;
  }

  // Сохраняем данные на сервере
  try {
    await fetch("http://localhost:3000/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjects, scores }),
    });
  } catch (error) {
    console.error("Ошибка сохранения:", error);
  }

  // Генерация случайных цветов
  const colors = subjects.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`);

  // Вывод результатов
  const scoresDiv = document.getElementById("scores");
  scoresDiv.innerHTML = Object.entries(scores)
    .map(([subjectIndex, score]) => {
      const maxScore = Math.max(...Object.values(scores));
      return `
        <div class="progress-container">
          <div class="progress-bar">
            <span>${subjects[subjectIndex]}:</span>
            <div class="bar">
              <div class="bar-fill" style="
                width: ${(score / maxScore) * 100}%;
                background-color: ${colors[subjectIndex]};
              "></div>
            </div>
            <span>${score} баллов</span>
          </div>
        </div>
      `;
    })
    .join("");

  // Показываем результаты
  const resultsEl = document.getElementById("results");
  resultsEl.classList.remove("hidden");

  // Ждём обновления DOM
  await new Promise((resolve) => requestAnimationFrame(resolve));

  // Уничтожаем старый график
  if (window.chart instanceof Chart) {
    window.chart.destroy();
  }

  // Создаём новый график
  const chartElement = document.getElementById("chart");
  window.chart = new Chart(chartElement, {
    type: "bar",
    data: {
      labels: subjects,
      datasets: [
        {
          label: "Баллы",
          data: Object.values(scores),
          backgroundColor: colors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true, // Важно для адаптивности
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: false } },
    },
  });
});

document.getElementById("showHistory").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/api/results");
    const data = await response.json();

    // Уничтожаем предыдущий график истории
    if (window.historyChart instanceof Chart) {
      window.historyChart.destroy();
      window.historyChart = null;
    }

    // Генерируем HTML для истории
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = data
      .map((item) => {
        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        return `
          <li>
            <strong>${formattedDate}</strong>
            <div>${item.subjects
              .map((s, i) => `${s}: ${item.scores[i] || 0}`)
              .join(" | ")}</div>
          </li>
        `;
      })
      .join("");

    // Создаём новый график только если данные есть
    if (data.length > 0 && data[0].subjects) {
      const ctx = document.getElementById("historyChart");
      if (!ctx) return;

      // Генерация цветов
      const colors = generateColors(data[0].subjects.length);

      window.historyChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data[0].subjects,
          datasets: data.map((item, index) => ({
            label: `Сравнение #${index + 1}`,
            data: Object.values(item.scores),
            backgroundColor: colors,
            borderWidth: 1,
          })),
        },
        options: {
          responsive: true, // Добавлено для адаптивности
          scales: { y: { beginAtZero: true } },
        },
      });
    }

    document.getElementById("history").classList.remove("hidden");
  } catch (error) {
    console.error("Ошибка загрузки истории:", error);
  }
});

// Генерация случайных цветов
function generateColors(count) {
  return Array.from(
    { length: count },
    () => `hsl(${Math.random() * 360}, 70%, 50%)`
  );
}
