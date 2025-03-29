/*Проект 1: Менеджер задач (To-Do List)
Задачи:
1 - Создай класс или фабричную функцию для задачи:
        Каждая задача должна иметь свойства: название (title), описание (description), статус (status) и приоритет (priority).
        Добавь методы для изменения статуса и приоритета.
2 - Создай менеджер задач:
        Используй объект или класс для хранения списка задач.
        Добавь методы для добавления, удаления и вывода всех задач.
3 - Добавь возможность фильтрации задач:
        Создай метод для фильтрации задач по статусу или приоритету.
        
4 - Дополнительно (по желанию):
    Реализуй интерфейс через prompt() и console.log() для взаимодействия с пользователем.*/

/**
 *@param {string} title
 *@param {string} description
 *@param {string} _status
 *@param {string} _priority
 **/
// Список допустимых статусов
const statusList = [
  "Выполняется",
  "Выполнена",
  "Новая",
  "Ревью",
  "Забыта навечно",
];

//список допустимых приоритетов
const priorityList = [
  "Неотложная",
  "Критическая",
  "Серьезная",
  "Обычная",
  "Незначительная",
];

//фабрика объектов самих задач

const toDoFabric = (title, description, _status, _priority) => {
  return {
    title,
    description,
    _status,
    _priority,
    set status(newStat) {
      if (statusList.includes(newStat)) {
        this._status = newStat;
        console.log(`Задаче присвоен статус ${this._status}`);
      } else {
        console.log(`Указан недопустимый статус задачи - ${newStat}`);
      }
    },
    get status() {
      console.log(`Текущий статус задачи - ${this._status}`);
      return this._status;
    },
    set priority(newPriority) {
      if (priorityList.includes(newPriority)) {
        this._priority = newPriority;
        console.log(`Задаче присвоен приоритет ${this._priority}`);
      } else {
        console.log(`Указан недопустимый приоритет задачи - ${newPriority}`);
      }
    },
    get priority() {
      console.log(`Текущий приоритет задачи - ${this._priority}`);
      return this._priority;
    },
  };
};

//Объект с массивом задач
const tasks = {
  "List of tasks": [],
};

//функция добавления задач в массив
const addNewTask = (title, description, _status, _priority) => {
  if (
    typeof title === "string" &&
    typeof description === "string" &&
    statusList.includes(_status) &&
    priorityList.includes(_priority)
  ) {
    const newTask = toDoFabric(title, description, _status, _priority);
    tasks["List of tasks"].push(newTask);
    return true;
  } else {
    console.log("Некорректные данные для создания задачи");
    return false;
  }
};

//функция удаления задачи из массива
const delTask = (delTitle) => {
  let result = null;
  const indexOfTask = tasks["List of tasks"].findIndex((i) => {
    if (i.title === delTitle) {
      return delTitle;
    }
    //title in i === delTitle;
  });
  if (indexOfTask !== -1) {
    delete tasks["List of tasks"][indexOfTask];
    console.log(`Задача с названием ${delTitle} была удалена из списка`);
    result = 1;
  } else {
    console.log(`Задача с названием ${delTitle} не была найдена`);
  }
  return result;
};

// функция отображения состава задачи
const seeTaskFilled = (list) => {
  let result = null;
  if (list !== null) {
    list.forEach((i) => {
      console.log(`Название задачи - ${i.title}`);
      console.log(`Название задачи - ${i.description}`);
      i.status;
      i.priority;
      console.log("____________________________");
    });
    result = 1;
  }
  return result;
};

//Функция вывода всех задач в списке
const seeAllTasks = () => {
  let result = seeTaskFilled(tasks["List of tasks"]);
  return result;
};

//функция фильтрации задач  по приоритету
const priorFilter = (priorityToFilt) => {
  let result = null;
  const filteredArray = tasks["List of tasks"].filter((i) => {
    if (i._priority === priorityToFilt) {
      return priorityToFilt;
    }
    //return _priority in i === priorityToFilt;
  });
  if (filteredArray.length > 0) {
    result = filteredArray;
  } else {
    console.log(
      `Произошла ошибка при выполнении фильтрации. Параметр "${priorityToFilt}" недопустим`
    );
  }
  return result;
};

//функция фильтрации задач  по статусу
const statFilter = (statToFilt) => {
  let result = null;
  const filteredArray = tasks["List of tasks"].filter((i) => {
    if (i._status === statToFilt) {
      return statToFilt;
    }
    //return _status in i === statToFilt;
  });
  if (filteredArray !== null && filteredArray !== "") {
    result = filteredArray;
  } else {
    console.log(
      `Произошла ошибка при выполнении фильтрации. Параметр "${statToFilt}" недопустим`
    );
  }
  return result;
};

