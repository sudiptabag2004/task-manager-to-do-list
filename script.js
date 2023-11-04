const taskList = document.querySelector(".task-list");
const taskInput = document.querySelector(".task-input");
const addTaskButton = document.querySelector(".add-task-button");
const deleteAllTasksButton = document.querySelector(".delete-all-tasks-button");

let tasks = [];

function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.classList.add("task-checkbox");
        taskCheckbox.checked = task.completed;

        const taskLabel = document.createElement("label");
        taskLabel.textContent = task.text;

        const deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.setAttribute("data-index", index);
        deleteLink.classList.add("delete-task");
        deleteLink.textContent = "Delete";

        deleteLink.addEventListener("click", (e) => {
            const indexToDelete = parseInt(e.target.getAttribute("data-index"));
            tasks.splice(indexToDelete, 1);
            updateLocalStorage();
            displayTasks();
        });

        listItem.appendChild(taskCheckbox);
        listItem.appendChild(taskLabel);
        listItem.appendChild(document.createTextNode(" | "));
        listItem.appendChild(deleteLink);

        taskList.appendChild(listItem);

        taskCheckbox.addEventListener("change", (e) => {
            const checked = e.target.checked;
            tasks[index].completed = checked;
            updateLocalStorage();
        });
    });
}

addTaskButton.addEventListener("click", () => {
    const newTaskText = taskInput.value;
    if (newTaskText.trim() !== "") {
        const newTask = { text: newTaskText, completed: false };
        tasks.push(newTask);
        taskInput.value = "";
        updateLocalStorage();
        displayTasks();
    }
});

deleteAllTasksButton.addEventListener("click", () => {
    tasks = [];
    updateLocalStorage();
    displayTasks();
});

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
    tasks = JSON.parse(storedTasks);
}

displayTasks();
