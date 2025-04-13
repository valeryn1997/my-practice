const express = require("express");
const fs = require("fs");
const path = require("path");
const dataFilePath = path.join(__dirname, "comparisons.json");
const bodyParser = require("body-parser");
const cors = require("cors"); // Новый пакет

const app = express();
const port = 3000;

app.use(cors()); // Включаем CORS
app.use(bodyParser.json());
app.use(express.static("public")); // Убедись, что папка public существует

// Создаём файл, если его нет
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, "[]");
}

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Статические файлы в папке public

// Сохранение данных
app.post("/api/save", (req, res) => {
  const data = fs.readFileSync(dataFilePath);
  const comparisons = JSON.parse(data);
  comparisons.push(req.body);
  fs.writeFileSync(dataFilePath, JSON.stringify(comparisons, null, 2));
  res.status(200).send("Данные сохранены!");
});

// Загрузка истории
app.get("/api/results", (req, res) => {
  const data = fs.readFileSync(dataFilePath);
  res.json(JSON.parse(data));
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
