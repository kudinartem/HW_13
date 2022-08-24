let tasks = [];
let lastId = 0;
let errorMessage = "";
const app = document.getElementById("app");

function removeTask(id) {
  tasks = tasks.filter((element) => element.id !== id);
  render();
}

function setDone(id) {
  tasks = tasks.map((element) => {
    if (element.id === id)
      return {
        ...element,
        done: true,
      };
    return element;
  });
  render();
}

function setText(id, text) {
  tasks = tasks.map((element) => {
    if (element.id === id)
      return {
        ...element,
        text,
      };
    return element;
  });
  render();
}

function addTask(task) {
  tasks.push(task);
  render();
}

function formComponent() {
  const form = document.createElement("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorMessage = ''
    const text = event.target[0].value;

    if (!text) {
      errorMessage = "Make your entry!";
      render();
      return;
    }

    const task = {
      text,
      done: false,
      id: lastId + 1,
    };

    lastId++;

    addTask(task);
  });

  const validations = document.createElement("div");
  validations.innerText = errorMessage;
  validations.style = 'color: red;'

  const input = document.createElement("input");
  input.name = "task";
  input.placeholder = "Enter you task here";
  input.id = "taskInput";

  const button = document.createElement("button");
  button.type = "submit";
  button.innerText = "ADD TASK";

  form.appendChild(input);
  form.appendChild(button);
  form.appendChild(validations);

  return form;
}

function taskBoardComponent() {
  const container = document.createElement("div");

  tasks.forEach((element) => {
    const taskElement = document.createElement("div");
    const taskTitle = document.createElement("input");
    const taskTitleForm = document.createElement("form");
    const taskID = document.createElement("div");
    const taskDone = document.createElement("div");

    taskTitleForm.addEventListener("submit", (event) => {
      event.preventDefault();
      setText(element.id, event.target[0].value);
    });

    const setDoneButton = document.createElement("button");
    setDoneButton.addEventListener("click", () => {
      setDone(element.id);
    });
    setDoneButton.innerText = "Done task";

    const setTextButton = document.createElement("button");
    setTextButton.innerText = "Change task text";
    setTextButton.type = "submit";

    const removeButton = document.createElement("button");
    removeButton.addEventListener("click", () => {
      removeTask(element.id);
    });
    removeButton.innerText = `Remove element ${element.id}`;

    taskTitle.value = `${element.text}`;
    taskTitleForm.appendChild(taskTitle);
    taskTitleForm.appendChild(setTextButton);

    taskTitle.style = element.done ? `text-decoration: line-through;` : "";
    taskID.innerText = `ID: ${element.id}`;
    taskDone.innerText = `Done: ${element.done}`;

    taskElement.appendChild(taskTitleForm);
    taskElement.appendChild(taskID);
    taskElement.appendChild(taskDone);
    taskElement.appendChild(removeButton);
    taskElement.appendChild(setDoneButton);
    taskElement.style =
      "margin-top: 6px; border: solid 1px #999; padding: 6px;";

    container.appendChild(taskElement);
  });

  return container;
}

function render() {
  const form = formComponent();
  const taskBoard = taskBoardComponent();

  app.innerHTML = null;
  app.appendChild(form);
  app.appendChild(taskBoard);
}

render();
