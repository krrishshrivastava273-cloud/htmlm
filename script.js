const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

window.onload = loadTasks;

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    createTaskElement(taskText);

    saveTask(taskText);

    taskInput.value = "";
}

function createTaskElement(taskText) {

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = taskText;

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        li.remove();
        removeTask(taskText);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}
function saveTask(task) {

    let tasks = [];

    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    let tasks = [];

    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(task => {
        createTaskElement(task);
    });
}

function removeTask(taskToRemove) {

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks = tasks.filter(task => task !== taskToRemove);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}