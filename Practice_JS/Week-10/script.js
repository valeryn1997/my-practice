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

  // Показываем таблицу и кнопку подсчёта
  evaluationGrid.classList.remove("hidden");
  document.getElementById("calculate").classList.remove("hidden");
});

document.getElementById("calculate").addEventListener("click", () => {
  const subjects = Array.from(document.querySelectorAll(".subject-name")).map(
    (el) => el.textContent
  );
  const scores = {};

  document.querySelectorAll(".slider").forEach((slider) => {
    const subjectIndex = slider.dataset.subject;
    scores[subjectIndex] = (scores[subjectIndex] || 0) + parseInt(slider.value);
  });

  // Вывод результатов
  const scoresDiv = document.getElementById("scores");
  scoresDiv.innerHTML = Object.entries(scores)
    .map(
      ([subjectIndex, score]) =>
        `<p>${subjects[subjectIndex]}: ${score} баллов</p>`
    )
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
    },
  });

  // Показываем результаты
  document.querySelector(".results").classList.remove("hidden");
});
