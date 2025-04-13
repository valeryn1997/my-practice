const express = require("express");
const fs = require("fs");
const path = require("path");
const dataFilePath = path.join(__dirname, "comparisons.json");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Создаём файл, если его нет
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, "[]");
}

// Форматирование даты в ISO-формат
function getFormattedDateTime() {
  const date = new Date();
  return date.toISOString(); // Возвращает строку в формате "2023-10-05T12:34:56.789Z"
}

// Сохранение данных
app.post("/api/save", (req, res) => {
  const data = fs.readFileSync(dataFilePath);
  const comparisons = JSON.parse(data);

  // Преобразуем scores в массив для удобства
  const scoresArray = Object.entries(req.body.scores).map(
    ([_, value]) => value
  );

  comparisons.push({
    timestamp: getFormattedDateTime(),
    subjects: req.body.subjects,
    scores: scoresArray, // Теперь это массив, а не объект
  });

  fs.writeFileSync(dataFilePath, JSON.stringify(comparisons, null, 2));
  res.status(200).json({ message: "Данные сохранены!", status: "OK" });
});

// Загрузка истории
app.get("/api/results", (req, res) => {
  const data = fs.readFileSync(dataFilePath);
  res.json(JSON.parse(data));
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
