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
  evaluationGrid.style.gridTemplateColumns = `repeat(${subjects.length}, 1fr)`;

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

      const label = document.createElement("label");
      label.textContent = criterion;

      const emoji = document.createElement("span");
      emoji.className = "emoji";
      emoji.textContent = "😞";

      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = "0";
      slider.max = "5";
      slider.value = "0";
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
      sliderDiv.appendChild(label);
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

  // Вывод результатов
  const scoresDiv = document.getElementById("scores");
  scoresDiv.innerHTML = Object.entries(scores)
    .map(([subjectIndex, score]) => {
      const maxScore = Object.values(scores).reduce(
        (a, b) => Math.max(a, b),
        0
      );
      return `
        <div class="progress-container">
          <div class="progress-bar">
            <span>${subjects[subjectIndex]}:</span>
            <div class="bar">
              <div class="bar-fill" data-subject="${subjectIndex}" style="width: ${
        (score / maxScore) * 100
      }%"></div>
            </div>
            <span>${score} баллов</span>
          </div>
        </div>
      `;
    })
    .join("");

  // График
  new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: subjects,
      datasets: [
        {
          label: "Баллы",
          data: Object.values(scores),
          backgroundColor: ["#4CAF50", "#2196F3", "#ff5722", "#9c27b0"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: true },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });

  // Показываем результаты
  document.getElementById("results").classList.remove("hidden");
});

// Кнопка "Показать историю"
document.getElementById("showHistory").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/results");
    const data = await response.json();

    const historyList = document.getElementById("historyList");
    historyList.innerHTML = data
      .map(
        (item) => `
      <li>
        <strong>${new Date(item.timestamp).toLocaleDateString()}</strong>
        <div>${item.subjects
          .map((subject, i) => `${subject}: ${item.scores[i] || 0} баллов`)
          .join(" | ")}</div>
      </li>
    `
      )
      .join("");

    // Показываем историю
    document.getElementById("history").classList.remove("hidden");
  } catch (error) {
    console.error("Ошибка загрузки истории:", error);
  }
});