//допустимые методы фильтрации
const metodF = ["Приоритет", "Статус"];

//функция для фильтрации задач по статусу или приоритету
const filterOfTasks = (metod, param) => {
  let result = null;
  switch (metod) {
    case "Приоритет":
      result = priorFilter(param);
      break;
    case "Статус":
      result = statFilter(param);
      break;
    default:
      console.log("Введен неверный метод фильтации");
      break;
  }
  return result;
};

//Функция поиска задачи
const findIdexOfTask = (titleF) => {
  let result = null;
  result = tasks["List of tasks"].findIndex((i) => {
    if (i.title === titleF) {
      return titleF;
    }
  });
  return result;
};

const mainMenu = () => {
  let inputMode = parseInt(
    prompt(
      `Доступные режимы:
      \n1 - добавить новую задачу
      \n2 - посмотреть список задач
      \n3 - удалить задачу из списка
      \n4 - отфильтровать задачи по статусу или приоритету
      \n5 - изменить статус задачи из списка
      \n6 - изменить приоритет задачи из списка
      \n7 - выход из программы`
    )
  );
  return inputMode;
};

const main = () => {
  let exit = 1;
  addNewTask("тест1", "тест1", "Выполняется", "Неотложная");
  addNewTask("тест2", "тест2", "Выполнена", "Критическая");
  addNewTask("тест3", "тест3", "Новая", "Критическая");
  addNewTask("тест4", "тест4", "Ревью", "Серьезная");
  addNewTask("тест5", "тест5", "Забыта навечно", "Незначительная");
  alert("Это программа для составления To-Do-List!");
  alert(
    `Задачи должны иметь структуру: название (title), описание (description), статус (status) и приоритет (priority)\nНазвание - произвольный ввод\nОписание - произвольный ввод\nСтатусы определены списком значений - ${statusList}\nПриоритеты определениы списком значений - ${priorityList}`
  );
  while (exit) {
    switch (mainMenu()) {
      case 1:
        addNewTask(
          prompt("Введите название задачи (призвольный ввод)"),
          prompt("Введите описание задачи (призвольный ввод)"),
          prompt(`Введите статус задачи из списка - ${statusList}`),
          prompt(`Введите статус задачи из списка - ${priorityList}`)
        )
          ? alert("Задача успешно добавлена")
          : alert("Задача не добавлена");
        break;
      case 2:
        seeAllTasks();
        break;
      case 3:
        delTask(prompt("Введите название задачи, которую необходимо удалить"))
          ? alert("Задача успешно удалена")
          : alert(
              `Произошла ошибка удаления. Задача с указанным названием не была найдена`
            );
        break;
      case 4:
        let filteredResult = filterOfTasks(
          prompt(`Введите один из допустимых методов фильтрации ${metodF}`),
          prompt(
            `Введите наименование статуса (${statusList}) или приоритета (${priorityList})`
          )
        );
        if (filteredResult) {
          seeTaskFilled(filteredResult);
          alert("Результат фильтрации можно посмотреть в консоли");
        } else {
          alert("Произошла ошибка фильтрации");
        }
        break;
      case 5:
        const taskS = findIdexOfTask(
          prompt("Введите название задачи, статус которой хотите изменить")
        );
        if (taskS !== -1) {
          tasks["List of tasks"][taskS].status = prompt(
            "Введите новый новый статус для задачи"
          );
        } else {
          alert("Задача не найдена");
        }
        break;
      case 6:
        const taskP = findIdexOfTask(
          prompt("Введите название задачи, приоритет которой хотите изменить")
        );
        if (taskP !== -1) {
          tasks["List of tasks"][taskP].priority = prompt(
            "Введите новый новый приоритет для задачи"
          );
        } else {
          alert("Задача не найдена");
        }
        break;
      case 7:
        exit = 0;
        break;
      default:
        alert("Введено неверное значение");
        break;
    }
  }
  return 0;
};
main();

/*const statusList = [
  "Выполняется",
  "Выполнена",
  "Новая",
  "Ревью",
  "Забыта навечно",
];

//список допустимых приоритетов
const priorityList = [
  "Неотложная",
  "Критическая",
  "Серьезная",
  "Обычная",
  "Незначительная",
];*/
